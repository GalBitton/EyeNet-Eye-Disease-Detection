import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { generateRecommendations } from '../../utils/generateRecommendations';

export const exportToPDF = ({ eyes, imageBase64 }) => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("EyeNet AI Scan Report", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, { align: "center" });
    y += 10;

    if (imageBase64) {
        const imgWidth = 80, imgHeight = 60;
        const imgX = (210 - imgWidth) / 2;
        y += 10;
        doc.addImage(imageBase64, 'JPEG', imgX, y, imgWidth, imgHeight);
        y += imgHeight + 10;
    }

    eyes.forEach(({ side, data }) => {
        const prediction = data.best_prediction;
        const confidence = data.average_scores[prediction] / 100;
        const recommendations = generateRecommendations(prediction);

        y += 15;
        doc.setFontSize(16).text(`${side} Prediction`, margin, y);

        y += 8;
        doc.setFontSize(14).text(`Prediction: ${prediction} (${(confidence * 100).toFixed(1)}%)`, margin, y);

        y += 10;
        autoTable(doc, {
            startY: y,
            head: [["Condition", "Confidence"]],
            body: Object.entries(data.average_scores).map(([k, v]) => [k, `${v.toFixed(2)}%`]),
            margin: { left: margin, right: margin },
        });
        y = doc.lastAutoTable.finalY + 10;

        recommendations.forEach((rec, i) => {
            doc.text(`• ${rec}`, margin + 2, y + i * 7);
        });
        y += recommendations.length * 7 + 5;
    });

    const blob = doc.output("blob");
    saveAs(blob, "EyeNet_Analysis_Report.pdf");
};