import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeMock } from "../../utils/analyzeMock";
import { ROUTES } from "../../constants/routes";

const Upload = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

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
        setResults(analyzeMock(type));
        navigate(ROUTES.RESULT);
      }
    }, 1000);
  };

  return (
    <section className="container py-14 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8">
        Upload Video or Image
      </h1>

      {!analyzing ? (
        <>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            className="mb-6 block mx-auto"
          />
          {message && <p className="text-lg">{message}</p>}
          {file && (
            <>
              {message.includes("Image") ? (
                <img src={file} alt="Preview" className="mt-6 max-w-sm mx-auto rounded-lg" />
              ) : (
                <video src={file} controls className="mt-6 max-w-sm mx-auto rounded-lg" />
              )}
            </>
          )}
        </>
      ) : (
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
