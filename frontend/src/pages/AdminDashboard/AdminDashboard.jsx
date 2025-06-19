import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/AdminDashboard/sideBar/SideBar';

const AdminDashboard = () => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '250px 1fr', 
      minHeight: '100vh' 
    }}>
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
