import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import {HOMECONTENT} from "../../constants/constants.jsx";

const CTASection = () => (
    <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {HOMECONTENT.CTA_HEADER}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {HOMECONTENT.CTA_DESC}
            </p>
            <Link
                to="/scan"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
                <Camera className="mr-2 h-5 w-5"/>
                {HOMECONTENT.CTA_BUTTON}
            </Link>
        </div>
    </section>
);

export default CTASection;