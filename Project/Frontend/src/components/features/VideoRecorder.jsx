import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const VideoRecorderStreaming = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [captureCount, setCaptureCount] = useState(0); // Track how many frames uploaded
  const [finalPrediction, setFinalPrediction] = useState(null); // Save the final result
  const captureIntervalRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureFrameAndSend = async (currentSessionId) => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frameBase64 = canvas.toDataURL('image/jpeg');

    try {
      const response = await axios.post("http://127.0.0.1:3000/v1/upload", {
        frameBase64,
        sessionId: currentSessionId,
      });
      console.log("Frame uploaded successfully");

      setCaptureCount((prev) => {
        const newCount = prev + 1;

        // If this was the 5th successful frame
        if (newCount === 5) {
          setFinalPrediction(response.data.prediction); // Save final prediction
          stopRecording(); // Stop capturing frames
        }

        return newCount;
      });

    } catch (error) {
      console.error("Frame upload failed:", error);
    }
  };

  const startRecording = async () => {
    await startCamera();

    const id = Date.now().toString(); // Unique session ID
    setSessionId(id);
    setCaptureCount(0); // Reset capture count
    setFinalPrediction(null); // Reset previous prediction
    setRecording(true);

    captureIntervalRef.current = setInterval(() => {
      captureFrameAndSend(id);
    }, 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const showResultsPopup = (prediction) => {
    const sum = prediction.reduce((acc, val) => acc + val, 0);

    // Normalize each class probability
    const normalized = prediction.map(val => val / sum);

    const formatted = normalized
        .map((val, idx) => `Class ${idx}: ${(val * 100).toFixed(2)}%`)
        .join('\n');

    window.alert(`Final Prediction:\n${formatted}`);
  };

  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (finalPrediction) {
      const sum = finalPrediction.reduce((acc, val) => acc + val, 0);
      const normalized = finalPrediction.map(val => val / sum);

      alert(`Final Prediction:\n${normalized.map((p, idx) => `Class ${idx}: ${(p * 100).toFixed(2)}%`).join('\n')}`);
    }
  }, [finalPrediction]);

  return (
      <div className="container py-10 text-center">
        <video ref={videoRef} className="mx-auto bg-black rounded-lg" muted playsInline />

        <div className="mt-6 flex gap-4 justify-center">
          {!recording ? (
              <button className="primary-btn" onClick={startRecording}>
                Start Recording
              </button>
          ) : (
              <button className="primary-btn bg-red-600" onClick={stopRecording}>
                Stop Recording
              </button>
          )}
        </div>
      </div>
  );
};

export default VideoRecorderStreaming;
