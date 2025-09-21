import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import LandingPage from './components/LandingPage';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import PHQ9Assessment from './components/Assessment/PHQ9Assessment';
import AIChat from './components/Chat/AIChat';
import ResourceLibrary from './components/Resources/ResourceLibrary';
import AdminDashboard from './components/Analytics/AdminDashboard';
import PeerVolunteers from './components/Student/PeerVolunteers';
import CounselorBooking from './components/Student/CounselorBooking';
import VolunteerDashboard from './components/Volunteer/VolunteerDashboard';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/register') {
      setCurrentPage('register');
    } else if (path === '/login') {
      setCurrentPage('login');
    } else {
      setCurrentPage('landing');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (currentPage === 'register') {
      return <Registration />;
    } else if (currentPage === 'login') {
      return <Login />;
    }
    return <LandingPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'system_admin' || user.role === 'college_admin') {
          return <AdminDashboard />;
        }
        if (user.role === 'peer_volunteer') {
          return <VolunteerDashboard />;
        }
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'assessment':
        return <PHQ9Assessment />;
      case 'chat':
        return <AIChat />;
      case 'peer_volunteers':
        return <PeerVolunteers />;
      case 'book_counselor':
        return <CounselorBooking />;
      case 'resources':
        return <ResourceLibrary />;
      case 'analytics':
        return <AdminDashboard />;
      case 'volunteer_dashboard':
        return <VolunteerDashboard />;
      case 'chat_requests':
        return <VolunteerDashboard />;
      default:
        return <div className="text-center text-gray-500">Feature coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-6 md:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;