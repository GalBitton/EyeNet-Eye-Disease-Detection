import React from 'react';
import { Mail } from 'lucide-react';

const TeamMemberCard = ({ image, name, role, expertise, bio, email }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <div className="aspect-square overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-blue-600 font-semibold mb-2">{role}</p>
      <p className="text-sm text-green-600 mb-4">{expertise}</p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-5">{bio}</p>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Mail className="h-4 w-4 mr-2" />
        Contact
      </a>
    </div>
  </div>
);

export default TeamMemberCard;