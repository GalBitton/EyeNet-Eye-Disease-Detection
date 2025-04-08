import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const FeaturesData = [
  {
    id: 1,
    name: "Live Video Analysis",
    icon: <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />,
    description: "Use your device's camera to analyze eye health in real-time.",
    details:
      "This feature allows you to record a live video of your eyes using your device's camera. The recorded frames are analyzed in real-time to detect eye conditions like cataracts. Ensure your face is well-lit and aligned with the camera during the recording.",
  },
  {
    id: 2,
    name: "Upload Video Analysis",
    icon: <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />,
    description: "Upload pre-recorded videos to detect eye conditions seamlessly.",
    details:
      "This feature allows you to upload a pre-recorded video or an image for analysis. Our system processes the uploaded file and detects potential eye conditions with high accuracy. Make sure the file is clear and of good quality.",
  },
  {
    id: 3,
    name: "Accurate Results",
    icon: <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />,
    description: "Leverage cutting-edge AI to get precise results for early detection.",
    details:
      "Our platform uses advanced AI algorithms trained on thousands of datasets to ensure highly accurate results. It can detect early signs of eye conditions, providing valuable insights for proactive healthcare.",
  },
];

const Features = () => {
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (id) => setActivePopup(id);
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <div className="container py-14 sm:min-h-[600px]">
        <div>
          <h1
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl mb-12"
          >
            Why Choose Us
          </h1>

          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {FeaturesData.map(({ id, name, icon, description }) => (
              <div
                key={id}
                data-aos="fade-up"
                data-aos-delay={`${id * 200}`}
                className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-dark hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300"
              >
                <div className="grid place-items-center">{icon}</div>
                <h1 className="text-2xl">{name}</h1>
                <p>{description}</p>
                <button
                  className="inline-block text-lg font-semibold py-3 text-primary group-hover:text-black duration-300"
                  onClick={() => openPopup(id)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup section */}
      {activePopup && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            {/* Popup Content */}
            {FeaturesData.map(
              ({ id, name, details }) =>
                id === activePopup && (
                  <div key={id}>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">
                      {name}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{details}</p>
                    <button
                      onClick={closePopup}
                      className="primary-btn w-full"
                    >
                      Close
                    </button>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
