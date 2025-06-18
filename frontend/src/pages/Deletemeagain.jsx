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

// CSS styles (would normally be in separate .css files)
const styles = `
.sidebar {
  width: 16rem;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #2563eb;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text h1, .logo-text h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #374151;
  font-weight: 500;
}

.menu-item:hover {
  background-color: #f9fafb;
}

.menu-item.active {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-right: 2px solid #1d4ed8;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-item-expand {
  margin-left: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  margin-left: auto;
}

.badge-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.submenu {
  margin-left: 2rem;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.submenu-item {
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #6b7280;
}

.submenu-item:hover {
  background-color: #f9fafb;
}

.submenu-item.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.sidebar-home {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.home-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #374151;
  font-weight: 500;
}

.home-button:hover {
  background-color: #f9fafb;
}

.home-button.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}
`;

// Logo Component
const Logo = () => {
  return (
    <div className="sidebar-logo">
      <div className="logo-container">
        <div className="logo-icon">
          <GraduationCap size={24} color="white" />
        </div>
        <div className="logo-text">
          <h1>CAMPUS</h1>
          <h2>MANAGER</h2>
        </div>
      </div>
    </div>
  );
};

// Badge Component
const Badge = ({ count, variant = 'danger' }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {count}
    </span>
  );
};

// Icon Renderer Component
const IconRenderer = ({ iconName, size = 20 }) => {
  const icons = {
    LayoutDashboard: <LayoutDashboard size={size} />,
    GraduationCap: <GraduationCap size={size} />,
    Car: <Car size={size} />,
    Bell: <Bell size={size} />,
    FileText: <FileText size={size} />,
    Calendar: <Calendar size={size} />
  };
  
  return icons[iconName] || <LayoutDashboard size={size} />;
};

// Submenu Item Component
const SubmenuItem = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`submenu-item ${isActive ? 'active' : ''}`}
    >
      {item.label}
    </button>
  );
};

// Submenu Component
const Submenu = ({ items, activeItem, onItemClick, isExpanded }) => {
  if (!isExpanded) return null;

  return (
    <div className="submenu">
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
        className={`menu-item ${isActive ? 'active' : ''}`}
      >
        <div className="menu-item-content">
          <IconRenderer iconName={item.iconName} />
          <span>{item.label}</span>
          {item.badge && (
            <Badge count={item.badge} variant="danger" />
          )}
        </div>
        {item.hasSubmenu && (
          <div className="menu-item-expand">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
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
    <nav className="sidebar-nav">
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
    <div className="sidebar-home">
      <button
        onClick={() => onClick('home')}
        className={`home-button ${isActive ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>
    </div>
  );
};

// Menu Data Hook
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
    <>
      {/* <style>{styles}</style> */}
      <div className="sidebar">
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
    </>
  );
};

export default Sidebar;