import React from 'react';
import UserForm from '../components/UserForm';

const Home = ({ editingUser, setEditingUser }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingUser ? 'Edit User Details' : 'Register New User'}
        </h2>
        <p className="text-gray-500">
          {editingUser 
            ? 'Update the information below to save changes.' 
            : 'Fill in the form below to add a new user to the system.'}
        </p>
      </div>

      <UserForm 
        editingUser={editingUser} 
        setEditingUser={setEditingUser} 
      />
    </div>
  );
};

export default Home;