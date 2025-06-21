import { useNavigate } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAdd = (createdStudent) => {
    navigate('/admin/dashboard'); 
  };

  const handleClose = () => {
    navigate('/admin/dashboard'); 
  };

  return (
    <AddStudentForm
      onAdd={handleAdd}
      onClose={handleClose}
    />
  );
};

export default AddStudent;
