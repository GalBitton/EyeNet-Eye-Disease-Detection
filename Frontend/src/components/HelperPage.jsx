import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HelperPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="container py-14">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
        Choose How to Analyze Your Eyes
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        You can analyze your eye health using one of two features:
        <br/><strong> Record</strong>, where you record a video in real-time.
        <br/><strong> Upload</strong>, where you upload an existing video or image
        for analysis.<br/> Follow the instructions below to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Record Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Record a Video
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use this feature to record a live video of your eyes in real-time.
            The system will process the video to detect and analyze your eye
            health.
          </p>
          <button
            className="primary-btn w-full"
            onClick={() => navigate("/record-video")} // Navigate to Record Page
          >
            Go to Record
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Upload a File
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use this feature to upload an existing video or image of your eyes
            for analysis. Ensure your file meets the requirements for accurate
            results.
          </p>
          <button
            className="primary-btn w-full"
            onClick={() => navigate("/video-upload")} // Navigate to Upload Page
          >
            Go to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelperPage;
