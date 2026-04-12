import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://p7-project-1.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ PUBLIC APIs ============
export const fetchSkills = () => api.get('/skills');
export const fetchExperiences = () => api.get('/experiences');
export const fetchProjects = () => api.get('/projects');
export const fetchReports = () => api.get('/reports');
export const fetchProfile = () => api.get('/profile');
export const fetchCertifications = () => api.get('/certifications');
export const fetchRepositories = () => api.get('/repositories');
export const submitContact = (data) => api.post('/contact', data);
// ============ ADMIN APIs ============
export const adminLogin = (data) => api.post('/auth/login', data);
export const adminVerify = () => api.get('/auth/verify');

// Skills
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Experiences
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

// Projects
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Profile
export const updateProfile = (data) => api.put('/profile', data);

// Certifications
export const createCertification = (data) => api.post('/certifications', data);
export const updateCertification = (id, data) => api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// Repositories
export const createRepository = (data) => api.post('/repositories', data);
export const updateRepository = (id, data) => api.put(`/repositories/${id}`, data);
export const deleteRepository = (id) => api.delete(`/repositories/${id}`);

// Reports
export const createReport = (data) => api.post('/reports', data);
export const updateReport = (id, data) => api.put(`/reports/${id}`, data);
export const deleteReport = (id) => api.delete(`/reports/${id}`);

export default api;