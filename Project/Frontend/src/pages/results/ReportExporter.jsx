import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { generateRecommendations } from '../../utils/generateRecommendations';

export const exportToPDF = ({ eyes }) => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("EyeNet AI Scan Report", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, { align: "center" });
    y += 20;

    eyes.forEach(({ side, prediction, scores, image, gradCam }) => {
        doc.setFontSize(16).text(`${side} Prediction: ${prediction}`, margin, y);
        y += 8;

        const confidence = scores[prediction];
        doc.setFontSize(12).text(`Confidence: ${confidence.toFixed(1)}%`, margin, y);
        y += 10;

        if (image) {
            doc.addImage(image, 'PNG', margin, y, 60, 45);
            if (gradCam) {
                doc.addImage(gradCam, 'PNG', margin + 70, y, 60, 45);
            }
            y += 50;
        }

        autoTable(doc, {
            startY: y,
            head: [["Condition", "Confidence"]],
            body: Object.entries(scores).map(([k, v]) => [k, `${v.toFixed(2)}%`]),
            margin: { left: margin, right: margin },
        });
        y = doc.lastAutoTable.finalY + 10;

        const recommendations = generateRecommendations(prediction);
        recommendations.forEach((rec, i) => {
            doc.text(`• ${rec}`, margin + 2, y + i * 7);
        });
        y += recommendations.length * 7 + 5;
    });

    const blob = doc.output("blob");
    saveAs(blob, "EyeNet_Analysis_Report.pdf");
};