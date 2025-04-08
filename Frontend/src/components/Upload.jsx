import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      const fileType = uploadedFile.type.split("/")[0];

      if (fileType === "image") {
        setMessage("Image uploaded successfully");
        setFile(URL.createObjectURL(uploadedFile));
        analyzeFile("Image");
      } else if (fileType === "video") {
        setMessage("Video uploaded successfully");
        setFile(URL.createObjectURL(uploadedFile));
        analyzeFile("Video");
      } else {
        setMessage("Unsupported file type");
        setFile(null);
      }
    } else {
      setMessage("Failed to Upload");
    }
  };

  const analyzeFile = (type) => {
    setAnalyzing(true);
    let timeLeft = 5;

    const timer = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timer);

        setResults({
          left_eye_result: { status: type === "Image" ? "Healthy" : "Cataract", healthy_confidence: 85.64, cataract_confidence: 14.36 },
          right_eye_result: { status: type === "Image" ? "Cataract" : "Healthy", healthy_confidence: 1.03, cataract_confidence: 98.97 },
          left_eye_image_url: "/assets/lefteye_test.jpg",
          right_eye_image_url: "/assets/righteye_test.jpg",
        });
        navigate("/result");
      }
    }, 1000);
  };

  return (
    <div className="container py-14">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
        Upload Video or Image
      </h1>

      {!analyzing ? (
        <>
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/*,video/*"
              className="text-gray-700 bg-gray-100 dark:bg-gray-800 rounded-md p-2 w-full max-w-[400px]"
              onChange={handleFileUpload}
            />
          </div>

          {message && (
            <p
              className={`mt-4 text-center text-lg font-medium ${
                message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            {file && message.includes("Image") && (
              <img src={file} alt="Uploaded Content" className="max-w-full rounded-lg shadow-md" />
            )}
            {file && message.includes("Video") && (
              <video src={file} controls className="max-w-full rounded-lg shadow-md" />
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Analyzing...</h2>
          <p className="text-lg mt-2">Please wait {countdown} seconds</p>
          <div className="relative w-16 h-16 mx-auto mt-6">
            <div className="absolute inset-0 w-full h-full animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <div className="absolute inset-0 w-full h-full animate-ping rounded-full bg-primary opacity-50"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
