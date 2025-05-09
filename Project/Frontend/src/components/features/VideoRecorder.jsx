import React, { useRef, useState } from "react";
import axios from "axios";

const VideoRecorderStreaming = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const startRecording = async () => {
    await startCamera();

    const id = Date.now().toString(); // מזהה ייחודי לסשן
    setSessionId(id);

    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const formData = new FormData();
        formData.append("chunk", event.data, `chunk_${Date.now()}.webm`);
        formData.append("session_id", id);

        try {
          await axios.post("http://127.0.0.1:8000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Chunk uploaded successfully");
        } catch (error) {
          console.error("Chunk upload failed", error);
        }
      }
    };

    mediaRecorder.start(1000); // שליחה כל שנייה
    setRecording(true);
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // שליחת בקשת סיום כדי לחבר את החלקים
      try {
        await axios.post("http://127.0.0.1:8000/finish_session", { session_id: sessionId });
        console.log("Session finished and video assembled");
      } catch (error) {
        console.error("Failed to finish session", error);
      }
    }
  };

  return (
    <div className="container py-10 text-center">
      <video ref={videoRef} className="mx-auto bg-black rounded-lg" muted />

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
