const RecommendationList = ({ recommendations }) => (
    <div className="bg-blue-50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommendations</h3>
        <ul className="text-blue-800 space-y-2">
            {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default RecommendationList;