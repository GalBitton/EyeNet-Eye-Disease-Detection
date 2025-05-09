import React, {useRef, useState, useEffect} from "react";
import * as ort from "onnxruntime-web";

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [frames, setFrames] = useState([]);
    const [results, setResults] = useState([]);


    useEffect(() => {
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.simd = false;
        ort.env.wasm.proxy = false;
        console.log("✅ onnxruntime-web configured to use basic WASM backend (no simd/thread)");
    }, []);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };

    const startRecording = () => {
        const stream = videoRef.current.srcObject;
        const mediaRecorder = new MediaRecorder(stream, {mimeType: "video/webm"});
        mediaRecorderRef.current = mediaRecorder;


        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {type: "video/webm"});
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
                    setFrames(capturedFrames);
                    console.log(`✅ Extracted ${capturedFrames.length} frames`);
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

    const preprocessImage = (imageData) => {
        const {data, width, height} = imageData;
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
            console.log("📸 Loading image...");
            const img = new Image();
            img.src = base64Image;
            await new Promise((res) => (img.onload = res));
            console.log("✅ Image loaded");

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 640;
            canvas.height = 640;
            ctx.drawImage(img, 0, 0, 640, 640);
            const imageData = ctx.getImageData(0, 0, 640, 640);
            console.log("🖼️ Image converted to imageData");

            const inputTensor = new ort.Tensor("float32", preprocessImage(imageData), [1, 3, 640, 640]);
            console.log("📦 Tensor created:", inputTensor);

            if (!window.yoloSession) {
                console.log("🚀 Loading YOLO model...");
                window.yoloSession = await ort.InferenceSession.create("/yolov8n-face-lindevs.onnx");
                console.log("✅ Model loaded!");
            }

            const feeds = {images: inputTensor};
            console.log("📤 Running inference...");
            const inferenceResults = await window.yoloSession.run(feeds);
            console.log("✅ Inference result:", inferenceResults);

            const output = inferenceResults[Object.keys(inferenceResults)[0]].data;
            let maxScore = 0;
            for (let i = 0; i < output.length; i += 6) {
                const score = output[i + 4];
                if (score > maxScore) maxScore = score;
            }

            return maxScore;

        } catch (err) {
            console.error("❌ Error in runYoloOnImage:", err);
            return 0;
        }
    };

    const analyzeAllFrames = async () => {
        const temp = [];
        for (const img of frames) {
            const score = await runYoloOnImage(img);
            temp.push({image: img, score});
        }

        const top30 = temp
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.ceil(temp.length * 0.3));

        setResults(top30);
    };

    return (
        <div className="container py-10 text-center">
            <video ref={videoRef} className="mx-auto bg-black rounded-lg" muted/>
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

                {frames.length > 0 && (
                    <button className="primary-btn bg-purple-600" onClick={analyzeAllFrames}>
                        Run YOLO
                    </button>
                )}
            </div>

            {recording && (
                <div className="mt-4 text-lg font-semibold">
                    Recording... {countdown} sec left
                </div>
            )}

            {results.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4">Top 30% Frames (YOLO Confidence)</h3>
                    <div className="grid grid-cols-3 gap-4 px-4">
                        {results.map((item, idx) => (
                            <div key={idx} className="text-center">
                                <img src={item.image} alt={`res-${idx}`} className="rounded shadow-lg"/>
                                <div className="text-sm mt-1">Confidence: {(item.score * 100).toFixed(2)}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoRecorder;
