import React from 'react';
import { Users, Award, BookOpen, Mail } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FeatureCard from '../components/ui/FeatureCard';
import TeamMemberCard from '../components/ui/TeamMemberCard';
import { COMMONTEXT, TEAM } from '../constants/constants.jsx';

const Team = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are two final-semester software engineering students working together on
            our capstone project to bring innovative technology to eye health screening.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <SectionHeader title="Collaborative Effort" />
            <p className="text-lg text-gray-600 mb-6">
              This project combines our knowledge and skills in software development, AI, and UX design
              — aiming to create a meaningful solution that improves accessibility in eye health screening.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Final Project</div>
                <div className="text-gray-600">Software Engineering Degree</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Project"
            subtitle="Get to know the passionate individuals behind EyeNet"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-4xl justify-items-center">
            {TEAM.MEMBER.map((member, idx) => (
              <TeamMemberCard
                key={idx}
                image={member.IMAGE}
                name={member.NAME}
                role={member.ROLE}
                expertise={member.EXPERTISE}
                bio={member.BIO}
                email={member.EMAIL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide our work and drive our mission"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Award />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              title="Excellence"
              description="We strive for the highest standards in AI accuracy, UX, and medical reliability."
            />
            <FeatureCard
              icon={<Users />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
              title="Accessibility"
              description="We believe advanced healthcare technology should be accessible to all."
            />
            <FeatureCard
              icon={<BookOpen />}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
              title="Innovation"
              description="We continuously push the boundaries of what is possible in AI-powered healthcare."
            />
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Have feedback or ideas about our project? We’d love to hear from you!
          </p>
          <a
            href="mailto:CataractProject3@gmail.com"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <Mail className="mr-2 h-5 w-5" />
            {COMMONTEXT.EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;