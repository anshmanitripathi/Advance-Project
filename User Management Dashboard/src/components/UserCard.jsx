import { Link } from 'react-router-dom';
import { Trash2, Edit, Mail, Shield, Activity } from 'lucide-react';

const UserCard = ({ user, onDelete }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=amber&color=fff&size=128`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      
      <div className="p-6 flex flex-col items-center text-center border-b border-gray-50">
        <div className="relative mb-4">
          <img 
            src={avatarUrl} 
            alt={user.name} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <Mail size={14} /> {user.email}
        </p>

        <div className="flex gap-2 mt-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {user.role}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
             user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex gap-3 mt-auto">
        <Link 
          to={`/users/edit/${user.id}`} 
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition"
        >
          <Edit size={16} /> Edit
        </Link>
        <button 
          onClick={() => onDelete(user.id)} 
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>

    </div>
  );
};

export default UserCard;