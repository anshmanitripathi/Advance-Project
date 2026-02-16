import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/users/usersSlice';
import UserForm from '../components/UserForm';

const EditUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => 
    state.users.users.find((user) => user.id === String(id))
  );

  useEffect(() => {
    if (!currentUser) {
      navigate('/users');
    }
  }, [currentUser, navigate]);

  const handleEditUser = async (data) => {
    try {
      await dispatch(updateUser({ id, data })).unwrap();
      alert('User updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error("Failed to update user:", error);
      alert('Failed to update user.');
    }
  };

  if (!currentUser) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <UserForm 
        onSubmit={handleEditUser} 
        initialData={currentUser} 
        isEditMode={true} 
      />
    </div>
  );
};

export default EditUser;