import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate('/');     
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 mb-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 flex items-center gap-2">      
          User Management
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 border border-gray-200">
                <User size={20} />
              </div>
            </div>
          )}

          <div className="h-8 w-px bg-gray-300 mx-2 hidden sm:block"></div>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;