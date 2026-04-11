import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminLogin, adminVerify } from '../api';
import toast from 'react-hot-toast';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        await adminVerify();
        setIsAdmin(true);
      } catch (error) {
        localStorage.removeItem('admin_token');
        setIsAdmin(false);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const res = await adminLogin(credentials);
      localStorage.setItem('admin_token', res.data.token);
      setIsAdmin(true);
      toast.success('Admin access granted!');
      return true;
    } catch (error) {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
    toast.success('Logged out');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};