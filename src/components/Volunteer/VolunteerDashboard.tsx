import React, { useState } from 'react';
import { Users, MessageCircle, Clock, TrendingUp, Star, Calendar, AlertCircle } from 'lucide-react';

const VolunteerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for volunteer dashboard
  const stats = {
    totalSessions: 45,
    activeChats: 3,
    completedSessions: 42,
    rating: 4.8
  };

  const activeChats = [
    {
      id: 1,
      studentName: 'Anonymous Student',
      lastMessage: 'I\'m feeling really overwhelmed with exams...',
      timestamp: '2 min ago',
      status: 'active'
    },
    {
      id: 2,
      studentName: 'Anonymous Student',
      lastMessage: 'Thank you for listening to me yesterday',
      timestamp: '1 hour ago',
      status: 'waiting'
    },
    {
      id: 3,
      studentName: 'Anonymous Student',
      lastMessage: 'Can we talk about stress management?',
      timestamp: '3 hours ago',
      status: 'active'
    }
  ];

  const chatRequests = [
    {
      id: 1,
      studentName: 'Anonymous Student',
      message: 'Hi, I need someone to talk to about academic pressure',
      timestamp: '5 min ago',
      priority: 'normal'
    },
    {
      id: 2,
      studentName: 'Anonymous Student',
      message: 'I\'m feeling lonely and isolated',
      timestamp: '15 min ago',
      priority: 'high'
    }
  ];

  const completedSessions = [
    {
      id: 1,
      studentName: 'Anonymous Student',
      date: '2024-12-14',
      duration: '45 min',
      feedback: 'Very helpful and understanding',
      rating: 5
    },
    {
      id: 2,
      studentName: 'Anonymous Student',
      date: '2024-12-13',
      duration: '30 min',
      feedback: 'Great listener, made me feel comfortable',
      rating: 5
    },
    {
      id: 3,
      studentName: 'Anonymous Student',
      date: '2024-12-12',
      duration: '60 min',
      feedback: 'Provided good emotional support',
      rating: 4
    }
  ];

  const handleAcceptRequest = (requestId: number) => {
    alert(`Chat request ${requestId} accepted! Starting conversation...`);
  };

  const handleStartChat = (chatId: number) => {
    alert(`Starting chat with student ${chatId}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Peer Volunteer Dashboard</h1>
            <p className="text-orange-100">
              Welcome back! Here's your volunteer activity overview
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.totalSessions}</div>
            <div className="text-orange-100">Total Sessions</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeChats}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'chats', label: 'Active Chats', icon: MessageCircle },
              { id: 'requests', label: 'New Requests', icon: AlertCircle },
              { id: 'history', label: 'Session History', icon: Clock }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New chat request from Anonymous Student</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Received 5-star rating for yesterday's session</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Completed session with Anonymous Student</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Conversations</h3>
              {activeChats.map((chat) => (
                <div key={chat.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{chat.studentName}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      chat.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {chat.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{chat.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    <button
                      onClick={() => handleStartChat(chat.id)}
                      className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                    >
                      Continue Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">New Chat Requests</h3>
              {chatRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{request.studentName}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{request.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{request.timestamp}</span>
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
                    >
                      Accept Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {completedSessions.map((session) => (
                      <tr key={session.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {session.studentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < session.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {session.feedback}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
