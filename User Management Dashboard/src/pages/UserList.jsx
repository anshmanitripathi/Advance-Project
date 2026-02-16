import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';
import { Link } from 'react-router-dom';
import { UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import UserCard from '../components/UserCard';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, totalUsers } = useSelector((state) => state.users);
  
  const [page, setPage] = useState(1);
  const limit = 6; 
  const totalPages = Math.ceil(totalUsers / limit);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading && users.length === 0) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
      
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage team members and permissions.</p>
          </div>
          <Link 
            to="/users/add" 
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
          >
            <UserPlus size={20} />
            Add User
          </Link>
        </div>

        {users.length === 0 && !loading ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {users.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm text-gray-600">
            Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages || 1}</span>
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              onClick={handleNext} 
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserList;