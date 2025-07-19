import React from 'react';
import SectionHeader from '../../components/ui/SectionHeader.jsx';
import { HOMECONTENT } from '../../constants/constants.jsx';

const VideoTutorial = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
                title={HOMECONTENT.VIDEO_TUTORIAL_HEADER}
                subtitle={HOMECONTENT.VIDEO_TUTORIAL_DESC}
            />
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                    <iframe
                        className="w-full h-full"
                        src={HOMECONTENT.VIDEO_TUTORIAL_LINK}
                        title="EyeNet Tutorial Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    </section>
);

export default VideoTutorial;