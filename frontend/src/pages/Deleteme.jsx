import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Bell, 
  Car, 
  GraduationCap, 
  FileText, 
  Calendar,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Logo Component
const Logo = () => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">CAMPUS</h1>
          <h2 className="text-xl font-bold text-gray-900">MANAGER</h2>
        </div>
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ count, variant = 'danger' }) => {
  const variants = {
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white'
  };

  return (
    <span className={`text-xs rounded-full px-2 py-0.5 ml-auto ${variants[variant]}`}>
      {count}
    </span>
  );
};

// Submenu Item Component
const SubmenuItem = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {item.label}
    </button>
  );
};

// Submenu Component
const Submenu = ({ items, activeItem, onItemClick, isExpanded }) => {
  if (!isExpanded) return null;

  return (
    <div className="ml-8 mt-1 space-y-1">
      {items.map((subItem) => (
        <SubmenuItem
          key={subItem.id}
          item={subItem}
          isActive={activeItem === subItem.id}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ 
  item, 
  isActive, 
  isExpanded, 
  onItemClick, 
  onToggleExpand,
  onSubmenuClick,
  activeItem 
}) => {
  const handleClick = () => {
    if (item.hasSubmenu) {
      onToggleExpand(item.id);
    } else {
      onItemClick(item.id);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconRenderer iconName={item.iconName} className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
          {item.badge && (
            <Badge count={item.badge} variant="danger" />
          )}
        </div>
        {item.hasSubmenu && (
          <div className="ml-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        )}
      </button>

      {item.hasSubmenu && (
        <Submenu
          items={item.submenu}
          activeItem={activeItem}
          onItemClick={onSubmenuClick}
          isExpanded={isExpanded}
        />
      )}
    </div>
  );
};

// Navigation Component
const Navigation = ({ menuItems, activeItem, expandedItems, onItemClick, onToggleExpand, onSubmenuClick }) => {
  return (
    <nav className="flex-1 p-4 space-y-2">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
          isExpanded={expandedItems[item.id]}
          onItemClick={onItemClick}
          onToggleExpand={onToggleExpand}
          onSubmenuClick={onSubmenuClick}
          activeItem={activeItem}
        />
      ))}
    </nav>
  );
};

// Home Button Component
const HomeButton = ({ isActive, onClick }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <button
        onClick={() => onClick('home')}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="font-medium">Home</span>
      </button>
    </div>
  );
};

// Icon Component
const IconRenderer = ({ iconName, className }) => {
  const icons = {
    LayoutDashboard: <LayoutDashboard className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Car: <Car className={className} />,
    Bell: <Bell className={className} />,
    FileText: <FileText className={className} />,
    Calendar: <Calendar className={className} />
  };
  
  return icons[iconName] || <LayoutDashboard className={className} />;
};

// Menu Data Hook/Service
const useMenuData = () => {
  return [
    {
      id: 'dashboard',
      label: 'Dashboard',
      iconName: 'LayoutDashboard',
      path: '/dashboard'
    },
    {
      id: 'students',
      label: 'Students',
      iconName: 'GraduationCap',
      path: '/students',
      hasSubmenu: true,
      submenu: [
        { id: 'all-students', label: 'All Students', path: '/students/all' },
        { id: 'add-student', label: 'Add Student', path: '/students/add' },
        { id: 'student-groups', label: 'Student Groups', path: '/students/groups' }
      ]
    },
    {
      id: 'parking',
      label: 'Parking Slots',
      iconName: 'Car',
      path: '/parking'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      iconName: 'Bell',
      path: '/notifications',
      badge: '3'
    },
    {
      id: 'reports',
      label: 'Reports',
      iconName: 'FileText',
      path: '/reports',
      hasSubmenu: true,
      submenu: [
        { id: 'student-reports', label: 'Student Reports', path: '/reports/students' },
        { id: 'parking-reports', label: 'Parking Reports', path: '/reports/parking' },
        { id: 'financial-reports', label: 'Financial Reports', path: '/reports/financial' }
      ]
    },
    {
      id: 'reservations',
      label: 'Reservations',
      iconName: 'Calendar',
      path: '/reservations'
    }
  ];
};

// Main Sidebar Component
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState({});
  const menuItems = useMenuData();

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const handleSubmenuClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <Logo />
      <Navigation
        menuItems={menuItems}
        activeItem={activeItem}
        expandedItems={expandedItems}
        onItemClick={handleItemClick}
        onToggleExpand={toggleExpanded}
        onSubmenuClick={handleSubmenuClick}
      />
      <HomeButton
        isActive={activeItem === 'home'}
        onClick={handleItemClick}
      />
    </div>
  );
};

export default Sidebar;