import React, { useState, useEffect } from 'react';
import {
  Heart, Users, GraduationCap, Building2,
  UserCheck, ArrowRight, Shield, Clock,
  Globe, CheckCircle, Menu, X
} from 'lucide-react';

// Map color names to Tailwind classes
const colorClasses: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", hover: "hover:text-blue-800" },
  green: { bg: "bg-green-50", text: "text-green-600", hover: "hover:text-green-800" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", hover: "hover:text-purple-800" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", hover: "hover:text-orange-800" },
};

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: UserCheck,
      title: 'AI-Guided Support',
      description: 'Intelligent chatbot providing immediate coping strategies and professional referrals'
    },
    {
      icon: Shield,
      title: 'Confidential Booking',
      description: 'Secure appointment system with verified mental health professionals'
    },
    {
      icon: Globe,
      title: 'Resource Hub',
      description: 'Educational content and wellness guides in multiple regional languages'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Moderated peer-to-peer support forum with trained volunteers'
    }
  ];

  const registrationTypes = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Access mental health support, assessments, and counseling services',
      color: 'blue'
    },
    {
      icon: UserCheck,
      title: 'Counselors',
      description: 'Provide professional mental health support to students',
      color: 'green'
    },
    {
      icon: Building2,
      title: 'Institutions',
      description: 'Provide mental health services to your students',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Peer Volunteers',
      description: 'Support fellow students through their mental health journey',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-white/80 shadow-md py-2" : "bg-white/95 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button
                aria-label="MindCare home"
                onClick={() => (window.location.href = "/")}
                className="flex items-center gap-3 focus:outline-none"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-md ring-1 ring-white/30">
                  <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect width="36" height="36" rx="7" fill="url(#g2)" />
                    <path d="M10 22V14c0-2.6 2.2-3.6 4-3.6s4 1 4 3.6v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26 22v-6c0-2.6-2.2-3.6-4-3.6s-4 1-4 3.6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                    <defs>
                      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2563EB" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>

                <div className="leading-tight text-left hidden md:block">
                  <div className="text-lg font-semibold text-gray-900">MindCare</div>
                  <div className="text-xs text-gray-500 -mt-0.5">Mental wellness for students</div>
                </div>
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4 bg-white/0 px-3 py-2 rounded-full">
              <a href="#features" className="group relative px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-all font-medium">
                <span>Features</span>
                <span className="absolute left-1/2 -bottom-2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2 transition-all group-hover:w-10"></span>
              </a>
              <a href="#about" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition font-medium">About</a>
              <a href="#contact" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition font-medium">Contact</a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => (window.location.href = "/login")}
                className="text-gray-700 hover:text-blue-600 font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => (window.location.href = "/register")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
            <div className="fixed right-0 top-0 w-72 h-full bg-white z-50 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">MindCare</div>
                    <div className="text-xs text-gray-500">Mental wellness for students</div>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-1">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                <a onClick={() => setMobileOpen(false)} href="#features" className="text-gray-700 font-medium">Features</a>
                <a onClick={() => setMobileOpen(false)} href="#about" className="text-gray-700 font-medium">About</a>
                <a onClick={() => setMobileOpen(false)} href="#contact" className="text-gray-700 font-medium">Contact</a>
              </nav>

              <div className="mt-6 border-t pt-6">
                <button onClick={() => { setMobileOpen(false); window.location.href = '/login'; }} className="w-full text-left text-gray-700 py-2">Login</button>
                <button onClick={() => { setMobileOpen(false); window.location.href = '/register'; }} className="w-full mt-3 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Professional Mental Health Support for <span className="text-blue-600">Students</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Confidential, accessible, and stigma-free mental wellness platform designed specifically 
                for higher education students and institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center justify-center"
                >
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Schedule Demo
                </button>
              </div>
              <div className="flex items-center mt-8 space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Setup in 5 minutes
                </div>
              </div>
            </div>

            {/* Hero Right */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900">50,000+</h3>
                  <p className="text-sm text-gray-600">Students Helped</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900">24/7</h3>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <Clock className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900">95%</h3>
                  <p className="text-sm text-gray-600">Satisfaction Rate</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold text-gray-900">300+</h3>
                  <p className="text-sm text-gray-600">Campuses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Mental Health Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides a complete ecosystem designed to support students' mental wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="bg-white p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Professional Network</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role and become part of India's leading mental health support platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {registrationTypes.map((type, index) => {
              const colors = colorClasses[type.color];
              return (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`${colors.bg} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                    <type.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <button
                    onClick={() => (window.location.href = "/register")}
                    className={`${colors.text} ${colors.hover} font-medium text-sm inline-flex items-center`}
                  >
                    Register <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section + Footer remain unchanged (your original code is fine) */}
    </div>
  );
};

export default LandingPage;
