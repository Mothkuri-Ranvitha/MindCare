import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Star, 
  Clock, 
  Globe, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Phone,
  Calendar
} from 'lucide-react';
import volunteersData from '../../data/volunteers.json';

interface Volunteer {
  id: string;
  name: string;
  college: string;
  course: string;
  year: number;
  bio: string;
  languages: string[];
  availability: {
    [key: string]: { start: string; end: string };
  };
  rating: number;
  sessions: number;
  profileImage: string;
}

interface ChatRequest {
  id: string;
  volunteerId: string;
  volunteerName: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  requestedAt: string;
  message?: string;
}

const PeerVolunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteersData.volunteers);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatRequests, setChatRequests] = useState<ChatRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [showEscalationModal, setShowEscalationModal] = useState(false);

  // Get current time for availability check
  const getCurrentTime = () => {
    const now = new Date();
    // Get the current day as a lowercase string, e.g., 'monday'
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const time = now.toTimeString().slice(0, 5);
    return { day, time };
  };

  // Check if volunteer is currently available
  const isVolunteerAvailable = (volunteer: Volunteer) => {
    const { day, time } = getCurrentTime();
    const todayAvailability = volunteer.availability[day];
    
    if (!todayAvailability || !todayAvailability.start || !todayAvailability.end) {
      return false;
    }
    
    return time >= todayAvailability.start && time <= todayAvailability.end;
  };

  // Filter volunteers based on search and language
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = filterLanguage === 'all' || 
                           volunteer.languages.includes(filterLanguage);
    
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for filter
  const availableLanguages = Array.from(
    new Set(volunteers.flatMap(v => v.languages))
  );

  // Handle chat request
  const handleChatRequest = (volunteer: Volunteer) => {
    const newRequest: ChatRequest = {
      id: Date.now().toString(),
      volunteerId: volunteer.id,
      volunteerName: volunteer.name,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      message: `Hi ${volunteer.name}, I'd like to chat with you about some challenges I'm facing.`
    };
    
    setChatRequests(prev => [...prev, newRequest]);
    setShowChatModal(false);
    setSelectedVolunteer(null);
    
    // Simulate volunteer acceptance after 2 seconds
    setTimeout(() => {
      setChatRequests(prev => 
        prev.map(req => 
          req.id === newRequest.id 
            ? { ...req, status: 'accepted' as const }
            : req
        )
      );
    }, 2000);
  };

  // Handle escalation to counselor
  const handleEscalation = () => {
    setShowEscalationModal(true);
    // In real app, this would notify counselors and admin
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Peer Volunteers
            </h1>
            <p className="text-blue-100 mt-2">
              Connect with trained student volunteers for emotional support and companionship
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-sm">{volunteers.length} Active Volunteers</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">{chatRequests.filter(r => r.status === 'accepted').length} Active Chats</span>
              </div>
            </div>
          </div>
          <Shield className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Volunteers
            </label>
            <input
              type="text"
              placeholder="Search by name, college, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Language
            </label>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Languages</option>
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVolunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {volunteer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                  <p className="text-sm text-gray-600">{volunteer.college}</p>
                  <p className="text-xs text-gray-500">{volunteer.course} • Year {volunteer.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{volunteer.rating}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{volunteer.bio}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                <span>{volunteer.languages.join(', ')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>{volunteer.sessions} sessions completed</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span className={isVolunteerAvailable(volunteer) ? 'text-green-600' : 'text-gray-500'}>
                  {isVolunteerAvailable(volunteer) ? 'Available Now' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedVolunteer(volunteer);
                  setShowChatModal(true);
                }}
                disabled={!isVolunteerAvailable(volunteer)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  isVolunteerAvailable(volunteer)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="h-4 w-4 inline mr-2" />
                Start Chat
              </button>
              <button
                onClick={() => setSelectedVolunteer(volunteer)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Requests Status */}
      {chatRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
            Your Chat Requests
          </h2>
          <div className="space-y-3">
            {chatRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {request.volunteerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{request.volunteerName}</p>
                    <p className="text-sm text-gray-600">
                      Requested {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {request.status === 'pending' && (
                    <div className="flex items-center text-yellow-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Pending</span>
                    </div>
                  )}
                  {request.status === 'accepted' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Accepted</span>
                    </div>
                  )}
                  {request.status === 'accepted' && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Join Chat
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Start Chat with {selectedVolunteer.name}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This will send a chat request to {selectedVolunteer.name}. They'll be notified and can accept or decline your request.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleChatRequest(selectedVolunteer)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
              >
                Cancel
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
              If you're experiencing a mental health crisis or need professional help, we can connect you with a counselor immediately.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium">
                <Phone className="h-4 w-4 inline mr-2" />
                Call Emergency Helpline
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium">
                <Calendar className="h-4 w-4 inline mr-2" />
                Book Counselor Session
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

      {/* Safety Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Important Safety Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Peer volunteers provide emotional support and companionship, not professional counseling. 
              If you're experiencing a mental health crisis, please contact a professional counselor or emergency helpline immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerVolunteers;