import React, { useState, useRef } from 'react';
import { Camera, Upload, Eye, AlertCircle,Video } from 'lucide-react';
import axios from 'axios';

const EyeScan = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'eye-capture.jpg', { type: 'image/jpeg' });
                        setSelectedFile(file);
                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                        stopCamera();
                    }
                });
            }
        }
    };

    const analyzeImage = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResults(response.data);
            // Optional: redirect to results page if needed
            // navigate('/results', { state: { results: response.data } });
        } catch (error) {
            console.error('Error analyzing image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Eye className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Eye Health Scan</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Upload a clear photo or take a live photo of your eye for AI-powered analysis.
                        Our system can detect cataracts, conjunctivitis, and styes with high accuracy.
                    </p>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">For Best Results:</h3>
                    <ul className="text-blue-800 space-y-2">
                        <li>• Ensure good lighting when taking the photo</li>
                        <li>• Keep the eye open and look directly at the camera</li>
                        <li>• Make sure the image is clear and not blurry</li>
                        <li>• Fill most of the frame with the eye area</li>
                    </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Upload Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center space-y-3"
                            >
                                <Upload className="h-12 w-12" />
                                <span className="text-lg font-semibold">Upload Photo</span>
                                <span className="text-sm opacity-90">Choose from your device</span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                onClick={stream ? stopCamera : startCamera}
                                className="w-full bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors flex flex-col items-center space-y-3"
                            >
                                <Camera className="h-12 w-12" />
                                <span className="text-lg font-semibold">
                                    {stream ? 'Stop Camera' : 'Use Camera'}
                                </span>
                                <span className="text-sm opacity-90">Take a live photo</span>
                            </button>
                        </div>

                        <div>
                            <button
                                className="w-full bg-pink-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors flex flex-col items-center space-y-3"
                            >
                                <Video className="h-12 w-12"/>
                                <span className="text-lg font-semibold">Record Video</span>
                                <span className="text-sm opacity-90">Take a live short video</span>
                            </button>
                        </div>
                    </div>

                    {/* Camera View */}
                    {stream && (
                        <div className="mb-6 text-center">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                className="max-w-full max-h-96 rounded-lg shadow-lg mx-auto"
                            />
                            <button
                                onClick={capturePhoto}
                                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Capture Photo
                            </button>
                        </div>
                    )}

                    {/* Preview */}
                    {previewUrl && (
                        <div className="mb-6 text-center">
                            <img
                                src={previewUrl}
                                alt="Eye preview"
                                className="max-w-full max-h-96 rounded-lg shadow-lg mx-auto"
                            />
                        </div>
                    )}

                    {/* Analyze Button */}
                    {selectedFile && (
                        <div className="text-center">
                            <button
                                onClick={analyzeImage}
                                disabled={isLoading}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center mx-auto"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Eye className="mr-2 h-5 w-5" />
                                        Analyze Eye Health
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Results Preview */}
                    {results && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Analysis Results:</h3>
                            <div className="text-sm text-gray-600">
                                <pre>{JSON.stringify(results, null, 2)}</pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Medical Disclaimer</h3>
                            <p className="text-yellow-800">
                                This tool is for informational purposes only and should not replace professional medical advice,
                                diagnosis, or treatment. Always consult with a qualified healthcare provider for proper medical evaluation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EyeScan;
