import { Shield } from 'lucide-react';

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <div className="access-denied-icon">
        <Shield size={32} />
      </div>
      <h2>Access Restricted</h2>
      <p>
        Only students with <code>@stu.ibu.edu.ba</code> email addresses are allowed to access this system.
      </p>
    </div>
  );
};

export default AccessDenied;
