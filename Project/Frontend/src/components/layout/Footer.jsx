import React from 'react';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import {COMMONTEXT} from "../../constants/constants.jsx";

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">EyeNet</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Advanced AI-powered eye condition detection using cutting-edge deep learning technology.
                Helping people detect eye conditions early and accurately.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/scan" className="text-gray-300 hover:text-white transition-colors">Eye Scan</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/technology" className="text-gray-300 hover:text-white transition-colors">Technology</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{COMMONTEXT.EMAIL}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{COMMONTEXT.PHONE}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{COMMONTEXT.ADDRESS}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 EyeNet. All rights reserved. This application is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;