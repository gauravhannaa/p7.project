import axios from 'axios';

const API_URL = 'https://p7-project-1.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export const fetchSkills = () => api.get('/skills');
export const fetchExperiences = () => api.get('/experiences');
export const fetchProjects = () => api.get('/projects');
export const fetchReports = () => api.get('/reports');
export const submitContact = (data) => api.post('/contact', data);

export default api;