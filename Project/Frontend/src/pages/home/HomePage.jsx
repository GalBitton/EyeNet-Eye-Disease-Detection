import React from 'react';
import HeroSection from './HeroSection.jsx';
import VideoTutorial from './VideoTutorial.jsx';
import FeaturesSection from './Features.jsx';
import CallToActionSection from './CallToActionSection.jsx';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <VideoTutorial />
            <FeaturesSection />
            <CallToActionSection />
        </div>
    );
};

export default HomePage;