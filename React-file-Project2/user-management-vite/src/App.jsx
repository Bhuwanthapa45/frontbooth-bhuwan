import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Table from './pages/Table';

function App() {
  // State is lifted here so it can be shared between the Table (setter) and Home (getter)
  const [editingUser, setEditingUser] = useState(null);
  const location = useLocation();

  // Helper to highlight active link
  const linkClass = (path) => 
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      location.pathname === path 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-gray-800">User Management</div>
            <div className="flex space-x-2">
              <Link to="/" className={linkClass('/')}>Add User</Link>
              <Link to="/table" className={linkClass('/table')}>View List</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Manage your users efficiently</p>
        </header>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px] p-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  editingUser={editingUser} 
                  setEditingUser={setEditingUser} 
                />
              } 
            />
            <Route 
              path="/table" 
              element={
                <Table 
                  setEditingUser={setEditingUser} 
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;