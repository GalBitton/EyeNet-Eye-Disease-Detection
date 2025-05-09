import React, { useState } from "react";
import HeroPng from "../../assets/DeviceScanner-removebg-preview.png";
import { BiPlayCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader.jsx"; // נטען את הקומפוננטה Loader

const Hero = ({ togglePlay }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);

    // נחכה חצי שנייה ואז ננווט
    setTimeout(() => {
      setIsLoading(false);
      navigate("/helper");
    }, 1000); // 1 שנייה (אפשר להאריך/לקצר לפי מה שתרצה)
  };

  return (
    <section className="py-12 sm:py-0 dark:bg-black dark:text-white duration-300 overflow-hidden">
      <div className="container min-h-[700px] flex relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
          {/* hero text section */}
          <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
            <h1 data-aos="fade-up" className="text-4xl font-semibold">
              Explore Eye{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Health with EyeNet
              </span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300">
              A platform that enables the detection of eye conditions such as
              cataracts, conjunctivitis, and stye using advanced AI
              technology.<br /> Analyze your eye health in real-time or through
              videos.
            </p>

            {/* Buttons */}
            <div className="flex gap-6">
              <button
                data-aos="fade-up"
                data-aos-delay="500"
                className="primary-btn flex items-center gap-2 justify-center min-w-[150px]"
                onClick={handleGetStarted}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Get Started"
                )}
              </button>

              <button
                data-aos="fade-up"
                data-aos-delay="700"
                onClick={togglePlay}
                className="flex items-center gap-2"
              >
                <BiPlayCircle className="text-3xl" />
                See Demo
              </button>
            </div>
          </div>

          {/* image section */}
          <div
            data-aos="fade-up"
            data-aos-offset="0"
            className="order-1 sm:order-2"
          >
            <img src={HeroPng} alt="Hero Section" className="w-full max-w-md mx-auto" />
          </div>
        </div>

        {/* Animated Blob */}
        <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
      </div>
    </section>
  );
};

export default Hero;
