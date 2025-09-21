import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  LayoutDashboard,
  ClipboardList,
  MessageCircle,
  BookOpen,
  Calendar,
  BarChart3,
  Users,
  AlertTriangle,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard }
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { id: 'assessment', label: t('nav.assessment', 'Assessment'), icon: ClipboardList },
        { id: 'chat', label: t('nav.chat', 'Chat Support'), icon: MessageCircle },
        { id: 'resources', label: t('nav.resources', 'Resources'), icon: BookOpen }
      ];
    }

    if (user?.role === 'counselor') {
      return [
        ...baseItems,
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'crisis-alerts', label: 'Crisis Alerts', icon: AlertTriangle }
      ];
    }

    if (user?.role === 'college_admin' || user?.role === 'system_admin') {
      return [
        ...baseItems,
        { id: 'analytics', label: t('nav.analytics', 'Analytics'), icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'resources', label: 'Resource Management', icon: BookOpen },
        { id: 'crisis-alerts', label: 'Crisis Management', icon: AlertTriangle }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 md:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      onClose(); // Close mobile menu after selection
                    }}
                    className={`
                      w-full flex items-center px-4 py-2 text-left rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'crisis-alerts' && (
                      <span className="ml-auto h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Emergency Contact Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-red-50 border-t border-red-200">
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-red-800">Emergency Help</p>
            <p className="text-xs text-red-600 mb-2">24/7 Crisis Helpline</p>
            <a 
              href="tel:022-2754-6669" 
              className="text-sm font-bold text-red-700 hover:text-red-800"
            >
              022-2754-6669
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;