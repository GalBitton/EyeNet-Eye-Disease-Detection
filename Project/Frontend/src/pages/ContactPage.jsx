import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { COMMONTEXT } from '../constants/constants.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';

const ContactInfoItem = ({ icon, bgColor, title, children }) => (
  <div className="flex items-start space-x-4">
    <div className={`${bgColor} p-3 rounded-full`}>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

const Contact = () => {
  return (
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
                title="Contact Us"
                subtitle="Have questions about EyeNet? Need support or want to learn more? We're here to help and would love to hear from you."
                className="text-center"
            />
            <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mt-4"/>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-8">
                <ContactInfoItem
                    icon={<Mail className="h-6 w-6 text-blue-600"/>}
                    bgColor="bg-blue-100"
                    title="Email"
                >
                  {COMMONTEXT.EMAIL}<br/>{COMMONTEXT.SUPPORT_EMAIL}
                </ContactInfoItem>

                <ContactInfoItem
                    icon={<Phone className="h-6 w-6 text-green-600"/>}
                    bgColor="bg-green-100"
                    title="Phone"
                >
                  {COMMONTEXT.PHONE}<br/>{COMMONTEXT.SECOND_PHONE}
                </ContactInfoItem>

                <ContactInfoItem
                    icon={<MapPin className="h-6 w-6 text-purple-600"/>}
                    bgColor="bg-purple-100"
                    title="Address"
                >
                  {COMMONTEXT.ADDRESS}
                </ContactInfoItem>

                <ContactInfoItem
                    icon={<Clock className="h-6 w-6 text-yellow-600"/>}
                    bgColor="bg-yellow-100"
                    title="Support Hours"
                >
                  Sunday - Thursday: {COMMONTEXT.SUPPORT_HOURS.WEEK}<br/>
                  Friday: {COMMONTEXT.SUPPORT_HOURS.FRIDAY}<br/>
                  Saturday: {COMMONTEXT.SUPPORT_HOURS.SATURDAY}
                </ContactInfoItem>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                <form
                    action="https://formspree.io/f/meozeoyd"
                    method="POST"
                    className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <select
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject *</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="medical">Medical Questions</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>

                  <textarea
                      name="message"
                      rows="6"
                      required
                      placeholder="Your message *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Send className="mr-2 h-5 w-5"/> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Notice */}
        <section className="py-20 bg-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-yellow-900 mb-4">Medical Emergency Notice</h3>
              <p className="text-yellow-800 text-lg mb-4">
                <strong>If you are experiencing a medical emergency or urgent eye-related symptoms,
                  please contact your healthcare provider immediately or call emergency services.</strong>
              </p>
              <p className="text-yellow-700">
                EyeNet is designed for screening and informational purposes only. It does not replace
                professional medical diagnosis, treatment, or emergency care. For urgent medical concerns,
                always seek immediate professional medical attention.
              </p>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="py-12 bg-gray-50 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expected Response Time</h3>
            <p className="text-gray-600">
              We typically respond to inquiries within 24-48 hours during business days.
              For urgent technical issues, please call our support line.
            </p>
          </div>
        </section>
      </div>
  );
};

export default Contact;