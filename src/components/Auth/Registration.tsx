import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Heart, Users, GraduationCap, Building2, UserCheck, ArrowLeft } from 'lucide-react';
import StudentRegistration from './StudentRegistration';
import CounselorRegistration from './CounselorRegistration';
import CollegeRegistration from './CollegeRegistration';
import PeerVolunteerRegistration from './PeerVolunteerRegistration';

const Registration: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // const { t } = useLanguage();

  const registrationTypes = [
    {
      id: 'student',
      title: 'Student Registration',
      description: 'Register as a student to access mental health support, assessments, and counseling services',
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      component: StudentRegistration
    },
    {
      id: 'counselor',
      title: 'Counselor Registration',
      description: 'Register as a professional counselor to provide mental health support to students',
      icon: <UserCheck className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      component: CounselorRegistration
    },
    {
      id: 'college',
      title: 'College Registration',
      description: 'Register your educational institution to provide mental health services to your students',
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      component: CollegeRegistration
    },
    {
      id: 'peer_volunteer',
      title: 'Peer Volunteer Registration',
      description: 'Register as a peer volunteer to support fellow students through their mental health journey',
      icon: <Users className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      component: PeerVolunteerRegistration
    }
  ];

  if (selectedRole) {
    const selectedType = registrationTypes.find(type => type.id === selectedRole);
    if (selectedType) {
      const RegistrationComponent = selectedType.component;
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-md">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Registration Options
            </button>
            <RegistrationComponent onBack={() => setSelectedRole(null)} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">MindCare</h1>
        </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Digital Mental Health Support Platform
          </h2>
          <p className="text-gray-600">
            Choose your registration type to get started
          </p>
        </div>

        {/* Registration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrationTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedRole(type.id)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${type.color}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
