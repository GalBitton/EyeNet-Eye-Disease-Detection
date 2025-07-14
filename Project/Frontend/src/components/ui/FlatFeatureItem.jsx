import React from "react";

const FlatFeatureItem = ({ icon, iconBg, iconColor, title, description }) => (
  <div className="text-center">
    <div
      className={`${iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
    >
      {React.cloneElement(icon, { className: `h-10 w-10 ${iconColor}` })}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FlatFeatureItem;