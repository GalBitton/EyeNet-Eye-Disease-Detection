import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const CTASection = () => (
    <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Check Your Eye Health?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Take the first step towards better eye health with our AI-powered detection system.
                Quick, easy, and reliable results in minutes.
            </p>
            <Link
                to="/scan"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
                <Camera className="mr-2 h-5 w-5"/>
                Start Your Eye Scan Now
            </Link>
        </div>
    </section>
);

export default CTASection;