import React, { useRef, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(5); // נוסיף טיימר אחורה

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
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded_video.webm";
      a.click();
      URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    setRecording(true);

    // טיימר עצירה אוטומטי
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
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="container py-10 text-center">
      <video ref={videoRef} className="mx-auto bg-black rounded-lg" muted />
      <div className="mt-6 flex gap-4 justify-center">
        {!recording ? (
          <button
            className="primary-btn"
            onClick={async () => {
              await startCamera();
              startRecording();
            }}
          >
            Start Recording
          </button>
        ) : (
          <button className="primary-btn bg-red-600" onClick={stopRecording}>
            Stop Recording
          </button>
        )}
      </div>

      {recording && (
        <div className="mt-4 text-lg font-semibold">
          Recording... {countdown} sec left
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
