import React from "react";

const ImpactStat = ({ header, desc }) => (
  <div>
    <div className="text-4xl font-bold mb-2">{header}</div>
    <div className="text-blue-100">{desc}</div>
  </div>
);

export default ImpactStat;