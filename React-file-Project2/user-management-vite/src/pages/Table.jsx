import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/userTable';


const Table = ({ setEditingUser }) => {
  const navigate = useNavigate();

  // Wrapper function to handle "Edit" click
  const handleEdit = (user) => {
    setEditingUser(user); // 1. Set the user to be edited
    navigate('/');        // 2. Redirect to the Home (Form) page
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Directory</h2>
          <p className="text-gray-500">View and manage all registered users.</p>
        </div>
      </div>

      {/* Pass the wrapper function instead of the raw setter */}
      <UserTable setEditingUser={handleEdit} />
    </div>
  );
};

export default Table;