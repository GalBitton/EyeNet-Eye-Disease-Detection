import React from "react";
import AppStoreImg from "../../assets/website/app_store.png";
import PlayStoreImg from "../../assets/website/play_store.png";

const AppStore = () => {
  return (
    <section className="container py-10 sm:min-h-[400px] grid place-items-center">
      <div className="space-y-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl sm:text-4xl font-semibold" data-aos="fade-up">
          Get Started with our app
        </h1>
        <p className="text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="300">
          Download our EyeNet mobile app for instant eye health analysis from your smartphone!
        </p>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <a href="#" data-aos="fade-up" data-aos-delay="500">
            <img src={AppStoreImg} alt="App Store" className="max-w-[150px]" />
          </a>
          <a href="#" data-aos="fade-up" data-aos-delay="700">
            <img src={PlayStoreImg} alt="Play Store" className="max-w-[150px]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppStore;
