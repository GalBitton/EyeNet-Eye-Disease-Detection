import React from 'react';
import { HOMECONTENT } from "../../constants/constants.jsx";
import { Camera, ArrowRight, Shield } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import InfoCard from "../../components/ui/InfoCard.jsx";

import image from '../../assets/DeviceScanner.png';

const HeroSection = () => (
  <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {HOMECONTENT.HEADER}
            <br /> <span className="text-blue-600">{HOMECONTENT.SUBHEADER}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {HOMECONTENT.HERO_TEXT}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              to="/scan"
              variant="primary"
              iconLeft={<Camera className="h-5 w-5" />}
            >
              {HOMECONTENT.START_SCAN}
            </Button>
            <Button
              to="/about"
              variant="secondary"
              iconRight={<ArrowRight className="h-5 w-5" />}
            >
              {HOMECONTENT.LEARN_MORE}
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src={image}
            alt="Eye examination technology"
            className="rounded-2xl shadow-2xl w-4/5 mx-auto"
          />
          <InfoCard
            icon={<Shield className="h-6 w-6 text-green-600" />}
            title="98% Accuracy"
            subtitle="AI-Driven Detection"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;