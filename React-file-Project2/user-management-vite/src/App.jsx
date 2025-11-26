import { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/userTable';



function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Vite + React + Redux Toolkit</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 sticky top-6">
            <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />
          </div>
          <div className="lg:col-span-8">
            <UserTable setEditingUser={setEditingUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;