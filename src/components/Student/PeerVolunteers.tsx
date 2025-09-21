import React, { useState } from 'react';
import { Users, MessageCircle, Star, Clock, MapPin, Languages, Send } from 'lucide-react';
import volunteersData from '../../data/volunteers.json';

const PeerVolunteers: React.FC = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'volunteer', timestamp: string}>>([]);

  const volunteers = volunteersData.volunteers;

  const handleStartChat = (volunteer: any) => {
    setSelectedVolunteer(volunteer);
    setShowChat(true);
    setChatMessages([
      {
        id: 1,
        text: `Hi! I'm ${volunteer.name}. I'm here to listen and support you. How are you feeling today?`,
        sender: 'volunteer',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: message,
        sender: 'user' as const,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate volunteer response
      setTimeout(() => {
        const responses = [
          "I understand how you're feeling. Can you tell me more about what's on your mind?",
          "That sounds really challenging. You're not alone in this.",
          "Thank you for sharing that with me. How can I best support you right now?",
          "I'm here to listen. Take your time to express what you're going through.",
          "It's okay to feel this way. What would help you feel a bit better?"
        ];
        const volunteerResponse = {
          id: chatMessages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'volunteer' as const,
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, volunteerResponse]);
      }, 1000);
    }
  };

  const getAvailabilityStatus = (volunteer: any) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const todayAvailability = volunteer.availability[currentDay];
    if (todayAvailability && todayAvailability.start && todayAvailability.end) {
      if (currentTime >= todayAvailability.start && currentTime <= todayAvailability.end) {
        return { status: 'online', color: 'text-green-600' };
      }
    }
    return { status: 'offline', color: 'text-gray-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Peer Support Volunteers</h1>
            <p className="text-blue-100">
              Connect with trained student volunteers for emotional support and companionship
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{volunteers.length}</div>
            <div className="text-blue-100">Active Volunteers</div>
          </div>
        </div>
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer) => {
          const availability = getAvailabilityStatus(volunteer);
          return (
            <div key={volunteer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {/* Volunteer Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{volunteer.name}</h3>
                  <p className="text-sm text-gray-600">{volunteer.college}</p>
                  <p className="text-xs text-gray-500">{volunteer.course} - Year {volunteer.year}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{volunteer.rating} ({volunteer.sessions} sessions)</span>
              </div>

              {/* Availability Status */}
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${availability.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className={`text-sm font-medium ${availability.color}`}>
                  {availability.status === 'online' ? 'Available Now' : 'Offline'}
                </span>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <Languages className="w-3 h-3" />
                  <span>{volunteer.languages.join(', ')}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{volunteer.bio}</p>

              {/* Action Button */}
              <button
                onClick={() => handleStartChat(volunteer)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start Chat</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Chat Modal */}
      {showChat && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedVolunteer.name}</h3>
                    <p className="text-blue-100 text-sm">Peer Volunteer</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-blue-100 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Remember: Peer volunteers provide emotional support, not professional counseling. 
                For serious concerns, please contact a professional counselor.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerVolunteers;
