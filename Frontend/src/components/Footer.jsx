import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold mb-4">EyeNet</h1>
          <p className="text-sm mb-6">
            Revolutionizing eye health with advanced AI-powered solutions. 
            Analyze your eye health, detect conditions, and take proactive steps.
          </p>
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <p>Global - Available Anywhere</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <p>+1 (800) EYE-CARE</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <p className="text-sm mb-6">
            Stay connected with us on social media for the latest updates.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-2xl hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-primary">
              <FaLinkedin />
            </a>
            <a href="#" className="text-2xl hover:text-primary">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} EyeNet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
