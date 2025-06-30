import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';

const FeaturesSection = ()=> {
  return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EyeNet?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology makes eye health screening accessible, accurate, and convenient for
              everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600">
                Get accurate eye condition detection results in seconds using our advanced DenseNet121 model
                with
                attention mechanisms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-green-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">91% Accuracy</h3>
              <p className="text-gray-600">
                Trained on over 13,000 images per condition, our AI model delivers reliable detection for
                cataracts,
                conjunctivitis, and styes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-purple-600"/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Designed for all ages from 10 to 85+. Simple interface that works perfectly on both desktop and
                mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection;