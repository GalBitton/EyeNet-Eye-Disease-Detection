import React, {useState, useRef, useEffect} from 'react';
import { Camera, Upload, Eye, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as ort from "onnxruntime-web";
import axios from "axios";


const EyeScan = () => {
    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const overlayCanvasRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const navigate = useNavigate();
    const [showCamera, setShowCamera] = useState(false);
    const [isVideoMode, setIsVideoMode] = useState(false);
    const resizeCanvasRef = useRef(null);

// Setup once
    useEffect(() => {
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
    }, []);

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

    const runYoloOnImage = async (canvas) => {
        try {
            const ctx = canvas.getContext("2d");
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
            console.error("YOLO error:", err);
            return { score: 0, box: null };
        }
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


    const handlePrediction = async (imageList) => {
        try {
            setIsLoading(true);

            const processed = await Promise.all(imageList.map(async (base64Img) => {
                const img = new Image();
                img.src = base64Img;
                await new Promise((res) => (img.onload = res));

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 640;
                canvas.height = 640;
                ctx.drawImage(img, 0, 0, 640, 640);

                const blur = detectBlurWithLaplacian(canvas);
                if (blur < 100) return null;

                const { score, box } = await runYoloOnImage(canvas);
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
                const reader = new FileReader();

                const base64 = await new Promise((res) => {
                    reader.onloadend = () => res(reader.result);
                    reader.readAsDataURL(blob);
                });

                return { image: base64, score, box, blur };
            }));

            const validImages = processed.filter(Boolean);
            const topImages = validImages.sort((a, b) => b.score - a.score).slice(0, Math.max(5, Math.ceil(validImages.length * 0.3)));

            const res = await axios.post("http://localhost:8000/predict", topImages, {
                headers: { "Content-Type": "application/json" }
            });

            navigate("/results", {
                state: {
                    results: res.data,
                    previewImageBase64: topImages?.[0]?.image || ""
                }
            });
        } catch (err) {
            console.error("Prediction failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatResult = (result) => {
        const left = result.left_eye;
        const right = result.right_eye;

        return {
            prediction: left.best_prediction === right.best_prediction ? left.best_prediction : 'Mixed',
            confidence: Math.max(
                Math.max(...Object.values(left.average_scores)),
                Math.max(...Object.values(right.average_scores))
            ) / 100,
            conditions: {
                cataract: ((left.average_scores.Cataract + right.average_scores.Cataract) / 200),
                healthy: ((left.average_scores.Healthy + right.average_scores.Healthy) / 200),
                conjunctivitis: ((left.average_scores.Conjunctivitis + right.average_scores.Conjunctivitis) / 200),
                stye: ((left.average_scores.Stye + right.average_scores.Stye) / 200),
            },
            recommendations: generateRecommendations(left.best_prediction, right.best_prediction),
        };
    };

    const generateRecommendations = (left, right) => {
        const final = left === right ? left : 'Mixed';
        switch (final) {
            case "Healthy":
                return [
                    'Your eye appears healthy based on our AI analysis.',
                    'Continue regular eye check-ups with your eye care professional.',
                    'Maintain good eye hygiene and protect your eyes from UV rays.',
                ];
            case "Cataract":
                return [
                    'Signs of cataract detected. Consult an ophthalmologist.',
                    'Avoid driving at night and protect your eyes from sunlight.',
                    'Schedule a clinical eye exam for confirmation.',
                ];
            case "Stye":
                return [
                    'Possible stye detected. Apply warm compresses and avoid squeezing it.',
                    'Clean your eyelids regularly with a mild cleanser.',
                    'Seek medical attention if swelling or pain increases.',
                ];
            case "Conjunctivitis":
                return [
                    'Symptoms of conjunctivitis detected. Avoid touching or rubbing your eyes.',
                    'Use prescribed drops and maintain good hygiene.',
                    'See a doctor if redness or discharge worsens.',
                ];
            default:
                return ['Unable to determine a clear diagnosis. Please retry or consult a professional.'];
        }
    };


    const resetCameraState = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setShowCamera(false);
        setIsVideoMode(false);
        setRecording(false);
    };

    const drawEyeBoxes = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(0, 255, 0, 0.9)";
        ctx.lineWidth = 3;
        ctx.font = "18px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        const boxW = width * 0.18;
        const boxH = height * 0.22;
        const boxY = height * 0.38;
        const eyeGap = width * 0.08;
        const centerX = width / 2;
        const leftX = centerX - eyeGap / 2 - boxW;
        const rightX = centerX + eyeGap / 2;
        ctx.strokeRect(leftX, boxY, boxW, boxH);
        ctx.fillText("Left Eye", leftX + 10, boxY - 10);
        ctx.strokeRect(rightX, boxY, boxW, boxH);
        ctx.fillText("Right Eye", rightX + 10, boxY - 10);
    };

    const startCamera = async () => {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            await videoRef.current.play();
        }

        const canvas = overlayCanvasRef.current;
        if (!canvas) {
            console.error("Canvas is not ready yet.");
            return;
        }
        const ctx = canvas.getContext("2d");

        resizeCanvasRef.current = () => {
            if (!videoRef.current || !overlayCanvasRef.current) return;
            const canvas = overlayCanvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = videoRef.current.videoWidth || 640;
            canvas.height = videoRef.current.videoHeight || 480;
            drawEyeBoxes(ctx, canvas.width, canvas.height);
        };

        if (videoRef.current.readyState >= 2) resizeCanvasRef.current();
        else videoRef.current.onloadedmetadata = resizeCanvasRef.current;

        window.addEventListener("resize", resizeCanvasRef.current);

    };

    const stopCamera = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setShowCamera(false);
        setIsVideoMode(false);

        if (resizeCanvasRef.current) {
            window.removeEventListener("resize", resizeCanvasRef.current);
        }
    };

    const analyzeFile = async (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            analyzeAllFrames([base64]);
        };
        reader.readAsDataURL(file);
    };

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        const base64 = canvas.toDataURL("image/png");
        stopCamera();
        analyzeAllFrames([base64]);
    };

    const startRecording = (durationSeconds = 5) => {
        const stream = videoRef.current.srcObject;
        const mediaRecorder = new MediaRecorder(stream,{ mimeType: "video/webm" });
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            extractBestFrame(url);
        };

        mediaRecorder.start();
        setRecording(true);

        setTimeout(() => {
            mediaRecorder.stop();
            setRecording(false);
            resetCameraState();  // instead of just stopCamera()
            stopRecording();
        }, durationSeconds * 1000);
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

    const analyzeAllFrames = async (frameList) => {
        console.log(`COMMENT: analyzeAllFrames called with ${frameList.length} frames`);
        setIsLoading(true);
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
            console.log(`COMMENT: blur=${blur}`);
            // if (blur < 100) return null;

            const { score, box } = await runYoloOnImage(canvas);
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
            console.log(`COMMENT: analyzeAllFrames: score=${score}, box=${JSON.stringify(box)}, blur=${blur}`);
            return { blob, score, box, blur };
        }));
        console.log(`COMMENT: analyzeAllFrames: processed ${temp.length} frames`);
        const validImages = temp.filter(Boolean);
        console.log(`COMMENT: analyzeAllFrames: valid images count = ${validImages.length}`);
        const topImages = validImages
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.max(5, Math.ceil(validImages.length * 0.3)));
        console.log(`COMMENT: analyzeAllFrames: top images count = ${topImages.length}`);
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
        console.log("Sending data to backend:", dataToSend);
        const res =         await axios.post("http://localhost:8000/predict", dataToSend, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Prediction results:", res.data);
        navigate("/results", {
            state: {
                results: res.data,
                previewImageBase64: topImages?.[0]?.image || ""
            }
        });
        setIsLoading(false);
    };

    const extractBestFrame = (videoUrl) => {
        extractFramesToMemory(videoUrl);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) analyzeFile(file);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center text-center px-4">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full border-4 border-blue-500 opacity-30 animate-ping absolute top-0 left-0"></div>
                        <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center relative z-10">
                            <Eye className="h-10 w-10 text-blue-600 animate-spin" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">Analyzing your eye scan</h2>
                    <p className="text-gray-600">This might take a few seconds... Sit tight 🧠👁️</p>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <Eye className="h-16 w-16 text-blue-600 mx-auto mb-4"/>
                    <h1 className="text-4xl font-bold text-gray-900">Eye Health Scan</h1>
                    <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
                        Upload or capture a clear image of your eye. Our AI will analyze it for cataracts, stye, or
                        conjunctivitis.
                    </p>
                </div>

                <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">For Best Results:</h3>
                    <ul className="text-blue-800 space-y-3">
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>Ensure no light reflections on the eyes when taking the photo</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>Keep the eye open and look directly at the camera</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>Make sure the image is clear and not blurry — clean your camera if needed</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>Locate your eyes inside the bounding boxes</span>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <button
                        onClick={() => {
                            resetCameraState();
                            fileInputRef.current?.click();
                        }}
                        className="bg-blue-600 text-white p-6 rounded-xl flex flex-col items-center hover:bg-blue-700 transition"
                    >
                        <Upload className="h-10 w-10 mb-2"/>
                        Upload Image
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    <button
                        onClick={async () => {
                            resetCameraState();
                            setShowCamera(true);
                            await new Promise(res => setTimeout(res, 100));
                            await startCamera();
                        }}
                        className="bg-green-600 text-white p-6 rounded-xl flex flex-col items-center hover:bg-green-700 transition"
                    >
                        <Camera className="h-10 w-10 mb-2"/>
                        Use Camera
                    </button>

                    <button
                        onClick={async () => {
                            resetCameraState();
                            setIsVideoMode(true);
                            setShowCamera(true);
                            await new Promise(res => setTimeout(res, 100));
                            await startCamera();
                        }}
                        className="bg-pink-600 text-white p-6 rounded-xl flex flex-col items-center hover:bg-pink-700 transition"
                    >
                        <Video className="h-10 w-10 mb-2"/>
                        Record Video
                    </button>
                </div>

                {/* Camera View */}
                {showCamera && (
                    <div className="mb-6 flex justify-center">
                        <div className="relative w-full max-w-[640px] aspect-[4/3] bg-black rounded-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <canvas
                                ref={overlayCanvasRef}
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            />
                            {!recording && !isVideoMode && (
                                <button
                                    onClick={capturePhoto}
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 z-10"
                                >
                                    Capture Photo
                                </button>
                            )}

                            {!recording && isVideoMode && (
                                <button
                                    onClick={() => startRecording(3)}
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 z-10"
                                >
                                    Start Recording
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EyeScan;
