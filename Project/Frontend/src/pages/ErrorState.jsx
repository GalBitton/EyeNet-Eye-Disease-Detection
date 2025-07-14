import {Camera, XCircle} from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

const ErrorState= ({ error }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow rounded-lg p-8 w-full max-w-lg text-center">
                <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold text-red-600 mb-2">An Error Occurred</h2>
                <p className="text-gray-700 mb-4">{error}</p>
                <Link to="/scan" className="btn btn-primary inline-flex items-center">
                    <Camera className="mr-2"/> Try Again
                </Link>
            </div>
        </div>
    )
}

export default ErrorState