import React from "react";
import Exporter from "../common/Exporter.jsx";

const ResultPage = ({ results, setResults }) => {
  if (!results) return null;

  const { left_eye_result, right_eye_result, left_eye_image_url, right_eye_image_url } = results;

  return (
    <section className="container py-14 text-center">
      <h1 className="text-4xl font-bold mb-8 text-primary">Analysis Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Eye */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Left Eye</h2>
          <img src={left_eye_image_url} alt="Left Eye" className="w-32 h-32 mx-auto rounded-full mb-4" />
          <p>Prediction: {left_eye_result.status}</p>
          <p>Healthy Confidence: {left_eye_result.healthy_confidence}%</p>
          <p>Cataract Confidence: {left_eye_result.cataract_confidence}%</p>
        </div>

        {/* Right Eye */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Right Eye</h2>
          <img src={right_eye_image_url} alt="Right Eye" className="w-32 h-32 mx-auto rounded-full mb-4" />
          <p>Prediction: {right_eye_result.status}</p>
          <p>Healthy Confidence: {right_eye_result.healthy_confidence}%</p>
          <p>Cataract Confidence: {right_eye_result.cataract_confidence}%</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <Exporter results={results} />
        <button className="primary-btn bg-gray-700" onClick={() => setResults(null)}>
          Return to Main Menu
        </button>
      </div>
    </section>
  );
};

export default ResultPage;
