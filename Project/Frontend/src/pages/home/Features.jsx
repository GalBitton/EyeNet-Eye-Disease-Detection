import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';
import SectionHeader from '../../components/ui/SectionHeader.jsx';
import FeatureCard from '../../components/ui/FeatureCard.jsx';
import { HOMECONTENT } from '../../constants/constants.jsx';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Zap />,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: HOMECONTENT.FEATURES.INSTANT_RESULTS.TITLE,
            description: HOMECONTENT.FEATURES.INSTANT_RESULTS.DESCRIPTION
        },
        {
            icon: <Shield />,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            title: HOMECONTENT.FEATURES.HIGH_ACCURACY.TITLE,
            description: HOMECONTENT.FEATURES.HIGH_ACCURACY.DESCRIPTION
        },
        {
            icon: <Users />,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            title: HOMECONTENT.FEATURES.USER_FRIENDLY.TITLE,
            description: HOMECONTENT.FEATURES.USER_FRIENDLY.DESCRIPTION
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={HOMECONTENT.FEATURES_HEADER}
                    subtitle={HOMECONTENT.FEATURES_DESC}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;