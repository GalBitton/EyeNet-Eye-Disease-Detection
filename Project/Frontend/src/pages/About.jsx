import React from "react";
import { Eye, Target, Zap, Users } from "lucide-react";
import eye_care_technology from "../assets/eye-care-technology.png";
import { ABOUTCONTENT } from "../constants/constants.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import FlatFeatureItem from "../components/ui/FlatFeatureItem.jsx";
import ProblemSolutionCard from "../components/ui/ProblemSolutionCard.jsx";
import ImpactStat from "../components/ui/ImpactStat.jsx";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eye className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">About EyeNet</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing eye health detection through advanced AI technology,
            making professional-grade diagnosis accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Our Mission"
              subtitle={ABOUTCONTENT.OUR_MISSION[0]}
            />
            <p className="text-lg text-gray-600 mb-6">{ABOUTCONTENT.OUR_MISSION[1]}</p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Early Detection Saves Sight</h3>
              <p className="text-blue-800">{ABOUTCONTENT.DESC}</p>
            </div>
          </div>
          <div>
            <img src={eye_care_technology} alt="Eye care technology" className="rounded-2xl shadow-xl w-full" />
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="The Problem We're Solving"
            subtitle="Understanding the challenges in modern eye care and how EyeNet addresses them"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProblemSolutionCard
              type="problem"
              header="Current Challenges"
              items={ABOUTCONTENT.CHALLENGES}
              color="bg-red"
            />
            <ProblemSolutionCard
              type="solution"
              header="EyeNet Solutions"
              items={ABOUTCONTENT.SOLUTIONS}
              color="bg-green"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Makes EyeNet Special"
            subtitle="Advanced technology designed with user experience and accuracy in mind"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FlatFeatureItem
              icon={<Target />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              title="Precision AI"
              description={ABOUTCONTENT.SPECIAL_FEATURES[0]}
            />
            <FlatFeatureItem
              icon={<Zap />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              title="Lightning Fast"
              description={ABOUTCONTENT.SPECIAL_FEATURES[1]}
            />
            <FlatFeatureItem
              icon={<Users />}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
              title="Universal Design"
              description={ABOUTCONTENT.SPECIAL_FEATURES[2]}
            />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            title="Our Impact Goal"
            subtitle={ABOUTCONTENT.IMPACT.GOAL}
            titleClass="text-white"
            subtitleClass="text-blue-100"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <ImpactStat
              header={ABOUTCONTENT.IMPACT.ACCURACY.HEADER}
              desc={ABOUTCONTENT.IMPACT.ACCURACY.DESC}
            />
            <ImpactStat
              header={ABOUTCONTENT.IMPACT.DATASET.HEADER}
              desc={ABOUTCONTENT.IMPACT.DATASET.DESC}
            />
            <ImpactStat
              header={ABOUTCONTENT.IMPACT.AVAILABLE.HEADER}
              desc={ABOUTCONTENT.IMPACT.AVAILABLE.DESC}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;