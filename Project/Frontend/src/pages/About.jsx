import React from 'react';
import { Eye, Target, Zap, Users } from 'lucide-react';
import eye_care_technology from '../assets/eye-care-technology.png'; // Adjust the path as necessary

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
                                The sense of sight is fundamental to our daily lives, yet millions of people worldwide
                                lack access to timely and affordable eye care. Traditional diagnosis methods are often
                                time-consuming, expensive, and require specialized medical equipment.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                EyeNet bridges this gap by providing an accessible, AI-powered solution that can detect
                                external eye conditions with remarkable accuracy. Our goal is to democratize eye health
                                screening and enable early detection of conditions like cataracts, conjunctivitis, and styes.
                            </p>
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Early Detection Saves Sight</h3>
                                <p className="text-blue-800">
                                    Many eye conditions can be effectively treated when caught early. Our AI technology
                                    helps identify potential issues before they significantly impact your vision and daily functioning.
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
                                    <span>Limited access to specialized eye care equipment</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>Time-consuming and expensive diagnostic processes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>Geographic barriers to professional eye care</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">❌</span>
                                    <span>Delayed detection leading to vision complications</span>
                                </li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div className="bg-green-50 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-green-900 mb-6">EyeNet Solutions</h3>
                            <ul className="space-y-4 text-green-800">
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>Accessible AI-powered screening from any device</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>Instant results with 91% accuracy rate</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>Available 24/7 from the comfort of your home</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-3 mt-1">✅</span>
                                    <span>Early detection enabling timely treatment</span>
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
                                Our DenseNet121 model with attention mechanisms is trained on over 13,000 images
                                per condition, ensuring high accuracy and reliability.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                            <p className="text-gray-600">
                                Get comprehensive eye health analysis in seconds, not hours.
                                Our optimized system delivers results almost instantly.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Universal Design</h3>
                            <p className="text-gray-600">
                                Designed for users aged 10 to 80+, with intuitive interfaces that work
                                seamlessly across all devices and platforms.
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
                        We envision a world where advanced eye health screening is accessible to everyone,
                        regardless of location, economic status, or access to specialized healthcare facilities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">91%</div>
                            <div className="text-blue-100">Detection Accuracy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">13K+</div>
                            <div className="text-blue-100">Training Images per Condition</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-blue-100">Available Worldwide</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;