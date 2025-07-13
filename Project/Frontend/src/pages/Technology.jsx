import React from 'react';
import { Brain, Database, Zap, Shield, Code, Server } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FeatureListItem from '../components/ui/FeatureListItem';
import TechStackCard from '../components/ui/TechStackCard';
import SecurityFeatureItem from '../components/ui/SecurityFeatureItem';
import { TECHNOLOGY } from "../constants/constants.jsx";

const Technology = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Brain className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Technology Behind EyeNet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge AI and deep learning technologies powering accurate eye condition detection
          </p>
        </div>
      </section>

      {/* AI Model */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader title="Advanced Deep Learning Architecture" />
              <p className="text-lg text-gray-600 mb-6">
                EyeNet leverages state-of-the-art Convolutional Neural Networks (CNNs) with DenseNet121 as the foundation.
              </p>

              <div className="space-y-4">
                <FeatureListItem
                  icon={<Brain />}
                  bgColor="bg-purple-100"
                  iconColor="text-purple-600"
                  title="DenseNet121 Base Model"
                  description={TECHNOLOGY.ARCHITECTURE.DENSENET}
                />
                <FeatureListItem
                  icon={<Zap />}
                  bgColor="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Attention Mechanisms"
                  description={TECHNOLOGY.ARCHITECTURE.ATTENTION}
                />
                <FeatureListItem
                  icon={<Database />}
                  bgColor="bg-green-100"
                  iconColor="text-green-600"
                  title="Data Augmentation"
                  description={TECHNOLOGY.ARCHITECTURE.AUGMENTATION}
                />
              </div>
            </div>

            {/* Model Performance */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Model Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Overall Accuracy</span>
                  <span className="font-bold text-purple-600">98%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Complete Technology Stack"
            subtitle="A robust, scalable architecture designed for reliability and performance"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechStackCard
              icon={<Code />}
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
              title="Frontend"
              items={TECHNOLOGY.TECH_STACK.FRONTEND}
            />
            <TechStackCard
              icon={<Server />}
              bgColor="bg-green-100"
              iconColor="text-green-600"
              title="Backend"
              items={TECHNOLOGY.TECH_STACK.BACKEND}
            />
            <TechStackCard
              icon={<Brain />}
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
              title="AI/ML"
              items={TECHNOLOGY.TECH_STACK.AIML}
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Security & Privacy"
            subtitle="Your privacy and data security are our top priorities"
            color="text-white"
            subColor="text-gray-300"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SecurityFeatureItem
              icon={<Shield />}
              bgColor="bg-blue-900"
              iconColor="text-blue-400"
              title="End-to-End Encryption"
              description="All data transmission is encrypted using industry-standard protocols"
            />
            <SecurityFeatureItem
              icon={<Database />}
              bgColor="bg-green-900"
              iconColor="text-green-400"
              title="No Data Storage"
              description="Images are processed in real-time and not stored on our servers"
            />
            <SecurityFeatureItem
              icon={<Code />}
              bgColor="bg-purple-900"
              iconColor="text-purple-400"
              title="HIPAA Compliant"
              description="Built following healthcare data protection standards"
            />
            <SecurityFeatureItem
              icon={<Zap />}
              bgColor="bg-yellow-900"
              iconColor="text-yellow-400"
              title="Edge Processing"
              description="Local processing capabilities for enhanced privacy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;