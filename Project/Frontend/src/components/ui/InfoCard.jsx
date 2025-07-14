import React from "react";

const InfoCard = ({ icon, title, subtitle }) => (
  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center space-x-3">
      <div className="bg-green-100 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default InfoCard;