import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const HelperPage = () => {
  const navigate = useNavigate();

  return (
    <section className="container py-14">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
        Choose How to Analyze Your Eyes
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        Analyze your eye health using one of two options:<br/>
        <strong>Record</strong> a live video, or <strong>Upload</strong> an existing file.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Record */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-semibold">Record a Video</h2>
          <p>Use your device's camera to record live footage of your eyes for analysis.</p>
          <button
            className="primary-btn w-full"
            onClick={() => navigate(ROUTES.RECORD)}
          >
            Go to Record
          </button>
        </div>

        {/* Upload */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-semibold">Upload a File</h2>
          <p>Upload an existing video or image of your eyes for AI analysis.</p>
          <button
            className="primary-btn w-full"
            onClick={() => navigate(ROUTES.UPLOAD)}
          >
            Go to Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default HelperPage;
