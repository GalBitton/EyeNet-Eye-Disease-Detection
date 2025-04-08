import React from "react";
import LeftEyeTest from "../assets/lefteye_test.jpg"; // Import left eye test image
import RightEyeTest from "../assets/righteye_test.jpg"; // Import right eye test image
import Exporter from "./Exporter"; // Import the Exporter component

const ResultPage = ({ setResults }) => {
  // Results are constant for this design
  const leftEyeResults = {
    status: "Healthy",
    healthy_confidence: 85.64,
    cataract_confidence: 4.36,
    stye_confidence: 6.20,
    conjunctivitis_confidence: 3.80,
    image_url: LeftEyeTest,
  };

  const rightEyeResults = {
    status: "Cataract",
    healthy_confidence: 1.09,
    cataract_confidence: 98.41,
    stye_confidence: 0.04,
    conjunctivitis_confidence: 0.46,
    image_url: RightEyeTest,
  };

  const summary = `The analysis suggests that your left eye is healthy with minor concerns, while the right eye shows a high likelihood of cataracts.`;
  const suggestions = `We strongly recommend consulting an ophthalmologist for further evaluation and treatment. Early diagnosis and intervention are key to maintaining good eye health.`;

  return (
    <div className="container py-14">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Analysis Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Eye Result */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Left Eye</h2>
          <img
            src={leftEyeResults.image_url}
            alt="Left Eye"
            className="w-32 h-32 mx-auto rounded-lg mb-4"
          />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Prediction:</strong> {leftEyeResults.status}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Healthy Confidence:</strong> {leftEyeResults.healthy_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Cataract Confidence:</strong> {leftEyeResults.cataract_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Stye Confidence:</strong> {leftEyeResults.stye_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Conjunctivitis Confidence:</strong> {leftEyeResults.conjunctivitis_confidence.toFixed(2)}%
          </p>
        </div>

        {/* Right Eye Result */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Right Eye</h2>
          <img
            src={rightEyeResults.image_url}
            alt="Right Eye"
            className="w-32 h-32 mx-auto rounded-lg mb-4"
          />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Prediction:</strong> {rightEyeResults.status}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Healthy Confidence:</strong> {rightEyeResults.healthy_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Cataract Confidence:</strong> {rightEyeResults.cataract_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Stye Confidence:</strong> {rightEyeResults.stye_confidence.toFixed(2)}%
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Conjunctivitis Confidence:</strong> {rightEyeResults.conjunctivitis_confidence.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 mt-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{summary}</p>
        <h3 className="text-xl font-bold mb-4">Suggestions for Future Treatments</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">{suggestions}</p>
      </div>

      {/* Export and Return Buttons */}
      <div className="text-center mt-8 flex justify-center gap-6">
        <Exporter
          results={{
            leftEyeResults,
            rightEyeResults,
            summary,
            suggestions,
          }}
        />
        <button
          className="primary-btn bg-gray-700 hover:bg-gray-600"
          onClick={() => setResults(null)}
        >
          Return to Main Menu
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
