import React from 'react';
import RecommendationList from './RecommendationList';
import {generateRecommendations} from "../../utils/generateRecommendations.js";

const EyeResultCard = ({ side, detected, prediction, scores, image, gradCam }) => {
    const confidence = scores?.[prediction] / 100;
    const recommendations = generateRecommendations(prediction);

    return (
        <div className="mb-6">
            <div className="flex flex-col items-center mb-6">
                <h2 className="text-3xl font-bold mb-2">{side}: {prediction}</h2>
                <p className="text-lg text-gray-600">Confidence: {(confidence * 100).toFixed(1)}%</p>

                <div className="flex flex-wrap gap-4 mt-4 mb-6">
                    {image && (
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Eye Image</p>
                            <img src={image} alt={`${side} eye`} className="rounded shadow-md w-48"/>
                        </div>
                    )}
                    {gradCam && (
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Grad-CAM</p>
                            <img src={gradCam} alt={`${side} grad-cam`} className="rounded shadow-md w-48"/>
                        </div>
                    )}
                </div>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {Object.entries(scores).map(([condition, val]) => (
                        <div key={condition} className="p-4 rounded-lg border-2 bg-gray-50">
                            <div className="flex justify-between">
                                <span className="font-semibold">{condition}</span>
                                <span className="font-bold">{val.toFixed(1)}%</span>
                            </div>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full bg-blue-600"
                                     style={{width: `${val.toFixed(1)}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <RecommendationList recommendations={recommendations}/>
            </div>
            );
            };

            export default EyeResultCard;