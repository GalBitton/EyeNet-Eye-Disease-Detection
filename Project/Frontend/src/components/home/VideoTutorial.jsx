import React from 'react';
import {HOMECONTENT} from "../../constants/constants.jsx";

const VideoTutorial = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {HOMECONTENT.VIDEO_TUTORIAL_HEADER}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {HOMECONTENT.VIDEO_TUTORIAL_DESC}
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video flex items-center justify-center">
                        <div className="text-center text-white">
                            <div
                                className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div
                                    className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-white border-r-[12px] border-r-transparent ml-1"></div>
                            </div>
                            <p className="text-lg">Tutorial Video Coming Soon</p>
                            <p className="text-gray-300 mt-2">Step-by-step guide to using EyeNet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default VideoTutorial;