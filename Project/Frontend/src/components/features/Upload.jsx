import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ort from "onnxruntime-web";
import axios from "axios";
import { ROUTES } from "../../constants/routes.jsx";

const Upload = ({ setResults }) => {
  const [mode, setMode] = useState(null); // 'upload' or 'camera'
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  useEffect(() => {
    ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
  }, []);

  const handleUpload = (event) => {
    const uploaded = event.target.files[0];
    if (uploaded) {
      const type = uploaded.type.split("/")[0];
      setFile(URL.createObjectURL(uploaded));
      setMessage(`${type === "image" ? "Image" : "Video"} uploaded successfully`);
      simulateAnalyze(type);
    }
  };

  const simulateAnalyze = (type) => {
    setAnalyzing(true);
    let timeLeft = 5;
    const timer = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
        setResults([{ result: "mock-result", type }]); // Replace with real logic if needed
        navigate(ROUTES.RESULT);
      }
    }, 1000);
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0, 255, 0, 0.9)";
    ctx.lineWidth = 3;
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";

    const boxW = canvas.width * 0.18;
    const boxH = canvas.height * 0.22;
    const boxY = canvas.height * 0.38;
    const eyeGap = canvas.width * 0.08;
    const centerX = canvas.width / 2;
    const leftX = centerX - eyeGap / 2 - boxW;
    const rightX = centerX + eyeGap / 2;

    ctx.strokeRect(leftX, boxY, boxW, boxH);
    ctx.fillText("Left Eye", leftX + 10, boxY - 10);
    ctx.strokeRect(rightX, boxY, boxW, boxH);
    ctx.fillText("Right Eye", rightX + 10, boxY - 10);
  };

  const takeSnapshotAndAnalyze = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blur = detectBlurWithLaplacian(canvas);
    if (blur < 100) return alert("Image too blurry. Try again.");

    const imageBase64 = canvas.toDataURL("image/png");

    const { score, box } = await runYoloOnImage(imageBase64);
    if (score < 0.5) return alert("No face/eyes detected. Try again.");

    await axios.post("http://localhost:8000/analyze", [{
      image: imageBase64,
      score,
      blur,
      box
    }], { headers: { "Content-Type": "application/json" } });

    navigate(ROUTES.RESULT);
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
      console.error("Error in YOLO inference:", err);
      return { score: 0, box: null };
    }
  };

  return (
      <section className="container py-14 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8">Upload or Capture</h1>

        {!mode && (
            <div className="flex flex-col gap-6 items-center">
              <button className="primary-btn" onClick={() => setMode("upload")}>Upload from Device</button>
              <button className="primary-btn" onClick={() => {
                setMode("camera");
                setTimeout(startCamera, 500);
              }}>Take a Picture</button>
            </div>
        )}

        {mode === "upload" && !analyzing && (
            <>
              <input type="file" accept="image/*,video/*" onChange={handleUpload} className="mb-6 block mx-auto" />
              {message && <p className="text-lg">{message}</p>}
              {file && (
                  message.includes("Image")
                      ? <img src={file} alt="Preview" className="mt-6 max-w-sm mx-auto rounded-lg" />
                      : <video src={file} controls className="mt-6 max-w-sm mx-auto rounded-lg" />
              )}
            </>
        )}

        {mode === "camera" && !analyzing && (
            <div className="mt-6">
              <div className="relative w-full max-w-[640px] mx-auto aspect-video">
                <video ref={videoRef} className="absolute w-full h-full object-cover rounded-lg" muted playsInline />
                <canvas ref={overlayCanvasRef} className="absolute w-full h-full pointer-events-none" />
              </div>
              <button className="primary-btn mt-6" onClick={takeSnapshotAndAnalyze}>📸 Take Picture</button>
            </div>
        )}

        {analyzing && (
            <div>
              <h2 className="text-2xl mb-4">Analyzing...</h2>
              <p>Wait {countdown} seconds</p>
              <div className="loader mx-auto mt-6"></div>
            </div>
        )}
      </section>
  );
};

export default Upload;