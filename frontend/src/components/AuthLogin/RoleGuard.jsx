import { Navigate } from 'react-router-dom';

const RoleGuard = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but role not allowed
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RoleGuard;
