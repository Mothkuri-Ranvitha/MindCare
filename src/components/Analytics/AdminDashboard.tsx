import React from 'react';
import analyticsData from '../../data/analytics.json';
import { 
  TrendingUp, 
  Users, 
  ClipboardList, 
  MessageCircle, 
  AlertTriangle,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { dashboardStats, monthlyTrends, severityDistribution, collegeStats } = analyticsData;

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
    trend?: string;
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <p className="text-sm text-green-600 font-medium">{trend} from last month</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minimal': return 'bg-green-500';
      case 'mild': return 'bg-yellow-500';
      case 'moderate': return 'bg-orange-500';
      case 'moderately_severe': return 'bg-red-500';
      case 'severe': return 'bg-red-700';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityLabel = (severity: string) => {
    return severity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Comprehensive overview of mental health support platform metrics
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          icon={Users}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="Active Users"
          value={dashboardStats.activeUsers}
          icon={TrendingUp}
          color="bg-green-500"
          trend="+8%"
        />
        <StatCard
          title="Total Assessments"
          value={dashboardStats.totalAssessments}
          icon={ClipboardList}
          color="bg-purple-500"
          trend="+15%"
        />
        <StatCard
          title="Counseling Sessions"
          value={dashboardStats.counselingSessions}
          icon={MessageCircle}
          color="bg-orange-500"
          trend="+22%"
        />
        <StatCard
          title="Crisis Alerts"
          value={dashboardStats.crisisAlerts}
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <StatCard
          title="Resource Views"
          value={dashboardStats.resourceViews}
          icon={Calendar}
          color="bg-teal-500"
          trend="+18%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            Monthly Growth Trends
          </h2>
          <div className="space-y-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{month.month}</span>
                  <span className="text-gray-600">{month.users} users</span>
                </div>
                <div className="relative">
                  <div className="flex space-x-1">
                    <div className="flex-1">
                      <div className="bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(month.users / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(month.assessments / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-purple-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(month.sessions / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Assessments: {month.assessments}</span>
                  <span>Sessions: {month.sessions}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span>Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <span>Assessments</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                <span>Sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Depression Severity Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 text-purple-600 mr-2" />
            Depression Severity Distribution
          </h2>
          <div className="space-y-3">
            {Object.entries(severityDistribution).map(([severity, percentage]) => (
              <div key={severity} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {getSeverityLabel(severity)}
                  </span>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
                <div className="relative">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${getSeverityColor(severity)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <p>Based on {dashboardStats.totalAssessments} PHQ-9 assessments</p>
          </div>
        </div>
      </div>

      {/* College Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 text-green-600 mr-2" />
          College-wise Usage Statistics
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">College</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Users</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Assessments</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Engagement Rate</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {collegeStats.map((college, index) => {
                const engagementRate = ((college.assessments / college.users) * 100).toFixed(1);
                const isHighEngagement = parseFloat(engagementRate) > 250;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{college.name}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{college.users.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{college.assessments.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{engagementRate}%</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isHighEngagement 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {isHighEngagement ? 'High' : 'Moderate'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-medium transition-colors">
          Export Data
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-medium transition-colors">
          Generate Report
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors">
          Manage Users
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-medium transition-colors">
          Crisis Alerts
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;