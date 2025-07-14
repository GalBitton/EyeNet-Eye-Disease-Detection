import React from "react";
import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import { HOMECONTENT } from "../../constants/constants.jsx";

const HeroActionButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4">
    <Link
      to="/scan"
      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
    >
      <Camera className="mr-2 h-5 w-5" />
      {HOMECONTENT.START_SCAN}
    </Link>
    <Link
      to="/about"
      className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
    >
      {HOMECONTENT.LEARN_MORE}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  </div>
);

export default HeroActionButtons;