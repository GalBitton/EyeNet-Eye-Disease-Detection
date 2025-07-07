import React from 'react';
import { Eye, Target, Zap, Users } from 'lucide-react';
import eye_care_technology from '../assets/eye-care-technology.png';
import {ABOUTCONTENT} from "../constants/constants.jsx";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Eye className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            About EyeNet
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Revolutionizing eye health detection through advanced AI technology,
                            making professional-grade diagnosis accessible to everyone, everywhere.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                {ABOUTCONTENT.OUR_MISSION[0]}
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                {ABOUTCONTENT.OUR_MISSION[1]}
                            </p>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Early Detection Saves Sight</h3>
                                <p className="text-blue-800">
                                    {ABOUTCONTENT.DESC}
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src={eye_care_technology}
                                alt="Eye care technology"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            The Problem We're Solving
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Understanding the challenges in modern eye care and how EyeNet addresses them
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Problems */}
                        <div className="bg-red-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-red-900 mb-6">Current Challenges</h3>
                            <ul className="space-y-4 text-red-800">
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>{ABOUTCONTENT.CHALLENGES[0]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>{ABOUTCONTENT.CHALLENGES[1]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>{ABOUTCONTENT.CHALLENGES[2]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>{ABOUTCONTENT.CHALLENGES[3]}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="bg-green-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-green-900 mb-6">EyeNet Solutions</h3>
                            <ul className="space-y-4 text-green-800">
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>{ABOUTCONTENT.SOLUTIONS[0]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>{ABOUTCONTENT.SOLUTIONS[1]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>{ABOUTCONTENT.SOLUTIONS[2]}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>{ABOUTCONTENT.SOLUTIONS[3]}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Makes EyeNet Special
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Advanced technology designed with user experience and accuracy in mind
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Precision AI</h3>
                            <p className="text-gray-600">
                                {ABOUTCONTENT.SPECIAL_FEATURES[0]}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                            <p className="text-gray-600">
                                {ABOUTCONTENT.SPECIAL_FEATURES[1]}
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Universal Design</h3>
                            <p className="text-gray-600">
                                {ABOUTCONTENT.SPECIAL_FEATURES[2]}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Our Impact Goal
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        {ABOUTCONTENT.IMPACT.GOAL}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">{ABOUTCONTENT.IMPACT.ACCURACY.HEADER}</div>
                            <div className="text-blue-100">{ABOUTCONTENT.IMPACT.ACCURACY.DESC}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">{ABOUTCONTENT.IMPACT.DATASET.HEADER}</div>
                            <div className="text-blue-100">{ABOUTCONTENT.IMPACT.DATASET.DESC}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">{ABOUTCONTENT.IMPACT.AVAILABLE.HEADER}</div>
                            <div className="text-blue-100">{ABOUTCONTENT.IMPACT.AVAILABLE.DESC}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;