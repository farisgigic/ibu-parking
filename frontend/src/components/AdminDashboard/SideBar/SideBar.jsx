import { useState } from 'react';
import Logo from '@components/AdminDashboard/Logo/Logo';
import HomeButton from '@components/AdminDashboard/HomeButton/HomeButton';
import MenuItem from '@components/AdminDashboard/MenuItem/MenuItem';
import './SideBar.module.css'; 

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
        { id: 'all-students', label: 'All Students', path: '/admin/students/all' },
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