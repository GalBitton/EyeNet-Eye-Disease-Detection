import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';
import {HOMECONTENT} from "../../constants/constants.jsx";

const FeaturesSection = ()=> {
  return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {HOMECONTENT.FEATURES_HEADER}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {HOMECONTENT.FEATURES_DESC}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{HOMECONTENT.FEATURES.INSTANT_RESULTS.TITLE}</h3>
              <p className="text-gray-600">
                {HOMECONTENT.FEATURES.INSTANT_RESULTS.DESCRIPTION}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-green-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{HOMECONTENT.FEATURES.HIGH_ACCURACY.TITLE}</h3>
              <p className="text-gray-600">
                {HOMECONTENT.FEATURES.HIGH_ACCURACY.DESCRIPTION}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{HOMECONTENT.FEATURES.USER_FRIENDLY.TITLE}</h3>
              <p className="text-gray-600">
                {HOMECONTENT.FEATURES.USER_FRIENDLY.DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection;