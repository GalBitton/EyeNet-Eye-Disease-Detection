import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Shield } from 'lucide-react';
import {HOMECONTENT} from "../../constants/constants.jsx";

import image from '../../assets/symbol1-removebg-preview.png';

const HeroSection = () => (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {HOMECONTENT.HEADER}
              <br></br> <span className="text-blue-600"> {HOMECONTENT.SUBHEADER}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {HOMECONTENT.HERO_TEXT}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                  to="/scan"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Camera className="mr-2 h-5 w-5"/>
                {HOMECONTENT.START_SCAN}
              </Link>
              <Link
                  to="/about"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                {HOMECONTENT.LEARN_MORE}
                <ArrowRight className="ml-2 h-5 w-5"/>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Eye examination technology"
                className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-green-600"/>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">98% Accuracy</p>
                  <p className="text-sm text-gray-600">AI-Driven Detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default HeroSection;