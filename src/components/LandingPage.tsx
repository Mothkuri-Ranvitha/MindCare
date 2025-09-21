import React from 'react';
import { Heart, Users, GraduationCap, Building2, UserCheck, ArrowRight, Shield, Clock, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MindCare</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            <div className="flex space-x-4">
              <button onClick={() => window.location.href = '/login'} className="text-gray-600 hover:text-gray-900">Login</button>
              <button onClick={() => window.location.href = '/register'} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Digital Companion for Mental Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Confidential • Accessible • Stigma-Free Support for Higher Education Students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.href = '/register'} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a href="#features" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Mental Health Support</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides a complete ecosystem for mental health support in educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Guided Support</h3>
              <p className="text-gray-600">Interactive chatbot providing immediate coping strategies and professional referrals</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confidential Booking</h3>
              <p className="text-gray-600">Secure appointment system with on-campus counselors and mental health professionals</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resource Hub</h3>
              <p className="text-gray-600">Educational content, relaxation audio, and wellness guides in regional languages</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Peer Support</h3>
              <p className="text-gray-600">Moderated peer-to-peer support forum with trained student volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role and become part of our mental health support ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
              <p className="text-gray-600 mb-4">Access mental health support, assessments, and counseling services</p>
              <button onClick={() => window.location.href = '/register'} className="text-blue-600 hover:text-blue-800 font-medium">Register as Student →</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Counselors</h3>
              <p className="text-gray-600 mb-4">Provide professional mental health support to students</p>
              <button onClick={() => window.location.href = '/register'} className="text-green-600 hover:text-green-800 font-medium">Register as Counselor →</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Institutions</h3>
              <p className="text-gray-600 mb-4">Provide mental health services to your students</p>
              <button onClick={() => window.location.href = '/register'} className="text-purple-600 hover:text-purple-800 font-medium">Register Institution →</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Peer Volunteers</h3>
              <p className="text-gray-600 mb-4">Support fellow students through their mental health journey</p>
              <button onClick={() => window.location.href = '/register'} className="text-orange-600 hover:text-orange-800 font-medium">Register as Volunteer →</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Mental Health Matters</h2>
              <p className="text-lg text-gray-600 mb-6">
                Mental health issues among college students have significantly increased in recent years, 
                including anxiety, depression, burnout, sleep disorders, academic stress, and social isolation.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                However, there is a major gap in the availability, accessibility, and stigma-free delivery 
                of mental health support in most higher education institutions, especially in rural and semi-urban colleges.
              </p>
              <div className="flex items-center text-blue-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">24/7 Support Available</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  Provide structured, scalable, and stigma-free psychological intervention
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  Enable early detection and preventive mental health tools
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  Reduce under-utilization of college counseling centres
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  Establish centralized mental health monitoring and data-driven policy framework
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">MindCare</h3>
              </div>
              <p className="text-gray-400">
                Digital Mental Health and Psychological Support System for Students in Higher Education
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => window.location.href = '/login'} className="hover:text-white">Login</button></li>
                <li><button onClick={() => window.location.href = '/register'} className="hover:text-white">Register</button></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="text-gray-400 space-y-2">
                <p>Email: support@mindcare.com</p>
                <p>Phone: +91-9876543210</p>
                <p>Helpline: 24/7 Mental Health Support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MindCare. All rights reserved. Developed for SIH 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
