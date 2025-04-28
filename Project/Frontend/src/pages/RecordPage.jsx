import React, { useState } from "react";
import VideoRecorder from "../components/features/VideoRecorder.jsx"; // (renamed to the new correct component)

const RecordPage = ({ setResults }) => {
  const [predictionHistory, setPredictionHistory] = useState([]);

  return (
      <div className="container py-10">
        <h1 className="text-3xl text-center font-semibold mb-8">Live Eye Health Analysis</h1>

        {/* Video Recorder */}
        <VideoRecorder
            setResults={setResults}
            predictionHistory={predictionHistory}
            setPredictionHistory={setPredictionHistory}
        />
      </div>
  );
};

export default RecordPage;