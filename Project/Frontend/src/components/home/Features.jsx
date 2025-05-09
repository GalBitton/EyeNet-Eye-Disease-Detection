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
    details: "Record a live video of your eyes and detect conditions like cataracts with real-time AI analysis.",
  },
  {
    id: 2,
    name: "Upload Video Analysis",
    icon: <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />,
    description: "Upload videos or images to detect eye conditions seamlessly.",
    details: "Upload a file and get fast, accurate results with our AI engine.",
  },
  {
    id: 3,
    name: "Accurate Results",
    icon: <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />,
    description: "Leverage cutting-edge AI to get precise results for early detection.",
    details: "Our models are trained on thousands of datasets to provide highly reliable results.",
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section className="container py-14 sm:min-h-[600px]">
      <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-semibold text-center mb-12">
        Why Choose Us
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {FeaturesData.map(({ id, name, icon, description, details }) => (
          <div
            key={id}
            className="text-center group space-y-6 p-6 bg-dark hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300"
            onClick={() => setActiveFeature(activeFeature === id ? null : id)}
            data-aos="fade-up"
            data-aos-delay={`${id * 200}`}
          >
            <div className="grid place-items-center">{icon}</div>
            <h2 className="text-2xl">{name}</h2>
            <p>{description}</p>

            {/* Expanded Details */}
            {activeFeature === id && (
              <div className="mt-4 text-sm text-gray-200 dark:text-gray-400">
                {details}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
