import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecorder = ({ setResults }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [analyzing, setAnalyzing] = useState(false);
  const frameCountRef = useRef(0);
  const videoRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const captureIntervalRef = useRef(null);

  const navigate = useNavigate();

  // Start the camera feed
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        drawOverlay(); // Draw the overlay marks
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      clearInterval(captureIntervalRef.current);
    };
  }, []);

  // Draw overlay marks on the canvas
  const drawOverlay = () => {
    if (overlayCanvasRef.current && videoRef.current) {
      const ctx = overlayCanvasRef.current.getContext("2d");
      const videoWidth = videoRef.current.videoWidth || 640;
      const videoHeight = videoRef.current.videoHeight || 480;

      overlayCanvasRef.current.width = videoWidth;
      overlayCanvasRef.current.height = videoHeight;

      ctx.clearRect(0, 0, videoWidth, videoHeight);

      // Humanized positions for the face and eyes based on video dimensions
      const faceX = videoWidth * 0.3;
      const faceY = videoHeight * 0.2;
      const faceWidth = videoWidth * 0.4;
      const faceHeight = videoHeight * 0.5;

      const leftEyeX = faceX + faceWidth * 0.25;
      const rightEyeX = faceX + faceWidth * 0.6;
      const eyeY = faceY + faceHeight * 0.3;
      const eyeWidth = faceWidth * 0.12;
      const eyeHeight = faceHeight * 0.1;

      // Draw face ellipse
      ctx.beginPath();
      ctx.ellipse(
        faceX + faceWidth / 2,
        faceY + faceHeight / 2,
        faceWidth / 2,
        faceHeight / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw left eye ellipse
      ctx.beginPath();
      ctx.ellipse(
        leftEyeX + eyeWidth / 2,
        eyeY + eyeHeight / 2,
        eyeWidth,
        eyeHeight / 1.5,
        0,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw right eye ellipse
      ctx.beginPath();
      ctx.ellipse(
        rightEyeX + eyeWidth / 2,
        eyeY + eyeHeight / 2,
        eyeWidth,
        eyeHeight / 1.5,
        0,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    requestAnimationFrame(drawOverlay);
  };

  // Capture frames directly from the video feed
  const captureFrame = () => {
    if (videoRef.current) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `temp/frame-${timestamp}.png`;

      // Create an offscreen canvas to capture the video frame
      const captureCanvas = document.createElement("canvas");
      const videoWidth = videoRef.current.videoWidth || 640;
      const videoHeight = videoRef.current.videoHeight || 480;

      captureCanvas.width = videoWidth;
      captureCanvas.height = videoHeight;

      const captureCtx = captureCanvas.getContext("2d");
      captureCtx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

      captureCanvas.toBlob(
        (blob) => {
          if (blob) {
            console.log(`Frame saved as: ${fileName}`);
          }
        },
        "image/png",
        1.0
      );

      frameCountRef.current += 1;
    }
  };

  // Start recording logic
  const startRecording = () => {
    console.log("Starting record");
    setIsRecording(true);
    frameCountRef.current = 0;
    setStartTime(Date.now());

    // Start capturing frames every 0.5 seconds
    captureIntervalRef.current = setInterval(captureFrame, 500);

    // Start countdown timer
    let timeLeft = 5;
    const countdownTimer = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(countdownTimer);
        stopRecording();
      }
    }, 1000);
  };

  // Stop recording logic
  const stopRecording = () => {
    console.log("Stopped record");
    setIsRecording(false);
    setAnalyzing(true);

    clearInterval(captureIntervalRef.current);

    if (startTime) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`Video length is ${duration} seconds`);
      console.log(`Total frames captured: ${frameCountRef.current}`);
      setStartTime(null);
    }

    // Start analyzing animation and navigate to ResultPage
    let timeLeft = 5;
    const analyzeTimer = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(analyzeTimer);

        // Mock results for demo
        setResults({
          left_eye_result: { status: "Healthy", healthy_confidence: 85.64, cataract_confidence: 14.36 },
          right_eye_result: { status: "Cataract", healthy_confidence: 1.03, cataract_confidence: 98.97 },
          left_eye_image_url: "/assets/lefteye_test.jpg",
          right_eye_image_url: "/assets/righteye_test.jpg",
        });

        navigate("/result");
      }
    }, 1000);
  };

  return (
    <div className="container py-14">
      <h1 className="text-2xl sm:text-4xl font-semibold text-center mb-8">
        Record Video for Eye Analysis
      </h1>
      {!analyzing ? (
        <>
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[90vw] sm:max-w-[640px]">
              <video ref={videoRef} className="w-full h-auto bg-black rounded-lg" muted />
              <canvas
                ref={overlayCanvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-6">
            {!isRecording ? (
              <button className="primary-btn" onClick={startRecording}>
                Start Record
              </button>
            ) : (
              <p className="text-lg font-medium">Recording... {countdown} seconds remaining</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Analyzing...</h2>
          <p className="text-lg mt-2">Please wait {countdown} seconds</p>
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mt-6"></div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
