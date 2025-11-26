import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/features/userSlice';
import { Edit, Trash2 } from 'lucide-react';

export default function UserTable({ setEditingUser }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  if (users.length === 0) return <div className="text-center p-10 text-gray-500">No users found.</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Info</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{user.fullName}</div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                <td className="p-4 text-sm text-gray-600">
                  <div>{user.country}</div>
                  <div className="text-xs text-gray-400">{user.age} yrs • {user.gender}</div>
                </td>
                <td className="p-4 flex gap-2">
                  <button 
                    onClick={() => setEditingUser(user)} 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Edit size={18}/>
                  </button>
                  <button 
                    onClick={() => dispatch(deleteUser(user.id))} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
