import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Heart, 
  Menu, 
  User, 
  LogOut, 
  Globe,
  Bell,
  Settings
} from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'english' | 'hindi' | 'tamil') => {
    setLanguage(lang);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center ml-4 md:ml-0">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MindCare</span>
              <span className="ml-2 text-sm text-gray-500 hidden sm:block">Mental Health Support</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Globe className="h-5 w-5" />
                <span className="hidden sm:block">{language === 'english' ? 'EN' : language === 'hindi' ? 'हि' : 'த'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleLanguageChange('english')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hindi')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
                  >
                    हिंदी (Hindi)
                  </button>
                  <button
                    onClick={() => handleLanguageChange('tamil')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full text-left"
                  >
                    தமிழ் (Tamil)
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-blue-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="hidden sm:block font-medium">{user?.name}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
                  </div>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;