import React, {useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Info, Camera, Download } from 'lucide-react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import sampleImage from '../assets/lefteye_test.jpg'; // Example image, replace with actual image if needed


const Results = () => {
    const location = useLocation();
    const results = location.state?.results || null;
    const [imageBase64, setImageBase64] = useState(null);

    React.useEffect(()=>{
        const convertImageToBase64 = async () => {
            const response = await fetch(sampleImage);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result); // base64 string
            };
            reader.readAsDataURL(blob);
        };
        convertImageToBase64()
    })

    // Mock results for demonstration
    const mockResults = {
        prediction: 'Normal',
        confidence: 0.92,
        conditions: {
            normal: 0.92,
            cataract: 0.05,
            conjunctivitis: 0.02,
            stye: 0.01,
        },
        recommendations: [
            'Your eye appears healthy based on our AI analysis',
            'Continue regular eye check-ups with your eye care professional',
            'Maintain good eye hygiene and protect your eyes from UV rays',
        ],
    };

    const displayResults = results || mockResults;
    const isHealthy = displayResults.prediction.toLowerCase() === 'normal';

    const getConditionColor = (condition, confidence) => {
        if (condition === 'normal') return 'text-green-600';
        if (confidence > 0.7) return 'text-red-600';
        if (confidence > 0.3) return 'text-yellow-600';
        return 'text-gray-600';
    };

    const getConditionBg = (condition, confidence) => {
        if (condition === 'normal') return 'bg-green-50 border-green-200';
        if (confidence > 0.7) return 'bg-red-50 border-red-200';
        if (confidence > 0.3) return 'bg-yellow-50 border-yellow-200';
        return 'bg-gray-50 border-gray-200';
    };

    const exportToPDF = (base64Image) => {
        const doc = new jsPDF();
        const margin = 20;
        let y = margin;

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("EyeNet AI Scan Report", 105, y, { align: "center" });

        y += 10;
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, { align: "center" });

        y += 10;
        doc.setDrawColor(180);
        doc.line(margin, y, 210 - margin, y);

        // 🖼️ Add Image (centered)
        if (base64Image) {
            const imgWidth = 80;
            const imgHeight = 60;
            const imgX = (210 - imgWidth) / 2;
            y += 10;
            doc.addImage(base64Image, 'JPEG', imgX, y, imgWidth, imgHeight);
            y += imgHeight + 10;
        }

        // Prediction
        y += 15;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33);
        doc.text("Prediction Result", margin, y);

        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 120, 50);
        doc.text(
            `Prediction: ${displayResults.prediction} (${(displayResults.confidence * 100).toFixed(1)}%)`,
            margin,
            y
        );

        // Conditions Table
        y += 15;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33);
        doc.text("Conditions Confidence", margin, y);

        const conditionData = Object.entries(displayResults.conditions).map(([key, value]) => [
            key === "normal" ? "Healthy Eye" : key.charAt(0).toUpperCase() + key.slice(1),
            `${(value * 100).toFixed(2)}%`,
        ]);

        const tableY = y + 5;
        autoTable(doc, {
            startY: tableY,
            head: [["Condition", "Confidence"]],
            body: conditionData,
            theme: "striped",
            headStyles: { fillColor: [41, 128, 185] },
            styles: { fontSize: 12, halign: 'center' },
            margin: { left: margin, right: margin },
        });

        const finalY = doc.lastAutoTable.finalY;

        // Recommendations
        y = finalY + 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(33);
        doc.text("Recommendations", margin, y);

        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(50);
        displayResults.recommendations.forEach((rec, i) => {
            doc.text(`• ${rec}`, margin + 2, y + i * 7);
        });

        // Disclaimer
        y += displayResults.recommendations.length * 7 + 10;
        doc.setFontSize(10);
        doc.setTextColor(130);
        doc.text(
            "This report is generated by AI for informational purposes only. It does not replace professional medical advice.",
            margin,
            y,
            { maxWidth: 170 }
        );

        const blob = doc.output("blob");
        saveAs(blob, "EyeNet_Analysis_Report.pdf");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Analysis Results</h1>
                    <p className="text-xl text-gray-600">
                        Here are the results from your eye health scan
                    </p>
                </div>

                {/* Main Result Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                            isHealthy ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                            {isHealthy ? (
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            ) : (
                                <AlertTriangle className="h-10 w-10 text-yellow-600" />
                            )}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {displayResults.prediction}
                        </h2>
                        <p className="text-lg text-gray-600">
                            Confidence: {Math.round(displayResults.confidence * 100)}%
                        </p>
                    </div>

                    {/* Detailed Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {Object.entries(displayResults.conditions).map(([condition, confidence]) => (
                            <div
                                key={condition}
                                className={`p-4 rounded-lg border-2 ${getConditionBg(condition, confidence)}`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold capitalize text-gray-900">
                                        {condition === 'normal' ? 'Healthy Eye' : condition}
                                    </span>
                                    <span className={`font-bold ${getConditionColor(condition, confidence)}`}>
                                        {Math.round(confidence * 100)}%
                                    </span>
                                </div>
                                <div className="mt-2 bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${
                                            condition === 'normal' ? 'bg-green-500' :
                                                confidence > 0.7 ? 'bg-red-500' :
                                                    confidence > 0.3 ? 'bg-yellow-500' : 'bg-gray-400'
                                        }`}
                                        style={{ width: `${confidence * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recommendations */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                            <Info className="h-5 w-5 mr-2" />
                            Recommendations
                        </h3>
                        <ul className="text-blue-800 space-y-2">
                            {displayResults.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link
                        to="/scan"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        <Camera className="mr-2 h-5 w-5" />
                        Take Another Scan
                    </Link>
                    <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                            onClick={() => exportToPDF(imageBase64)}>
                        <Download className="mr-2 h-5 w-5" />
                        Download Results
                    </button>
                </div>

                {/* Medical Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
                            <p className="text-yellow-800">
                                These results are generated by AI and are for informational purposes only.
                                They should not replace professional medical advice, diagnosis, or treatment.
                                Please consult with a qualified eye care professional for proper medical evaluation,
                                especially if you have concerns about your eye health.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
