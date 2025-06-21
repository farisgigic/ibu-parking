import { useNavigate } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAdd = (createdStudent) => {
    navigate('/admin/students/all'); 
  };

  const handleClose = () => {
    navigate('/admin/students/all'); 
  };

  return (
    <AddStudentForm
      onAdd={handleAdd}
      onClose={handleClose}
    />
  );
};

export default AddStudent;
