import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar,
  Clock,
  Users,
  MessageCircle,
  Video,
  Phone,
  FileText,
  BarChart3,
  Bell,
  Settings,
  User,
  Award,
  BookOpen,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Star,
  Download,
  Upload,
  Send,
  Eye,
  EyeOff,
  Filter,
  Search,
  MoreVertical,
  CalendarDays,
  UserCheck,
  UserX,
  Activity,
  Heart,
  Brain,
  Target
} from 'lucide-react';

interface Appointment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCollege: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  sessionNotes?: string;
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  studentConcerns: string[];
  priority: 'low' | 'medium' | 'high';
}

interface Student {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  year: number;
  lastSession?: string;
  totalSessions: number;
  primaryConcerns: string[];
  riskLevel: 'low' | 'medium' | 'high';
  nextAppointment?: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'exercise' | 'journal';
  description: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  studentAssignments: string[];
}

interface Analytics {
  totalAppointments: number;
  completedSessions: number;
  noShows: number;
  averageRating: number;
  thisWeekAppointments: number;
  thisMonthAppointments: number;
  commonIssues: { issue: string; count: number; percentage: number }[];
  studentSatisfaction: number;
  crisisInterventions: number;
}

const CounselorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalAppointments: 0,
    completedSessions: 0,
    noShows: 0,
    averageRating: 0,
    thisWeekAppointments: 0,
    thisMonthAppointments: 0,
    commonIssues: [],
    studentSatisfaction: 0,
    crisisInterventions: 0
  });
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showSessionNotesModal, setShowSessionNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00', enabled: true },
    tuesday: { start: '09:00', end: '17:00', enabled: true },
    wednesday: { start: '09:00', end: '17:00', enabled: true },
    thursday: { start: '09:00', end: '17:00', enabled: true },
    friday: { start: '09:00', end: '17:00', enabled: true },
    saturday: { start: '', end: '', enabled: false },
    sunday: { start: '', end: '', enabled: false }
  });

  // Mock data initialization
  useEffect(() => {
    // Initialize with sample data
    setAppointments([
      {
        id: '1',
        studentId: 's1',
        studentName: 'Priya Sharma',
        studentEmail: 'priya@college.edu',
        studentCollege: 'Delhi University',
        date: '2024-12-20',
        time: '10:00',
        type: 'video',
        status: 'confirmed',
        studentConcerns: ['Anxiety', 'Academic Stress'],
        priority: 'high',
        createdAt: '2024-12-15T09:30:00Z',
        confirmedAt: '2024-12-15T09:35:00Z'
      },
      {
        id: '2',
        studentId: 's2',
        studentName: 'Rahul Kumar',
        studentEmail: 'rahul@college.edu',
        studentCollege: 'Jammu University',
        date: '2024-12-18',
        time: '14:00',
        type: 'in-person',
        status: 'pending',
        studentConcerns: ['Depression', 'Sleep Issues'],
        priority: 'medium',
        createdAt: '2024-12-15T11:20:00Z'
      },
      {
        id: '3',
        studentId: 's3',
        studentName: 'Sneha Patel',
        studentEmail: 'sneha@college.edu',
        studentCollege: 'Kashmir University',
        date: '2024-12-16',
        time: '16:00',
        type: 'phone',
        status: 'completed',
        studentConcerns: ['Relationship Issues', 'Career Guidance'],
        priority: 'low',
        createdAt: '2024-12-10T14:15:00Z',
        confirmedAt: '2024-12-10T14:20:00Z',
        completedAt: '2024-12-16T17:00:00Z',
        sessionNotes: 'Student showed good progress in managing relationship stress. Recommended continued mindfulness practice.'
      }
    ]);

    setStudents([
      {
        id: 's1',
        name: 'Priya Sharma',
        email: 'priya@college.edu',
        college: 'Delhi University',
        course: 'B.Tech Computer Science',
        year: 2,
        lastSession: '2024-12-10',
        totalSessions: 5,
        primaryConcerns: ['Anxiety', 'Academic Stress'],
        riskLevel: 'high',
        nextAppointment: '2024-12-20'
      },
      {
        id: 's2',
        name: 'Rahul Kumar',
        email: 'rahul@college.edu',
        college: 'Jammu University',
        course: 'M.A. Psychology',
        year: 1,
        lastSession: '2024-12-05',
        totalSessions: 3,
        primaryConcerns: ['Depression', 'Sleep Issues'],
        riskLevel: 'medium',
        nextAppointment: '2024-12-18'
      }
    ]);

    setResources([
      {
        id: 'r1',
        title: 'Mindfulness Breathing Exercise',
        type: 'exercise',
        description: 'A 5-minute guided breathing exercise for anxiety relief',
        content: 'Step-by-step breathing technique...',
        tags: ['anxiety', 'breathing', 'mindfulness'],
        isPublic: true,
        createdAt: '2024-12-01T10:00:00Z',
        studentAssignments: ['s1', 's2']
      },
      {
        id: 'r2',
        title: 'Understanding Academic Stress',
        type: 'article',
        description: 'Comprehensive guide to managing academic pressure',
        content: 'Academic stress is a common issue...',
        tags: ['academic', 'stress', 'education'],
        isPublic: true,
        createdAt: '2024-12-05T14:30:00Z',
        studentAssignments: ['s1']
      }
    ]);

    setAnalytics({
      totalAppointments: 47,
      completedSessions: 42,
      noShows: 3,
      averageRating: 4.8,
      thisWeekAppointments: 8,
      thisMonthAppointments: 23,
      commonIssues: [
        { issue: 'Anxiety', count: 18, percentage: 42.9 },
        { issue: 'Academic Stress', count: 15, percentage: 35.7 },
        { issue: 'Depression', count: 9, percentage: 21.4 }
      ],
      studentSatisfaction: 92,
      crisisInterventions: 2
    });
  }, []);

  // Handle appointment actions
  const handleAppointmentAction = (appointmentId: string, action: 'accept' | 'reject' | 'complete' | 'cancel') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { 
              ...apt, 
              status: action === 'accept' ? 'confirmed' as const :
                      action === 'reject' ? 'cancelled' as const :
                      action === 'complete' ? 'completed' as const :
                      action === 'cancel' ? 'cancelled' as const : apt.status,
              confirmedAt: action === 'accept' ? new Date().toISOString() : apt.confirmedAt,
              completedAt: action === 'complete' ? new Date().toISOString() : apt.completedAt
            }
          : apt
      )
    );
  };

  // Handle session notes
  const handleSessionNotes = (appointmentId: string, notes: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, sessionNotes: notes }
          : apt
      )
    );
    setShowSessionNotesModal(false);
    setSelectedAppointment(null);
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', icon: Clock, bg: 'bg-yellow-50' };
      case 'confirmed':
        return { color: 'text-blue-600', icon: CheckCircle, bg: 'bg-blue-50' };
      case 'completed':
        return { color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-50' };
      case 'cancelled':
        return { color: 'text-red-600', icon: XCircle, bg: 'bg-red-50' };
      case 'no-show':
        return { color: 'text-orange-600', icon: UserX, bg: 'bg-orange-50' };
      default:
        return { color: 'text-gray-600', icon: Clock, bg: 'bg-gray-50' };
    }
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
            <p className="text-purple-100 mt-1">
              {user?.qualification} • {user?.experience} years experience
            </p>
            <p className="text-purple-100 mt-2">
              Specializing in: {user?.specialization?.join(', ')}
            </p>
          </div>
          <Heart className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 flex items-center">
                {analytics.averageRating}
                <Star className="h-5 w-5 text-yellow-500 ml-1" />
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Recent Appointments
          </h2>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-purple-600 hover:text-purple-800 font-medium text-sm"
          >
            View All →
          </button>
        </div>
        
        <div className="space-y-3">
          {appointments.slice(0, 3).map((appointment) => {
            const statusInfo = getStatusInfo(appointment.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={appointment.id} className={`p-4 rounded-lg ${statusInfo.bg}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {appointment.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.studentName}</p>
                      <p className="text-sm text-gray-600">{appointment.studentCollege}</p>
                      <p className="text-xs text-gray-500">
                        {appointment.date} at {appointment.time} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority} priority
                    </span>
                    <div className={`flex items-center ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm capitalize">{appointment.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Appointment Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAvailabilityModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Set Availability
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Appointment List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Appointments</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-gray-600">
                  {appointments.filter(apt => apt.status === 'pending').length} Pending
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  {appointments.filter(apt => apt.status === 'confirmed').length} Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => {
            const statusInfo = getStatusInfo(appointment.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {appointment.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.studentName}</h4>
                      <p className="text-sm text-gray-600">{appointment.studentEmail}</p>
                      <p className="text-sm text-gray-500">{appointment.studentCollege}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {appointment.type} session
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm capitalize">{appointment.status}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                            <Video className="h-3 w-3 inline mr-1" />
                            Start Session
                          </button>
                          <button
                            onClick={() => handleAppointmentAction(appointment.id, 'complete')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                          >
                            Complete
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowSessionNotesModal(true);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          <FileText className="h-3 w-3 inline mr-1" />
                          Add Notes
                        </button>
                      )}
                      
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Student Concerns */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {appointment.studentConcerns.map((concern, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Student Management</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.college}</p>
                <p className="text-xs text-gray-500">{student.course} • Year {student.year}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Sessions:</span>
                <span className="font-medium">{student.totalSessions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Session:</span>
                <span className="font-medium">{student.lastSession || 'Never'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Risk Level:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {student.riskLevel}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Primary Concerns:</p>
              <div className="flex flex-wrap gap-1">
                {student.primaryConcerns.map((concern, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {concern}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium">
                <MessageCircle className="h-4 w-4 inline mr-1" />
                Message
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Resource Management</h2>
        <button
          onClick={() => setShowResourceModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'video' ? 'bg-red-100 text-red-800' :
                    resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'exercise' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {resource.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    resource.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {resource.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-1">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Assigned to {resource.studentAssignments.length} students</span>
              <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium">
                <Edit className="h-4 w-4 inline mr-1" />
                Edit
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Analytics & Performance</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAppointments}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completedSessions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">No Shows</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.noShows}</p>
            </div>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Student Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.studentSatisfaction}%</p>
            </div>
            <Heart className="h-8 w-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Common Issues Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Issues</h3>
        <div className="space-y-3">
          {analytics.commonIssues.map((issue, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{issue.issue}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${issue.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{issue.percentage}%</span>
                <span className="text-sm text-gray-500 w-8 text-right">({issue.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{analytics.thisWeekAppointments}</p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{analytics.thisMonthAppointments}</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{analytics.crisisInterventions}</p>
            <p className="text-sm text-gray-600">Crisis Interventions</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'resources', label: 'Resources', icon: BookOpen },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'students' && renderStudents()}
      {activeTab === 'resources' && renderResources()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Modals */}
      {showSessionNotesModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Session Notes - {selectedAppointment.studentName}
            </h3>
            <textarea
              placeholder="Enter session notes..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              defaultValue={selectedAppointment.sessionNotes || ''}
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  const notes = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '';
                  handleSessionNotes(selectedAppointment.id, notes);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Save Notes
              </button>
              <button
                onClick={() => setShowSessionNotesModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
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

export default CounselorDashboard;
