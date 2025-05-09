export const analyzeMock = (type = "Image") => {
  return {
    left_eye_result: {
      status: type === "Image" ? "Healthy" : "Cataract",
      healthy_confidence: 85.64,
      cataract_confidence: 14.36,
    },
    right_eye_result: {
      status: type === "Image" ? "Cataract" : "Healthy",
      healthy_confidence: 1.03,
      cataract_confidence: 98.97,
    },
    left_eye_image_url: "/assets/eyes/lefteye_test.jpg",
    right_eye_image_url: "/assets/eyes/righteye_test.jpg",
  };
};
