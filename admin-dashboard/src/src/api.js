import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://your-backend.onrender.com/api' });

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const fetchProfile = () => API.get('/profile');
export const updateProfile = (data) => API.put('/profile', data);
export const uploadProfileImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return API.post('/upload/profile-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// Generic CRUD helpers
export const fetchItems = (endpoint) => API.get(`/${endpoint}`);
export const createItem = (endpoint, data) => API.post(`/${endpoint}`, data);
export const updateItem = (endpoint, id, data) => API.put(`/${endpoint}/${id}`, data);
export const deleteItem = (endpoint, id) => API.delete(`/${endpoint}/${id}`);

// Specific endpoints: skills, projects, experiences, certifications, repositories, contacts