import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ setResults }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file); // Log the selected file
        setSelectedFile(file);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select an image file before uploading.");
            return;
        }

        setResults(null); // Clear previous results when starting a new upload

        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log("FormData prepared for upload."); // Log FormData preparation

        setIsUploading(true);

        try {
            console.log("Sending upload request...");
            const response = await fetch("http://127.0.0.1:8000/upload", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            console.log("Response received:", response); // Log the response object

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server Error:", errorData); // Log server error
                throw new Error(errorData.detail || "Failed to upload the image.");
            }

            const data = await response.json();
            console.log("Response Data:", data); // Log successful response data
            setResults(data);
        } catch (error) {
            console.error("Error occurred during upload:", error.message || error); // Log error details
            alert("An error occurred while processing the image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="image-upload">
            <h2>Upload Image for Analysis</h2>
            <form onSubmit={handleUpload}>
                <label htmlFor="image-upload">Select an Image</label>
                <input
                    type="file"
                    id="image-upload"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                <button type="submit" className="btn" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Analyze"}
                </button>
            </form>
        </div>
    );
};

export default ImageUpload;
