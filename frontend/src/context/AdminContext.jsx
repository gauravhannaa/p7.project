import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminLogin, adminVerify } from '../api';
import toast from 'react-hot-toast';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await adminVerify();
      // If the request succeeded (status 2xx), consider the user authenticated
      setIsAdmin(true);
      // Store any returned data (or null if none)
      setAdminData(res.data || null);
    } catch (error) {
      console.error('Auth verification failed:', error);
      localStorage.removeItem('admin_token');
      setIsAdmin(false);
      setAdminData(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const res = await adminLogin(credentials);
      localStorage.setItem('admin_token', res.data.token);
      setIsAdmin(true);
      setAdminData(res.data.user || null);
      toast.success('Admin access granted!', {
        style: { background: '#0a0a0a', color: '#00ff41' }
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials', {
        style: { background: '#0a0a0a', color: '#ff4444' }
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
    setAdminData(null);
    toast.success('Logged out successfully', {
      style: { background: '#0a0a0a', color: '#00ff41' }
    });
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, adminData, login, logout, checkAuth }}>
      {children}
    </AdminContext.Provider>
  );
};