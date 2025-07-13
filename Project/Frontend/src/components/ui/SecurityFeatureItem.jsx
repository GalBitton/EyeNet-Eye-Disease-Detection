import React from 'react';

const SecurityFeatureItem = ({ icon, bgColor, iconColor, title, description }) => (
  <div className="text-center">
    <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
      {React.cloneElement(icon, { className: `h-8 w-8 ${iconColor}` })}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default SecurityFeatureItem;