import React from 'react';

const FeatureCard = ({ icon, iconBg, iconColor, title, description }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
            {React.cloneElement(icon, { className: `h-8 w-8 ${iconColor}` })}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600">
            {description}
        </p>
    </div>
);

export default FeatureCard;