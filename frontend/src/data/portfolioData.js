import {
  fetchSkills as apiFetchSkills,
  fetchExperiences as apiFetchExperiences,
  fetchProjects as apiFetchProjects,
  fetchProfile as apiFetchProfile,
  fetchCertifications as apiFetchCertifications,
  fetchRepositories as apiFetchRepositories,
  fetchReports as apiFetchReports,
  // Admin APIs
  createSkill as apiCreateSkill,
  updateSkill as apiUpdateSkill,
  deleteSkill as apiDeleteSkill,
  createExperience as apiCreateExperience,
  updateExperience as apiUpdateExperience,
  deleteExperience as apiDeleteExperience,
  createProject as apiCreateProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
  updateProfile as apiUpdateProfile,
  createCertification as apiCreateCertification,
  updateCertification as apiUpdateCertification,
  deleteCertification as apiDeleteCertification,
  createRepository as apiCreateRepository,
  updateRepository as apiUpdateRepository,
  deleteRepository as apiDeleteRepository,
  createReport as apiCreateReport,
  updateReport as apiUpdateReport,
  deleteReport as apiDeleteReport,
} from '../api';

// Cache for offline fallback
let cachedData = {
  skills: [],
  experiences: [],
  projects: [],
  profile: null,
  certifications: [],
  repositories: [],
  reports: [],
};

// Load from localStorage on init
const loadFromStorage = () => {
  const saved = localStorage.getItem('portfolio_cache');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      cachedData = { ...cachedData, ...data };
    } catch (e) {
      console.error('Cache load error:', e);
    }
  }
};

loadFromStorage();

const saveToStorage = () => {
  localStorage.setItem('portfolio_cache', JSON.stringify(cachedData));
};

// ============ Fetch Functions ============
export const fetchSkillsData = async () => {
  try {
    const res = await apiFetchSkills();
    cachedData.skills = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return cachedData.skills;
  }
};

export const fetchExperiencesData = async () => {
  try {
    const res = await apiFetchExperiences();
    cachedData.experiences = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return cachedData.experiences;
  }
};

export const fetchProjectsData = async () => {
  try {
    const res = await apiFetchProjects();
    cachedData.projects = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return cachedData.projects;
  }
};

export const fetchProfileData = async () => {
  try {
    const res = await apiFetchProfile();
    cachedData.profile = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return cachedData.profile || defaultProfile;
  }
};

export const fetchCertificationsData = async () => {
  try {
    const res = await apiFetchCertifications();
    cachedData.certifications = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return cachedData.certifications;
  }
};

export const fetchRepositoriesData = async () => {
  try {
    const res = await apiFetchRepositories();
    cachedData.repositories = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return cachedData.repositories;
  }
};

export const fetchReportsData = async () => {
  try {
    const res = await apiFetchReports();
    cachedData.reports = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return cachedData.reports;
  }
};

// ============ ADMIN CRUD Functions ============
// Skills
export const createSkill = async (data) => {
  const res = await apiCreateSkill(data);
  return res.data;
};

export const updateSkill = async (id, data) => {
  const res = await apiUpdateSkill(id, data);
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await apiDeleteSkill(id);
  return res.data;
};

// Experiences
export const createExperience = async (data) => {
  const res = await apiCreateExperience(data);
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await apiUpdateExperience(id, data);
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await apiDeleteExperience(id);
  return res.data;
};

// Projects
export const createProject = async (data) => {
  const res = await apiCreateProject(data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await apiUpdateProject(id, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await apiDeleteProject(id);
  return res.data;
};

// Profile
export const updateProfile = async (data) => {
  const res = await apiUpdateProfile(data);
  return res.data;
};

// Certifications
export const createCertification = async (data) => {
  const res = await apiCreateCertification(data);
  return res.data;
};

export const updateCertification = async (id, data) => {
  const res = await apiUpdateCertification(id, data);
  return res.data;
};

export const deleteCertification = async (id) => {
  const res = await apiDeleteCertification(id);
  return res.data;
};

// Repositories
export const createRepository = async (data) => {
  const res = await apiCreateRepository(data);
  return res.data;
};

export const updateRepository = async (id, data) => {
  const res = await apiUpdateRepository(id, data);
  return res.data;
};

export const deleteRepository = async (id) => {
  const res = await apiDeleteRepository(id);
  return res.data;
};

// Reports
export const createReport = async (data) => {
  const res = await apiCreateReport(data);
  return res.data;
};

export const updateReport = async (id, data) => {
  const res = await apiUpdateReport(id, data);
  return res.data;
};

export const deleteReport = async (id) => {
  const res = await apiDeleteReport(id);
  return res.data;
};

// Default profile fallback
const defaultProfile = {
  name: "Gaurav Tiwari",
  role: "DevOps / Cloud / Cybersecurity Engineer",
  email: "gaurav.tiwari@example.com",
  github: "https://github.com/gauravhannaa",
  linkedin: "https://linkedin.com/in/gaurav-tiwari",
  instagram: "https://instagram.com/mrx_gaurav__007",
  availability: "Available for opportunities",
  bio: "DevOps Engineer with 2+ years experience in IT infrastructure..."
};

// Export getters (will be updated after fetch)
export let skills = cachedData.skills;
export let experiences = cachedData.experiences;
export let projects = cachedData.projects;
export let profile = cachedData.profile || defaultProfile;
export let certifications = cachedData.certifications;
export let repositories = cachedData.repositories;
export let reports = cachedData.reports;