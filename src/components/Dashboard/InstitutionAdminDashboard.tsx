import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users,
  UserPlus,
  BarChart3,
  TrendingUp,
  MessageCircle,
  AlertTriangle,
  Clock,
  Plus,
  CheckCircle,
  Heart,
  Shield,
  GraduationCap,
  EyeOff,
  Lock
} from 'lucide-react';

interface CounselorStats {
  totalCounselors: number;
  activeCounselors: number;
  pendingCounselors: number;
  totalSessions: number;
  averageWaitTime: number;
  specializationBreakdown: { [key: string]: number };
  statusBreakdown: { pending: number; approved: number; rejected: number };
}

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  studentsWithAssessments: number;
  riskLevelBreakdown: { low: number; medium: number; high: number };
  genderBreakdown: { male: number; female: number; other: number };
  yearBreakdown: { [key: number]: number };
  courseBreakdown: { [key: string]: number };
  totalSessions: number;
  averageSessionsPerStudent: number;
}

interface AssessmentData {
  totalAssessments: number;
  anxietyCount: number;
  depressionCount: number;
  burnoutCount: number;
  sleepDisordersCount: number;
  mildAnxiety: number;
  moderateAnxiety: number;
  severeAnxiety: number;
  mildDepression: number;
  moderateDepression: number;
  severeDepression: number;
  monthlyTrends: { month: string; count: number }[];
  assessmentCompletionRate: number;
  averageRiskScore: number;
}

interface InstitutionOverview {
  totalStudents: number;
  activeStudents: number;
  totalCounselors: number;
  activeCounselors: number;
  pendingCounselors: number;
  totalSessions: number;
  thisMonthSessions: number;
  averageWaitTime: number;
  studentSatisfaction: number;
  crisisInterventions: number;
  resourceViews: number;
  peerSupportSessions: number;
}

const InstitutionAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [counselorStats, setCounselorStats] = useState<CounselorStats>({
    totalCounselors: 0,
    activeCounselors: 0,
    pendingCounselors: 0,
    totalSessions: 0,
    averageWaitTime: 0,
    specializationBreakdown: {},
    statusBreakdown: { pending: 0, approved: 0, rejected: 0 }
  });
  const [studentStats, setStudentStats] = useState<StudentStats>({
    totalStudents: 0,
    activeStudents: 0,
    studentsWithAssessments: 0,
    riskLevelBreakdown: { low: 0, medium: 0, high: 0 },
    genderBreakdown: { male: 0, female: 0, other: 0 },
    yearBreakdown: {},
    courseBreakdown: {},
    totalSessions: 0,
    averageSessionsPerStudent: 0
  });
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    totalAssessments: 0,
    anxietyCount: 0,
    depressionCount: 0,
    burnoutCount: 0,
    sleepDisordersCount: 0,
    mildAnxiety: 0,
    moderateAnxiety: 0,
    severeAnxiety: 0,
    mildDepression: 0,
    moderateDepression: 0,
    severeDepression: 0,
    monthlyTrends: [],
    assessmentCompletionRate: 0,
    averageRiskScore: 0
  });
  const [institutionOverview, setInstitutionOverview] = useState<InstitutionOverview>({
    totalStudents: 0,
    activeStudents: 0,
    totalCounselors: 0,
    activeCounselors: 0,
    pendingCounselors: 0,
    totalSessions: 0,
    thisMonthSessions: 0,
    averageWaitTime: 0,
    studentSatisfaction: 0,
    crisisInterventions: 0,
    resourceViews: 0,
    peerSupportSessions: 0
  });
  const [showAddCounselorModal, setShowAddCounselorModal] = useState(false);
  const [newCounselor, setNewCounselor] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    specialization: [] as string[],
    languages: [] as string[]
  });

  // Initialize with aggregated data only (no personal details)
  useEffect(() => {
    // Counselor Statistics (aggregated only)
    setCounselorStats({
      totalCounselors: 3,
      activeCounselors: 2,
      pendingCounselors: 1,
      totalSessions: 254,
      averageWaitTime: 2.1,
      specializationBreakdown: {
        'Depression & Anxiety': 2,
        'Academic Stress': 1,
        'Career Counseling': 1,
        'Trauma & PTSD': 1
      },
      statusBreakdown: { pending: 1, approved: 2, rejected: 0 }
    });

    // Student Statistics (aggregated only)
    setStudentStats({
      totalStudents: 150,
      activeStudents: 142,
      studentsWithAssessments: 120,
      riskLevelBreakdown: { low: 85, medium: 45, high: 20 },
      genderBreakdown: { male: 65, female: 80, other: 5 },
      yearBreakdown: { 1: 35, 2: 40, 3: 30, 4: 15 },
      courseBreakdown: {
        'B.Tech Computer Science': 45,
        'M.A. Psychology': 25,
        'B.Sc. Mathematics': 30,
        'B.Com': 20,
        'B.A. English': 15,
        'Others': 15
      },
      totalSessions: 254,
      averageSessionsPerStudent: 1.7
    });

    // Assessment Data (aggregated only)
    setAssessmentData({
      totalAssessments: 120,
      anxietyCount: 45,
      depressionCount: 32,
      burnoutCount: 28,
      sleepDisordersCount: 15,
      mildAnxiety: 20,
      moderateAnxiety: 18,
      severeAnxiety: 7,
      mildDepression: 15,
      moderateDepression: 12,
      severeDepression: 5,
      monthlyTrends: [
        { month: 'Jan', count: 85 },
        { month: 'Feb', count: 92 },
        { month: 'Mar', count: 78 },
        { month: 'Apr', count: 105 },
        { month: 'May', count: 98 },
        { month: 'Jun', count: 120 }
      ],
      assessmentCompletionRate: 80,
      averageRiskScore: 3.2
    });

    // Institution Overview
    setInstitutionOverview({
      totalStudents: 150,
      activeStudents: 142,
      totalCounselors: 3,
      activeCounselors: 2,
      pendingCounselors: 1,
      totalSessions: 254,
      thisMonthSessions: 45,
      averageWaitTime: 2.1,
      studentSatisfaction: 88,
      crisisInterventions: 3,
      resourceViews: 1250,
      peerSupportSessions: 89
    });
  }, []);

  // Add new counselor (only basic info, no personal details shown)
  const handleAddCounselor = () => {
    // Update counselor stats
    setCounselorStats(prev => ({
      ...prev,
      totalCounselors: prev.totalCounselors + 1,
      pendingCounselors: prev.pendingCounselors + 1
    }));

    setNewCounselor({
      name: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      specialization: [],
      languages: []
    });
    setShowAddCounselorModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Privacy Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              This dashboard shows only aggregated, anonymous data. No personal information of students or counselors is accessible to maintain privacy and confidentiality.
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Institution Admin Dashboard</h1>
            <p className="text-blue-100 mt-1">
              {user?.college} • {user?.department}
            </p>
            <p className="text-blue-100 mt-2">
              Overview of your institution's mental health support system
            </p>
          </div>
          <GraduationCap className="h-16 w-16 text-white opacity-20" />
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{institutionOverview.totalStudents}</p>
              <p className="text-xs text-gray-500">{institutionOverview.activeStudents} active</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Counselors</p>
              <p className="text-2xl font-bold text-gray-900">{institutionOverview.activeCounselors}</p>
              <p className="text-xs text-gray-500">{institutionOverview.pendingCounselors} pending</p>
            </div>
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{institutionOverview.totalSessions}</p>
              <p className="text-xs text-gray-500">{institutionOverview.thisMonthSessions} this month</p>
            </div>
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Student Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{institutionOverview.studentSatisfaction}%</p>
              <p className="text-xs text-gray-500">Average rating</p>
            </div>
            <Heart className="h-8 w-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          Mental Health Assessment Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{assessmentData.totalAssessments}</p>
            <p className="text-sm text-gray-600">Total Assessments</p>
            <p className="text-xs text-gray-500">{assessmentData.assessmentCompletionRate}% completion rate</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{assessmentData.anxietyCount}</p>
            <p className="text-sm text-gray-600">Anxiety Cases</p>
            <p className="text-xs text-gray-500">Mild: {assessmentData.mildAnxiety}, Moderate: {assessmentData.moderateAnxiety}, Severe: {assessmentData.severeAnxiety}</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{assessmentData.depressionCount}</p>
            <p className="text-sm text-gray-600">Depression Cases</p>
            <p className="text-xs text-gray-500">Mild: {assessmentData.mildDepression}, Moderate: {assessmentData.moderateDepression}, Severe: {assessmentData.severeDepression}</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{assessmentData.burnoutCount}</p>
            <p className="text-sm text-gray-600">Burnout Cases</p>
            <p className="text-xs text-gray-500">Academic stress related</p>
          </div>
        </div>
      </div>

      {/* Student Risk Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Risk Level Distribution</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">High Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.high / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium">{studentStats.riskLevelBreakdown.high}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Medium Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.medium / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium">{studentStats.riskLevelBreakdown.medium}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Low Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.low / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium">{studentStats.riskLevelBreakdown.low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCounselorManagement = () => (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Lock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Privacy Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              You can add new counselors and view aggregated statistics only. Personal details of counselors are not accessible to maintain privacy.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Counselor Management</h2>
        <button
          onClick={() => setShowAddCounselorModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Counselor
        </button>
      </div>

      {/* Counselor Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Counselors</p>
              <p className="text-2xl font-bold text-gray-900">{counselorStats.totalCounselors}</p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Counselors</p>
              <p className="text-2xl font-bold text-gray-900">{counselorStats.activeCounselors}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">{counselorStats.pendingCounselors}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Counselor Performance Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{counselorStats.totalSessions}</p>
            <p className="text-sm text-gray-600">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{counselorStats.averageWaitTime}h</p>
            <p className="text-sm text-gray-600">Average Wait Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{institutionOverview.studentSatisfaction}%</p>
            <p className="text-sm text-gray-600">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{institutionOverview.crisisInterventions}</p>
            <p className="text-sm text-gray-600">Crisis Interventions</p>
          </div>
        </div>
      </div>

      {/* Specialization Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Specialization Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(counselorStats.specializationBreakdown).map(([specialization, count]) => (
            <div key={specialization} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{specialization}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(count / counselorStats.totalCounselors) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Counselor Status Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{counselorStats.statusBreakdown.approved}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{counselorStats.statusBreakdown.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{counselorStats.statusBreakdown.rejected}</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentDetails = () => (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <EyeOff className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800">Privacy Notice</h4>
            <p className="text-sm text-red-700 mt-1">
              <strong>No personal student information is accessible.</strong> This section shows only aggregated, anonymous statistics to maintain student privacy and confidentiality.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">Student Statistics (Anonymous)</h2>

      {/* Student Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.totalStudents}</p>
              <p className="text-xs text-gray-500">{studentStats.activeStudents} active</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assessment Completion</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.studentsWithAssessments}</p>
              <p className="text-xs text-gray-500">{Math.round((studentStats.studentsWithAssessments / studentStats.totalStudents) * 100)}% completion rate</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.totalSessions}</p>
              <p className="text-xs text-gray-500">{studentStats.averageSessionsPerStudent} avg per student</p>
            </div>
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Students</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.riskLevelBreakdown.high}</p>
              <p className="text-xs text-gray-500">{Math.round((studentStats.riskLevelBreakdown.high / studentStats.totalStudents) * 100)}% of total</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Risk Level Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Risk Level Distribution</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">High Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.high / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{studentStats.riskLevelBreakdown.high}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Medium Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.medium / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{studentStats.riskLevelBreakdown.medium}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Low Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(studentStats.riskLevelBreakdown.low / studentStats.totalStudents) * 100}%` }}></div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{studentStats.riskLevelBreakdown.low}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gender and Year Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Female</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${(studentStats.genderBreakdown.female / studentStats.totalStudents) * 100}%` }}></div>
                </div>
                <span className="text-sm font-medium">{studentStats.genderBreakdown.female}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Male</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(studentStats.genderBreakdown.male / studentStats.totalStudents) * 100}%` }}></div>
                </div>
                <span className="text-sm font-medium">{studentStats.genderBreakdown.male}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Other</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${(studentStats.genderBreakdown.other / studentStats.totalStudents) * 100}%` }}></div>
                </div>
                <span className="text-sm font-medium">{studentStats.genderBreakdown.other}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-wise Distribution</h3>
          <div className="space-y-3">
            {Object.entries(studentStats.yearBreakdown).map(([year, count]) => (
              <div key={year} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Year {year}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(count / studentStats.totalStudents) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
        <div className="space-y-3">
          {Object.entries(studentStats.courseBreakdown).map(([course, count]) => (
            <div key={course} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{course}</span>
              <div className="flex items-center space-x-2">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(count / studentStats.totalStudents) * 100}%` }}></div>
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Privacy Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              All analytics data is aggregated and anonymous. No personal information is accessible to maintain student privacy.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h2>
      
      {/* Assessment Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mental Health Assessment Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{assessmentData.anxietyCount}</p>
            <p className="text-sm text-gray-600">Anxiety Cases</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Mild: {assessmentData.mildAnxiety}</span>
                <span>Moderate: {assessmentData.moderateAnxiety}</span>
                <span>Severe: {assessmentData.severeAnxiety}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{assessmentData.depressionCount}</p>
            <p className="text-sm text-gray-600">Depression Cases</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Mild: {assessmentData.mildDepression}</span>
                <span>Moderate: {assessmentData.moderateDepression}</span>
                <span>Severe: {assessmentData.severeDepression}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{assessmentData.burnoutCount}</p>
            <p className="text-sm text-gray-600">Burnout Cases</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{assessmentData.sleepDisordersCount}</p>
            <p className="text-sm text-gray-600">Sleep Disorders</p>
          </div>
        </div>
      </div>

      {/* Assessment Completion and Risk Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Completion Rate</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">{assessmentData.assessmentCompletionRate}%</p>
            <p className="text-sm text-gray-600 mt-2">Students who completed assessments</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{ width: `${assessmentData.assessmentCompletionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Risk Score</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-600">{assessmentData.averageRiskScore}/10</p>
            <p className="text-sm text-gray-600 mt-2">Average mental health risk score</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full" 
                  style={{ width: `${(assessmentData.averageRiskScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Assessment Trends</h3>
        <div className="space-y-3">
          {assessmentData.monthlyTrends.map((month, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{month.month}</span>
              <div className="flex items-center space-x-3">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(month.count / 120) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{month.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Usage Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{institutionOverview.resourceViews}</p>
            <p className="text-sm text-gray-600">Resource Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{institutionOverview.peerSupportSessions}</p>
            <p className="text-sm text-gray-600">Peer Support Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{institutionOverview.thisMonthSessions}</p>
            <p className="text-sm text-gray-600">Sessions This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{institutionOverview.crisisInterventions}</p>
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
              { id: 'counselors', label: 'Counselor Management', icon: UserPlus },
              { id: 'students', label: 'Student Statistics', icon: Users },
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
      {activeTab === 'counselors' && renderCounselorManagement()}
      {activeTab === 'students' && renderStudentDetails()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Add Counselor Modal */}
      {showAddCounselorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Counselor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newCounselor.name}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newCounselor.email}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newCounselor.phone}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={newCounselor.qualification}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                <input
                  type="number"
                  value={newCounselor.experience}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddCounselor}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
              >
                Add Counselor
              </button>
              <button
                onClick={() => setShowAddCounselorModal(false)}
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

export default InstitutionAdminDashboard;
