import React from "react";
import "./ResultPage.css";

const ResultPage = ({ results, setResults }) => {
    console.log("Rendering ResultPage with results:", results); // Log when results are rendered

    if (!results) return null;

    const { left_eye_result, right_eye_result, left_eye_image_url, right_eye_image_url } = results;

    const getUniqueUrl = (url) => `${url}?t=${new Date().getTime()}`;

    return (
        <div className="result-page">
            <h1>Analysis Results</h1>
            <div className="results-container">
                <div className="eye-result">
                    <h2>Left Eye</h2>
                    {left_eye_image_url ? (
                        <img src={getUniqueUrl(`http://127.0.0.1:8000${left_eye_image_url}`)} alt="Left Eye" />
                    ) : (
                        <p>No Left Eye Detected</p>
                    )}
                    <p>Prediction: {left_eye_result?.status || "Not Detected"}</p>
                    <p>Healthy Confidence: {left_eye_result?.healthy_confidence?.toFixed(2) || "0.00"}%</p>
                    <p>Cataract Confidence: {left_eye_result?.cataract_confidence?.toFixed(2) || "0.00"}%</p>
                </div>
                <div className="eye-result">
                    <h2>Right Eye</h2>
                    {right_eye_image_url ? (
                        <img src={getUniqueUrl(`http://127.0.0.1:8000${right_eye_image_url}`)} alt="Right Eye" />
                    ) : (
                        <p>No Right Eye Detected</p>
                    )}
                    <p>Prediction: {right_eye_result?.status || "Not Detected"}</p>
                    <p>Healthy Confidence: {right_eye_result?.healthy_confidence?.toFixed(2) || "0.00"}%</p>
                    <p>Cataract Confidence: {right_eye_result?.cataract_confidence?.toFixed(2) || "0.00"}%</p>
                </div>
            </div>
            <button className="btn" onClick={() => setResults(null)}>
                Return to Main Menu
            </button>
        </div>
    );
};

export default ResultPage;
