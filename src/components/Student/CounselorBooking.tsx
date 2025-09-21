import React, { useState } from 'react';
import { Calendar, Clock, Star, MapPin, Languages, Award, Filter } from 'lucide-react';
import counselorsData from '../../data/counselors.json';

const CounselorBooking: React.FC = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filterSpecialization, setFilterSpecialization] = useState('all');

  const counselors = counselorsData.counselors;

  const specializations = ['all', 'Depression', 'Anxiety', 'Academic Stress', 'Relationship Issues', 'Career Counseling'];

  const filteredCounselors = filterSpecialization === 'all' 
    ? counselors 
    : counselors.filter(counselor => 
        counselor.specialization.includes(filterSpecialization)
      );

  const handleBookAppointment = (counselor: any) => {
    setSelectedCounselor(counselor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    alert(`Appointment booked with ${selectedCounselor.name} on ${selectedDate} at ${selectedTime}`);
    setShowBookingModal(false);
    setSelectedCounselor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const getAvailableSlots = (availability: any) => {
    const today = new Date();
    const slots = [];
    
    // Generate next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
      
      if (availability[dayName] && availability[dayName].start) {
        slots.push({
          date: date.toISOString().split('T')[0],
          day: dayName,
          displayDate: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          times: generateTimeSlots(availability[dayName].start, availability[dayName].end)
        });
      }
    }
    return slots;
  };

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    const startTime = new Date(`2024-01-01 ${start}`);
    const endTime = new Date(`2024-01-01 ${end}`);
    
    while (startTime < endTime) {
      slots.push(startTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
      startTime.setMinutes(startTime.getMinutes() + 60);
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Book Counselor Appointment</h1>
        <p className="text-blue-100">
          Connect with professional counselors for personalized mental health support
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">Filter by Specialization:</label>
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>
                {spec === 'all' ? 'All Specializations' : spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Counselors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounselors.map((counselor) => (
          <div key={counselor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {/* Counselor Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                <p className="text-sm text-gray-600">{counselor.qualification}</p>
                <p className="text-xs text-gray-500">{counselor.experience} years experience</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9 (127 reviews)</span>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Specializations:</h4>
              <div className="flex flex-wrap gap-1">
                {counselor.specialization.slice(0, 3).map((spec: string) => (
                  <span key={spec} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Languages className="w-3 h-3" />
                <span>{counselor.languages.join(', ')}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{counselor.institutionId ? 'On-Campus' : 'Online Only'}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{counselor.bio}</p>

            {/* Action Button */}
            <button
              onClick={() => handleBookAppointment(counselor)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCounselor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Book Appointment</h3>
                  <p className="text-blue-100">with {selectedCounselor.name}</p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-blue-100 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Counselor Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedCounselor.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedCounselor.qualification}</p>
                <p className="text-sm text-gray-600">{selectedCounselor.bio}</p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Select Date</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getAvailableSlots(selectedCounselor.availability).map((slot) => (
                    <button
                      key={slot.date}
                      onClick={() => setSelectedDate(slot.date)}
                      className={`p-3 border rounded-lg text-center ${
                        selectedDate === slot.date
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{slot.displayDate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Select Time</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {getAvailableSlots(selectedCounselor.availability)
                      .find(slot => slot.date === selectedDate)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 border rounded-lg text-center ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Session Type */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Session Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="sessionType" value="video" className="mr-2" defaultChecked />
                    <span>Video Call (Recommended)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="sessionType" value="phone" className="mr-2" />
                    <span>Phone Call</span>
                  </label>
                  {selectedCounselor.institutionId && (
                    <label className="flex items-center">
                      <input type="radio" name="sessionType" value="inPerson" className="mr-2" />
                      <span>In-Person (On Campus)</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Let the counselor know what you'd like to discuss..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorBooking;
