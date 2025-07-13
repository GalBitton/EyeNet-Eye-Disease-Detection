import React, {useState, useRef, useEffect} from 'react';
import { Camera, Upload, Eye, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as ort from "onnxruntime-web";
import axios from "axios";
import {EYESCANCONTENT} from "../constants/constants.jsx";


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

    const runYoloOnImageToDetectFace = async (canvas) => {
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

    const resetCameraState = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setShowCamera(false);
        setIsVideoMode(false);
        setRecording(false);
    };

    const drawFaceBoundingBox = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(0, 255, 0, 0.9)";
        ctx.lineWidth = 3;
        ctx.font = "18px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

        // Define box dimensions
        const boxW = width * 0.4;   // e.g., 40% of canvas width
        const boxH = height * 0.5;  // e.g., 50% of canvas height

        // Center the box in the canvas
        const boxX = (width - boxW) / 2;
        const boxY = (height - boxH) / 2;

        ctx.strokeRect(boxX, boxY, boxW, boxH);
        ctx.fillText("Face", boxX + 10, boxY - 10);
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

        resizeCanvasRef.current = () => {
            if (!videoRef.current || !overlayCanvasRef.current) return;
            const canvas = overlayCanvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = videoRef.current.videoWidth || 640;
            canvas.height = videoRef.current.videoHeight || 480;
            drawFaceBoundingBox(ctx, canvas.width, canvas.height);
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

    const analyzeUploadedFile = async (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            analyzeUploadedCroppedImage(base64);
        };
        reader.readAsDataURL(file);
    };

    const analyzeUploadedCroppedImage = async (base64Image) => {
        setIsLoading(true);
        const dataToSend = {image: base64Image,}

        try {
            const res = await axios.post("http://localhost:8000/upload", dataToSend, {
                headers: {"Content-Type": "application/json"}
            });
            navigate("/results", {
                state: {
                    results: res.data,  // directly the dict
                    error: null,        // no 400 error for upload
                    processedResults: false
                }
            });
        } catch(err){
            console.error("Error during image analysis:", err);
            navigate("/results", {
                state: {
                    results: null,
                    error: "Failed to analyze the image. Please try again.",
                    processedResults: false
                }
            });
        } finally {
            setIsLoading(false);
        }
    }

    const capturePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        const base64 = canvas.toDataURL("image/png");
        stopCamera();
        analyzeFramesFromCamera([base64]);
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
                    analyzeFramesFromCamera(capturedFrames);
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

    const analyzeFramesFromCamera = async (frameList) => {
        setIsLoading(true);
        try {
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
                // if (blur < 100) return null;

                const {score, box} = await runYoloOnImageToDetectFace(canvas);
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
                return {blob, score, box, blur};
            }));
            const validImages = temp.filter(Boolean);
            const topImages = validImages
                .sort((a, b) => b.score - a.score)
                .slice(0, Math.max(5, Math.ceil(validImages.length * 0.3)));

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

            const res = await axios.post("http://localhost:8000/predict", dataToSend, {
                headers: {"Content-Type": "application/json"}
            });

            navigate("/results", {
                state: {
                    results: res.data,
                    error: res.data.status_code === 400 ? "No valid eye images detected" : null,
                    processedResults: true
                }
            });
        }catch(err) {
            console.error("Error during camera frames analysis:", err);
                    navigate("/results", {
            state: {
                results: null,
                error: err?.response?.data?.message || "Failed to analyze camera frames. Please try again.",
                processedResults: false,
            },
        });
    } finally {
        setIsLoading(false);
    }
    };

    const extractBestFrame = (videoUrl) => {
        extractFramesToMemory(videoUrl);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) analyzeUploadedFile(file);
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
                            <span>{EYESCANCONTENT.RECOMMENDATIONS[0]}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>{EYESCANCONTENT.RECOMMENDATIONS[1]}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>{EYESCANCONTENT.RECOMMENDATIONS[2]}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">✔</span>
                            <span>{EYESCANCONTENT.RECOMMENDATIONS[3]}</span>
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
                        <h6>Image should be of a single eye</h6>
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
                        <h6>Snapshot your face</h6>
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
                        <h6>Record your face</h6>
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
