import {
  fetchSkills as apiFetchSkills,
  fetchExperiences as apiFetchExperiences,
  fetchProjects as apiFetchProjects,
  fetchProfile as apiFetchProfile,
  fetchCertifications as apiFetchCertifications,
  fetchRepositories as apiFetchRepositories,
  fetchReports as apiFetchReports,
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

// Update exports when data changes
const updateExports = () => {
  skills = cachedData.skills;
  experiences = cachedData.experiences;
  projects = cachedData.projects;
  profile = cachedData.profile || defaultProfile;
  certifications = cachedData.certifications;
  repositories = cachedData.repositories;
  reports = cachedData.reports;
};

// Override save to update exports
const originalSave = saveToStorage;
window.saveToStorage = () => {
  originalSave();
  updateExports();
};