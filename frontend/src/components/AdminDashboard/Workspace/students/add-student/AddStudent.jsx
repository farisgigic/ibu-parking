import { useNavigate } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAdd = (createdStudent) => {
    console.log('✅ Student created:', createdStudent);
    navigate('/admin/students/all'); // Navigacija nakon uspješnog dodavanja
  };

  const handleClose = () => {
    navigate('/admin/students/all'); // Navigacija kada korisnik klikne cancel
  };

  return (
    <AddStudentForm
      onAdd={handleAdd}
      onClose={handleClose}
    />
  );
};

export default AddStudent;
