import React from 'react';

const FeatureListItem = ({ icon, bgColor, iconColor, title, description }) => (
  <div className="flex items-start space-x-3">
    <div className={`${bgColor} p-2 rounded-full`}>
      {React.cloneElement(icon, { className: `h-5 w-5 ${iconColor}` })}
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default FeatureListItem;