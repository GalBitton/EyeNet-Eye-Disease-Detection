import React from 'react';
import HeroSection from '../components/home/HeroSection';
import VideoTutorial from '../components/home/VideoTutorial';
import FeaturesSection from '../components/home/Features';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <VideoTutorial />
            <FeaturesSection />
            <CTASection />
        </div>
    );
};

export default HomePage;