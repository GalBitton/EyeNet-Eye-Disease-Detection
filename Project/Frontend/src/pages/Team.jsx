import React from 'react';
import { Users, Award, BookOpen, Mail } from 'lucide-react';
import {COMMONTEXT, TEAM} from '../constants/constants.jsx';
const Team = () => {
    // const teamMembers = [
    //     {
    //         name: "Gal Bitton",
    //         role: "Backend Developer at Qlik",
    //         expertise: "Backend Development & Node.js | Python",
    //         image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    //         bio: "Software engineer student in his final year at Braude College of Engineering. Passionate about backend development, particularly in Node.js and Python.",
    //         email: "galbitton22@gmail.com"
    //     },
    //     {
    //         name: "Ron Bendel",
    //         role: "Software Engineer at Rafael",
    //         expertise: "Backend Development & Python | AI/ML",
    //         image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    //         bio: "Software engineer student in his final year at Braude College of Engineering. Passionate about backend development, particularly in Node.js and Python.",
    //         email: "ronbendel12345@gmail.com"
    //     },
    // ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Users className="h-16 w-16 text-green-600 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Meet Our Team
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A diverse group of experts in AI, medicine, and technology working together
                            to revolutionize eye health screening worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Introduction */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Interdisciplinary Excellence
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our team brings together world-class expertise from multiple disciplines -
                                artificial intelligence, ophthalmology, software engineering, and user experience design.
                                This unique combination allows us to create solutions that are both technically advanced
                                and medically sound.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                                    <div className="text-gray-600">Team Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                                    <div className="text-gray-600">Years Combined Experience</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team collaboration"
                                className="rounded-2xl shadow-xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Members Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Experts
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            Get to know the passionate individuals behind innovative technology of EyeNet
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto max-w-5xl">
                        {TEAM.MEMBER.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={member.IMAGE}
                                        alt={member.NAME}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.NAME}</h3>
                                    <p className="text-blue-600 font-semibold mb-2">{member.ROLE}</p>
                                    <p className="text-sm text-green-600 mb-4">{member.EXPERTISE}</p>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-5">{member.BIO}</p>
                                    <a
                                        href={`mailto:${member.EMAIL}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Contact
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide our work and drive our mission
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for the highest standards in AI accuracy, user experience,
                                and medical reliability in everything we create.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
                            <p className="text-gray-600">
                                We believe advanced healthcare technology should be accessible to everyone,
                                regardless of location or economic status.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
                            <p className="text-gray-600">
                                We continuously push the boundaries of what is possible in AI-powered
                                medical diagnosis and healthcare technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Join Our Mission
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Are you passionate about using technology to improve healthcare?
                        We are always looking for talented individuals to join our team.
                    </p>
                    <a
                        href="mailto:CataractProject3@gmail.com"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                    >
                        <Mail className="mr-2 h-5 w-5" />
                        {COMMONTEXT.EMAIL}
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Team;