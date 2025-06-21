import { useNavigate } from 'react-router-dom';
import AddReportForm from './AddReportForm.jsx';

const StudentReports = () => {
  const navigate = useNavigate();

  const handleAdd = (createdNotification) => {
    navigate('/admin/dashboard'); 
  };

  const handleClose = () => {
    navigate('/admin/dashboard'); 
  };

  return (
    <AddReportForm
      onAdd={handleAdd}
      onClose={handleClose}
    />
  );
};

export default StudentReports;