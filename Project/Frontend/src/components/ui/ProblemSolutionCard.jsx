import React from "react";

const ProblemSolutionCard = ({ type, header, items, color }) => (
  <div className={`${color}-50 p-8 rounded-xl`}>
    <h3 className={`text-2xl font-bold mb-6`}>{header}</h3>
    <ul className={`space-y-4 ${color}-800`}>
      {items.map((text, idx) => (
        <li key={idx} className="flex items-start">
          <span className="mr-3 mt-1">{type === "problem" ? "❌" : "✅"}</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProblemSolutionCard;