import React from 'react';

const TechStackCard = ({ icon, bgColor, iconColor, title, items }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
      {React.cloneElement(icon, { className: `h-8 w-8 ${iconColor}` })}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-600">
      {items.map((item, idx) => (
        <li key={idx}>• {item}</li>
      ))}
    </ul>
  </div>
);

export default TechStackCard;