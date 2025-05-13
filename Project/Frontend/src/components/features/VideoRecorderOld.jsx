import React, { useRef, useState, useEffect } from "react";
import * as ort from "onnxruntime-web";
import axios from "axios";

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [results, setResults] = useState([]);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
    }, []);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };

    const startRecording = () => {
        const stream = videoRef.current.srcObject;
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            extractFramesToMemory(url);
        };

        mediaRecorder.start();
        setRecording(true);
        let timeLeft = 5;
        setCountdown(timeLeft);
        const interval = setInterval(() => {
            timeLeft -= 1;
            setCountdown(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(interval);
                stopRecording();
            }
        }, 1000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current?.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        const stream = videoRef.current?.srcObject;
        if (stream) stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
    };

    const extractFramesToMemory = (videoUrl) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.play();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const capturedFrames = [];

        video.addEventListener("loadeddata", () => {
            const capture = () => {
                if (video.ended || video.currentTime >= video.duration) {
                    analyzeAllFrames(capturedFrames);
                    return;
                }
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                capturedFrames.push(canvas.toDataURL("image/png"));
                setTimeout(capture, 200);
            };
            capture();
        });
    };

    const detectBlurWithLaplacian = (canvas) => {
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const gray = new Uint8ClampedArray(width * height);
        for (let i = 0; i < width * height; i++) {
            const r = imageData.data[i * 4];
            const g = imageData.data[i * 4 + 1];
            const b = imageData.data[i * 4 + 2];
            gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
        }

        const laplacian = new Float32Array(width * height);
        const kernel = [0, 1, 0, 1, -4, 1, 0, 1, 0];
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const val = gray[(y + ky) * width + (x + kx)];
                        const kval = kernel[(ky + 1) * 3 + (kx + 1)];
                        sum += val * kval;
                    }
                }
                laplacian[y * width + x] = sum;
            }
        }

        const mean = laplacian.reduce((a, b) => a + b, 0) / laplacian.length;
        const variance = laplacian.reduce((a, b) => a + (b - mean) ** 2, 0) / laplacian.length;
        return variance;
    };

    const preprocessImage = (imageData) => {
        const { data, width, height } = imageData;
        const floatArray = new Float32Array(3 * width * height);
        for (let i = 0; i < width * height; i++) {
            floatArray[i] = data[i * 4] / 255;
            floatArray[i + width * height] = data[i * 4 + 1] / 255;
            floatArray[i + 2 * width * height] = data[i * 4 + 2] / 255;
        }
        return floatArray;
    };

    const runYoloOnImage = async (base64Image) => {
        try {
            const img = new Image();
            img.src = base64Image;
            await new Promise((res) => (img.onload = res));

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 640;
            canvas.height = 640;
            ctx.drawImage(img, 0, 0, 640, 640);
            const imageData = ctx.getImageData(0, 0, 640, 640);

            const inputTensor = new ort.Tensor("float32", preprocessImage(imageData), [1, 3, 640, 640]);

            if (!window.yoloSession) {
                window.yoloSession = await ort.InferenceSession.create("/yolov8n-face-lindevs.onnx");
            }

            const inputNames = window.yoloSession.inputNames;
            const feeds = { [inputNames[0]]: inputTensor };
            const inferenceResults = await window.yoloSession.run(feeds);

            const outputTensor = inferenceResults[Object.keys(inferenceResults)[0]];
            const output = outputTensor.data;
            const dims = outputTensor.dims;
            const numBoxes = dims[2];

            let bestScore = 0;
            let bestBox = null;

            for (let i = 0; i < numBoxes; i++) {
                const x = output[i];
                const y = output[1 * numBoxes + i];
                const w = output[2 * numBoxes + i];
                const h = output[3 * numBoxes + i];
                const confidence = output[4 * numBoxes + i];

                if (confidence > bestScore) {
                    bestScore = confidence;
                    bestBox = { x, y, w, h };
                }
            }

            return { score: bestScore, box: bestBox };
        } catch (err) {
            console.error("Error in runYoloOnImage:", err);
            return { score: 0, box: null };
        }
    };

    const analyzeAllFrames = async (frameList) => {
        setAnalyzing(true);
        const temp = await Promise.all(frameList.map(async (img) => {
            const image = new Image();
            image.src = img;
            await new Promise((res) => (image.onload = res));

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 640;
            canvas.height = 640;
            ctx.drawImage(image, 0, 0, 640, 640);

            const blur = detectBlurWithLaplacian(canvas);
            if (blur < 100) return null;

            const { score, box } = await runYoloOnImage(canvas.toDataURL("image/png"));
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

            return { blob, score, box, blur };
        }));

        const filtered = temp.filter(Boolean);
        const topImages = filtered
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.max(5, Math.ceil(filtered.length * 0.3)));

        setResults(topImages);
        setAnalyzing(false);

        // שליחת Base64 לשרת
        const blobToBase64 = (blob) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });

        const dataToSend = await Promise.all(topImages.map(async (item) => ({
            image: await blobToBase64(item.blob),
            score: item.score,
            blur: item.blur,
            box: item.box
        })));

        await axios.post("http://localhost:8000/analyze", dataToSend, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("📤 Images sent to server");
    };

    return (
        <div className="container py-10 text-center">
            <video ref={videoRef} className="mx-auto bg-black rounded-lg" muted />
            {!analyzing && (
                <div className="mt-6 flex gap-4 justify-center flex-wrap">
                    {!recording ? (
                        <button className="primary-btn" onClick={async () => {
                            await startCamera();
                            startRecording();
                        }}>
                            Start Recording
                        </button>
                    ) : (
                        <button className="primary-btn bg-red-600" onClick={stopRecording}>
                            Stop Recording
                        </button>
                    )}
                </div>
            )}
            {recording && (
                <div className="mt-4 text-lg font-semibold">
                    Recording... {countdown} sec left
                </div>
            )}
            {analyzing && (
                <div className="mt-6 text-lg font-semibold text-blue-600 animate-pulse">
                    🔍 Analyzing frames, please wait...
                </div>
            )}
        </div>
    );
};

export default VideoRecorder;
