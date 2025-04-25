import React from "react";
import { jsPDF } from "jspdf";
import { blobToBase64 } from "../../utils/blobToBase64";

const Exporter = ({ results }) => {
  const { left_eye_result, right_eye_result, left_eye_image_url, right_eye_image_url } = results;

  const exportToPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("EyeNet Analysis Report", 70, 20);

    doc.setFontSize(14);
    doc.text("Left Eye Results:", 10, 40);
    doc.text(`Prediction: ${left_eye_result.status}`, 10, 50);
    doc.text(`Healthy Confidence: ${left_eye_result.healthy_confidence.toFixed(2)}%`, 10, 60);
    doc.text(`Cataract Confidence: ${left_eye_result.cataract_confidence.toFixed(2)}%`, 10, 70);

    // הוספת תמונה שמאלית
    const leftImageBlob = await fetch(left_eye_image_url).then(res => res.blob());
    const leftImageBase64 = await blobToBase64(leftImageBlob);
    doc.addImage(leftImageBase64, "JPEG", 140, 40, 50, 50);

    doc.text("Right Eye Results:", 10, 100);
    doc.text(`Prediction: ${right_eye_result.status}`, 10, 110);
    doc.text(`Healthy Confidence: ${right_eye_result.healthy_confidence.toFixed(2)}%`, 10, 120);
    doc.text(`Cataract Confidence: ${right_eye_result.cataract_confidence.toFixed(2)}%`, 10, 130);

    // הוספת תמונה ימנית
    const rightImageBlob = await fetch(right_eye_image_url).then(res => res.blob());
    const rightImageBase64 = await blobToBase64(rightImageBlob);
    doc.addImage(rightImageBase64, "JPEG", 140, 100, 50, 50);

    doc.save("EyeNet_Analysis_Report.pdf");
  };

  return (
    <button onClick={exportToPDF} className="primary-btn">
      Export to PDF
    </button>
  );
};

export default Exporter;
