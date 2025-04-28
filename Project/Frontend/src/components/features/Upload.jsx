import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../../constants/routes.jsx";

const Upload = ({ setResults }) => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");  // New: For the results summary
  const [analyzing, setAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const handleUpload = (event) => {
    const uploaded = event.target.files[0];
    if (uploaded) {
      const type = uploaded.type.split("/")[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const frameBase64 = reader.result;

        setFile(frameBase64);
        setSummary(""); // Clear previous summary
        if (type === "image") {
          await sendImageForAnalysis(frameBase64);
        } else {
          alert('Video upload is not supported yet here.');
        }
      };

      reader.readAsDataURL(uploaded); // Convert image to base64
    }
  };

  const sendImageForAnalysis = async (frameBase64) => {
    setAnalyzing(true);
    let timeLeft = 5;
    const sessionId = Date.now().toString(); // Unique session ID

    const timer = setInterval(() => {
      setCountdown(timeLeft);
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timer);
      }
    }, 1000);

    try {
      const response = await axios.post('http://127.0.0.1:3000/v1/upload', {
        frameBase64,
        sessionId,
        isCropped: true, // Important: for static image
      });

      if (response.data && response.data.prediction) {
        const textSummary = generateSummary(response.data.prediction);
        setSummary(textSummary);
        setResults(response.data.prediction);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      setSummary('❌ Error analyzing image. Please try again.');
    } finally {
      clearInterval(timer);
      setAnalyzing(false);
    }
  };

  const generateSummary = (prediction) => {
    const normalized = normalizePrediction(prediction);

    const labels = [
      'Cataract',        // Label 0
      'Conjunctivitis',  // Label 1
      'Healthy',         // Label 2
      'Stye'             // Label 3
    ];

    const maxIdx = normalized.indexOf(Math.max(...normalized));

    const predictionLines = normalized
        .map((val, idx) => `Condition No. ${idx+1} (${labels[idx]}): ${(val * 100).toFixed(2)}%`)
        .join('\n');

    const advice = (maxIdx === 2)
        ? "✅ It seems your eye is healthy!"
        : `⚠️ It seems you may have ${labels[maxIdx]}. Please consult a doctor.`;

    return `${predictionLines}\n\n${advice}`;
  };

  const normalizePrediction = (prediction) => {
    const sum = prediction.reduce((acc, val) => acc + val, 0);
    return prediction.map(val => val / sum);
  };

  return (
      <section className="container py-14 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8">
          Upload Image
        </h1>

        {!analyzing ? (
            <>
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="mb-6 block mx-auto"
              />

              {summary && (
                  <div className="text-lg whitespace-pre-line mb-6">
                    {summary}
                  </div>
              )}

              {file && (
                  <img src={file} alt="Preview" className="mt-6 max-w-sm mx-auto rounded-lg" />
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
