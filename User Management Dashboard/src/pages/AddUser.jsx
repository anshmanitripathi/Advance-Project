import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/users/usersSlice';
import UserForm from '../components/UserForm';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddUser = async (data) => {
    try {
      await dispatch(addUser(data)).unwrap();
      alert('User added successfully!');
      navigate('/users'); 
    } catch (error) {
      console.error("Failed to add user:", error);
      alert('Failed to add user.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <UserForm onSubmit={handleAddUser} isEditMode={false} />
    </div>
  );
};

export default AddUser;