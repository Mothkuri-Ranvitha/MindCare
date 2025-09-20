import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ClipboardList,
  MessageCircle, 
  Calendar,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Heart,
  Users,
  Phone
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Take PHQ-9 Assessment',
      description: 'Quick depression screening',
      icon: ClipboardList,
      color: 'bg-blue-500',
      action: 'assessment'
    },
    {
      title: 'Chat with AI Support',
      description: '24/7 instant help',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: 'chat'
    },
    {
      title: 'Book Counseling',
      description: 'Schedule with counselor',
      icon: Calendar,
      color: 'bg-purple-500',
      action: 'appointments'
    },
    {
      title: 'Peer Support',
      description: 'Connect with peers',
      icon: Users,
      color: 'bg-orange-500',
      action: 'peer-chat'
    }
  ];

  const recentActivity = [
    { type: 'assessment', date: '2024-12-15', result: 'Mild Depression (Score: 7)' },
    { type: 'session', date: '2024-12-12', result: 'Counseling session completed' },
    { type: 'resource', date: '2024-12-10', result: 'Read: Managing Academic Stress' }
  ];

  const upcomingAppointments = [
    {
      date: '2024-12-20',
      time: '10:00 AM',
      counselor: 'Dr. Rajesh Kumar',
      type: 'Individual Session'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
            <p className="text-blue-100 mt-1">
              {user?.college} • {user?.course} • Year {user?.year}
            </p>
            <p className="text-blue-100 mt-2">
              Remember: Taking care of your mental health is a sign of strength, not weakness.
            </p>
          </div>
          <Heart className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-100"
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activity
            </h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'assessment' && <ClipboardList className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'session' && <MessageCircle className="h-5 w-5 text-green-600" />}
                  {activity.type === 'resource' && <BookOpen className="h-5 w-5 text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.result}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Upcoming Appointments
            </h2>
          </div>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-green-800">{appointment.type}</p>
                      <p className="text-green-700">with {appointment.counselor}</p>
                      <p className="text-green-600 text-sm mt-1">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Join Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No upcoming appointments</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Schedule a session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mental Health Tips & Emergency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Tip */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-md p-6 text-white">
          <h3 className="font-semibold mb-3 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Daily Mental Health Tip
          </h3>
          <p className="text-green-100">
            "Practice the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 
            3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps reduce anxiety."
          </p>
        </div>

        {/* Crisis Support */}
        <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-800">Crisis Support Available 24/7</h3>
          </div>
          <p className="text-red-700 text-sm mb-4">
            If you're having thoughts of self-harm or suicide, please reach out immediately.
          </p>
          <div className="space-y-2">
            <a 
              href="tel:022-2754-6669" 
              className="flex items-center text-red-800 hover:text-red-900 font-semibold"
            >
              <Phone className="h-4 w-4 mr-2" />
              National Helpline: 022-2754-6669
            </a>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
              Get Immediate Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;