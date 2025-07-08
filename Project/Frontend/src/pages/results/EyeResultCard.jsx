import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import RecommendationList from './RecommendationList';

const EyeResultCard = ({ side, data, generateRecommendations }) => {
    const prediction = data.best_prediction;
    const confidence = data.average_scores[prediction] / 100;
    const recommendations = generateRecommendations(prediction);

    return (
        <div className="mb-6">
            <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${prediction === 'Healthy' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {prediction === 'Healthy'
                        ? <CheckCircle className="h-10 w-10 text-green-600" />
                        : <AlertTriangle className="h-10 w-10 text-yellow-600" />}
                </div>
                <h2 className="text-3xl font-bold">{side}: {prediction}</h2>
                <p className="text-lg text-gray-600">Confidence: {(confidence * 100).toFixed(1)}%</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {Object.entries(data.average_scores).map(([condition, val]) => (
                    <div key={condition} className="p-4 rounded-lg border-2 bg-gray-50">
                        <div className="flex justify-between">
                            <span className="font-semibold">{condition}</span>
                            <span className="font-bold">{val.toFixed(1)}%</span>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${val.toFixed(1)}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <RecommendationList recommendations={recommendations} />
        </div>
    );
};

export default EyeResultCard;