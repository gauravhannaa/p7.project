import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const { login } = useAdmin();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="glass-panel p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Shield size={48} className="text-neon mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neon">Admin Access</h2>
          <p className="text-gray-400 text-sm">Enter credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full bg-black/50 border border-neon/30 rounded px-4 py-2 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full bg-black/50 border border-neon/30 rounded px-4 py-2 text-white"
            required
          />
          <button type="submit" className="w-full py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30 transition">
            Authenticate
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Default: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;