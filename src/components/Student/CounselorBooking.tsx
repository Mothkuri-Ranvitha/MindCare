import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Phone, 
  MapPin,
  GraduationCap,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  MessageCircle,
  Search
} from 'lucide-react';
import counselorsData from '../../data/counselors.json';

interface Counselor {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  specialization: string[];
  languages: string[];
  institutionId: string | null;
  status: string;
  licenseNumber: string;
  availability: {
    [key: string]: { start: string; end: string };
  };
  bio: string;
  createdAt: string;
  approvedAt?: string;
}

interface Appointment {
  id: string;
  counselorId: string;
  counselorName: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

const CounselorBooking: React.FC = () => {
  const [counselors] = useState<Counselor[]>(counselorsData.counselors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'video' | 'in-person' | 'phone'>('video');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [filterInstitution, setFilterInstitution] = useState('all');

  // Get available time slots for selected counselor and date
  const getAvailableTimeSlots = (counselor: Counselor, date: string) => {
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availability = counselor.availability[dayOfWeek];
    
    if (!availability || !availability.start || !availability.end) {
      return [];
    }

    const slots = [];
    const start = parseInt(availability.start.split(':')[0]);
    const end = parseInt(availability.end.split(':')[0]);
    
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  // Filter counselors based on search and filters
  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counselor.specialization.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesSpecialization = filterSpecialization === 'all' || 
                                 counselor.specialization.includes(filterSpecialization);
    
    const matchesInstitution = filterInstitution === 'all' || 
                              (filterInstitution === 'institution' && counselor.institutionId) ||
                              (filterInstitution === 'independent' && !counselor.institutionId);
    
    return matchesSearch && matchesSpecialization && matchesInstitution && counselor.status === 'approved';
  });

  // Get unique specializations for filter
  const availableSpecializations = Array.from(
    new Set(counselors.flatMap(c => c.specialization))
  );

  // Handle appointment booking
  const handleBooking = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowBookingModal(false);
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');

    // Simulate counselor confirmation after 1 second
    setTimeout(() => {
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === newAppointment.id 
            ? { ...apt, status: 'confirmed' as const }
            : apt
        )
      );
    }, 1000);
  };

  // Cancel appointment
  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', icon: Clock, bg: 'bg-yellow-50' };
      case 'confirmed':
        return { color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-50' };
      case 'completed':
        return { color: 'text-blue-600', icon: CheckCircle, bg: 'bg-blue-50' };
      case 'cancelled':
        return { color: 'text-red-600', icon: XCircle, bg: 'bg-red-50' };
      default:
        return { color: 'text-gray-600', icon: AlertCircle, bg: 'bg-gray-50' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Calendar className="h-8 w-8 mr-3" />
              Book Counselor Session
            </h1>
            <p className="text-purple-100 mt-2">
              Schedule professional counseling sessions with qualified mental health professionals
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span className="text-sm">{counselors.filter(c => c.status === 'approved').length} Available Counselors</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-sm">{appointments.length} Your Appointments</span>
              </div>
            </div>
          </div>
          <GraduationCap className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Counselors
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Specializations</option>
              {availableSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Counselor Type
            </label>
            <select
              value={filterInstitution}
              onChange={(e) => setFilterInstitution(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Counselors</option>
              <option value="institution">Institution Counselors</option>
              <option value="independent">Independent Counselors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounselors.map((counselor) => (
          <div
            key={counselor.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {counselor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
                  <p className="text-sm text-gray-600">{counselor.qualification}</p>
                  <p className="text-xs text-gray-500">{counselor.experience} years experience</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-2" />
                <span>{counselor.specialization.join(', ')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{counselor.institutionId ? 'Institution Counselor' : 'Independent Counselor'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>{counselor.languages.join(', ')}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{counselor.bio}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedCounselor(counselor);
                  setShowBookingModal(true);
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
              >
                <Calendar className="h-4 w-4 inline mr-2" />
                Book Session
              </button>
              <button
                onClick={() => setSelectedCounselor(counselor)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Your Appointments */}
      {appointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Your Appointments
          </h2>
          <div className="space-y-3">
            {appointments.map((appointment) => {
              const statusInfo = getStatusInfo(appointment.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={appointment.id} className={`p-4 rounded-lg ${statusInfo.bg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {appointment.counselorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.counselorName}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {appointment.type === 'video' && <Video className="h-4 w-4 text-blue-600" />}
                          {appointment.type === 'phone' && <Phone className="h-4 w-4 text-green-600" />}
                          {appointment.type === 'in-person' && <MapPin className="h-4 w-4 text-purple-600" />}
                          <span className="text-xs text-gray-500 capitalize">{appointment.type} session</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center ${statusInfo.color}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm capitalize">{appointment.status}</span>
                      </div>
                      {appointment.status === 'pending' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Join Session
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedCounselor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book Session with {selectedCounselor.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a time slot</option>
                    {getAvailableTimeSlots(selectedCounselor, selectedDate).map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sessionType"
                      value="video"
                      checked={selectedType === 'video'}
                      onChange={(e) => setSelectedType(e.target.value as 'video')}
                      className="mr-2"
                    />
                    <Video className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">Video Call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sessionType"
                      value="phone"
                      checked={selectedType === 'phone'}
                      onChange={(e) => setSelectedType(e.target.value as 'phone')}
                      className="mr-2"
                    />
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Phone Call</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sessionType"
                      value="in-person"
                      checked={selectedType === 'in-person'}
                      onChange={(e) => setSelectedType(e.target.value as 'in-person')}
                      className="mr-2"
                    />
                    <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="text-sm">In-Person</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  selectedDate && selectedTime
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Session
              </button>
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          AI-Powered Counselor Matching
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Based on your recent assessments and preferences, we recommend counselors who specialize in areas that match your needs.
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-blue-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Depression & Anxiety Specialists</span>
          </div>
          <div className="flex items-center text-sm text-blue-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Academic Stress Experts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorBooking;