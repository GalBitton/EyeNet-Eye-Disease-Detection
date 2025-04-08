import React from "react";
import { jsPDF } from "jspdf";

const Exporter = ({ results }) => {
  const { leftEyeResults, rightEyeResults, summary, suggestions } = results;

  const exportToPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Eye Analysis Report", 10, 10);
    doc.setFontSize(12);

    // Left Eye Results
    doc.text("Left Eye Results:", 10, 30);
    doc.text(`Prediction: ${leftEyeResults.status}`, 10, 40);
    doc.text(`Healthy Confidence: ${leftEyeResults.healthy_confidence.toFixed(2)}%`, 10, 50);
    doc.text(`Cataract Confidence: ${leftEyeResults.cataract_confidence.toFixed(2)}%`, 10, 60);

    // Add Left Eye Image
    const leftEyeImage = await fetch(leftEyeResults.image_url).then((res) =>
      res.blob()
    );
    const leftEyeData = await convertBlobToBase64(leftEyeImage);
    doc.addImage(leftEyeData, "JPEG", 150, 30, 40, 40);

    // Right Eye Results
    doc.text("Right Eye Results:", 10, 80);
    doc.text(`Prediction: ${rightEyeResults.status}`, 10, 90);
    doc.text(`Healthy Confidence: ${rightEyeResults.healthy_confidence.toFixed(2)}%`, 10, 100);
    doc.text(`Cataract Confidence: ${rightEyeResults.cataract_confidence.toFixed(2)}%`, 10, 110);

    // Add Right Eye Image
    const rightEyeImage = await fetch(rightEyeResults.image_url).then((res) =>
      res.blob()
    );
    const rightEyeData = await convertBlobToBase64(rightEyeImage);
    doc.addImage(rightEyeData, "JPEG", 150, 80, 40, 40);

    // Summary and Suggestions
    doc.text("Summary:", 10, 130);
    doc.text(summary, 10, 140, { maxWidth: 190 });
    doc.text("Suggestions:", 10, 160);
    doc.text(suggestions, 10, 170, { maxWidth: 190 });

    doc.save("Eye_Analysis_Report.pdf");
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <button onClick={exportToPDF} className="primary-btn">
      Export to PDF
    </button>
  );
};

export default Exporter;
