import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Heart,
  BarChart3,
  Calendar,
  Star,
  Phone,
  Shield,
  BookOpen,
  TrendingUp,
  UserPlus,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ChatRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentCollege: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  requestedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface VolunteerStats {
  totalRequests: number;
  activeChats: number;
  completedSessions: number;
  averageRating: number;
  totalHours: number;
  thisWeekRequests: number;
  escalationCount: number;
}

const VolunteerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([
    {
      id: '1',
      studentId: 's1',
      studentName: 'Priya Sharma',
      studentCollege: 'Delhi University',
      message: 'Hi, I\'m feeling overwhelmed with my studies and need someone to talk to.',
      status: 'pending',
      requestedAt: '2024-12-15T10:30:00Z',
      priority: 'medium',
      tags: ['academic stress', 'overwhelmed']
    },
    {
      id: '2',
      studentId: 's2',
      studentName: 'Rahul Kumar',
      studentCollege: 'Jammu University',
      message: 'I\'m having trouble sleeping and feeling anxious about exams.',
      status: 'accepted',
      requestedAt: '2024-12-15T09:15:00Z',
      acceptedAt: '2024-12-15T09:20:00Z',
      priority: 'high',
      tags: ['anxiety', 'sleep issues', 'exams']
    },
    {
      id: '3',
      studentId: 's3',
      studentName: 'Sneha Patel',
      studentCollege: 'Kashmir University',
      message: 'I feel lonely and isolated from my peers. Can we chat?',
      status: 'completed',
      requestedAt: '2024-12-14T16:45:00Z',
      acceptedAt: '2024-12-14T16:50:00Z',
      completedAt: '2024-12-14T17:30:00Z',
      priority: 'medium',
      tags: ['loneliness', 'isolation', 'peer support']
    }
  ]);

  const [stats, setStats] = useState<VolunteerStats>({
    totalRequests: 47,
    activeChats: 2,
    completedSessions: 45,
    averageRating: 4.8,
    totalHours: 89,
    thisWeekRequests: 8,
    escalationCount: 1
  });

  const [selectedRequest, setSelectedRequest] = useState<ChatRequest | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);

  // Handle accepting a chat request
  const handleAcceptRequest = (requestId: string) => {
    setChatRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' as const, acceptedAt: new Date().toISOString() }
          : req
      )
    );
  };

  // Handle rejecting a chat request
  const handleRejectRequest = (requestId: string) => {
    setChatRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
  };

  // Handle completing a chat session
  const handleCompleteSession = (requestId: string) => {
    setChatRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'completed' as const, completedAt: new Date().toISOString() }
          : req
      )
    );
    setStats(prev => ({
      ...prev,
      activeChats: prev.activeChats - 1,
      completedSessions: prev.completedSessions + 1
    }));
  };

  // Handle escalation to counselor
  const handleEscalation = (requestId: string) => {
    setStats(prev => ({
      ...prev,
      escalationCount: prev.escalationCount + 1
    }));
    setShowEscalationModal(true);
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', icon: Clock, bg: 'bg-yellow-50' };
      case 'accepted':
        return { color: 'text-blue-600', icon: MessageCircle, bg: 'bg-blue-50' };
      case 'completed':
        return { color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-50' };
      case 'rejected':
        return { color: 'text-red-600', icon: AlertTriangle, bg: 'bg-red-50' };
      default:
        return { color: 'text-gray-600', icon: Clock, bg: 'bg-gray-50' };
    }
  };

  const pendingRequests = chatRequests.filter(req => req.status === 'pending');
  const activeChats = chatRequests.filter(req => req.status === 'accepted');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
            <p className="text-green-100 mt-1">
              Thank you for volunteering your time to support fellow students
            </p>
            <p className="text-green-100 mt-2">
              Your empathy and support make a real difference in students' lives.
            </p>
          </div>
          <Heart className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeChats}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedSessions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 flex items-center">
                {stats.averageRating}
                <Star className="h-5 w-5 text-yellow-500 ml-1" />
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-600" />
              Pending Requests ({pendingRequests.length})
            </h2>
          </div>
          
          {pendingRequests.length > 0 ? (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.studentName}</h3>
                      <p className="text-sm text-gray-600">{request.studentCollege}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority} priority
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {request.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No pending requests</p>
            </div>
          )}
        </div>

        {/* Active Chats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
              Active Chats ({activeChats.length})
            </h2>
          </div>
          
          {activeChats.length > 0 ? (
            <div className="space-y-3">
              {activeChats.map((request) => (
                <div key={request.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.studentName}</h3>
                      <p className="text-sm text-gray-600">{request.studentCollege}</p>
                    </div>
                    <span className="text-xs text-blue-600">
                      Started {new Date(request.acceptedAt!).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {request.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowChatModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Continue Chat
                      </button>
                      <button
                        onClick={() => handleCompleteSession(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No active chats</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-600" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {chatRequests.slice(0, 5).map((request) => {
              const statusInfo = getStatusInfo(request.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={request.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {request.status === 'completed' ? 'Completed' : 
                       request.status === 'accepted' ? 'Accepted' : 
                       request.status === 'rejected' ? 'Rejected' : 'New request'} from {request.studentName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resources & Training */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
            Resources & Training
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Active Listening Techniques</h3>
              <p className="text-sm text-purple-700">Learn effective listening skills for peer support</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Crisis Intervention Guidelines</h3>
              <p className="text-sm text-blue-700">When and how to escalate to professional help</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Self-Care for Volunteers</h3>
              <p className="text-sm text-green-700">Maintaining your own mental health while helping others</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Escalation */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
          <h3 className="font-semibold text-red-800">Emergency Escalation</h3>
        </div>
        <p className="text-red-700 text-sm mb-4">
          If a student expresses thoughts of self-harm, suicide, or is in immediate danger, 
          escalate to professional counselors immediately.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowEscalationModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
          >
            <Phone className="h-4 w-4 inline mr-2" />
            Escalate to Counselor
          </button>
          <a
            href="tel:022-2754-6669"
            className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md font-medium"
          >
            <Phone className="h-4 w-4 inline mr-2" />
            Emergency Helpline
          </a>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Chat with {selectedRequest.studentName}
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedRequest.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Student • {new Date(selectedRequest.requestedAt).toLocaleTimeString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg ml-8">
                  <p className="text-sm text-gray-700">Hi {selectedRequest.studentName}, I'm here to listen and support you. How are you feeling today?</p>
                  <p className="text-xs text-gray-500 mt-1">You • Just now</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                Send
              </button>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => handleCompleteSession(selectedRequest.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Complete Session
              </button>
              <button
                onClick={() => handleEscalation(selectedRequest.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Escalate to Counselor
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showEscalationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Escalate to Counselor
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              This student will be immediately connected with a professional counselor. 
              The counselor will be notified of the escalation and can provide appropriate support.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium">
                <Phone className="h-4 w-4 inline mr-2" />
                Escalate Now
              </button>
              <button
                onClick={() => setShowEscalationModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;