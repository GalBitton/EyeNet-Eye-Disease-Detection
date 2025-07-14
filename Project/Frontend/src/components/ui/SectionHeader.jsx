import React from 'react';

const SectionHeader = ({ title, subtitle, titleClass = "text-gray-900", subtitleClass = "text-gray-600" }) => (
    <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClass}`}>
            {title}
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${subtitleClass}`}>
            {subtitle}
        </p>
    </div>
);

export default SectionHeader;