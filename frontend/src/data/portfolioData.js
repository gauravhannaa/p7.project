import {
  fetchSkills as apiFetchSkills,
  fetchExperiences as apiFetchExperiences,
  fetchProjects as apiFetchProjects,
  fetchProfile as apiFetchProfile,
  fetchCertifications as apiFetchCertifications,
  fetchRepositories as apiFetchRepositories,
  fetchReports as apiFetchReports,

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

// ================= DEFAULT PROJECTS (ADDED) =================
const defaultProjects = [
  {
    id: 1,
    title: "🚀 DevOps / Cybersecurity Portfolio Web App",
    tech: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
    description:
      "A modern DevOps-focused portfolio web application featuring a terminal-style hacker UI. Designed to showcase projects, repositories, and analytics with strong performance.",
    highlights: [
      "Terminal-style hacker UI",
      "Dynamic sections",
      "GitHub integration",
      "Responsive design",
      "Fast performance using Vite"
    ],
    purpose:
      "To demonstrate frontend development, DevOps concepts, and UI/UX optimization.",
    liveLink: "https://gauravhanna-spy.onrender.com/",
    github: "https://github.com/gauravhannaa/portfolio"
  },
  {
    id: 2,
    title: "📱 Android Surveillance & Monitoring Application",
    tech: ["Kotlin", "Android SDK", "OkHttp", "JSON APIs"],
    description:
      "Android-based monitoring system to track device activity and securely transmit data.",
    highlights: [
      "Live GPS tracking",
      "Network monitoring",
      "Background services",
      "Secure API communication",
      "Remote logging"
    ],
    purpose:
      "To demonstrate Android development and secure real-time data handling.",
    liveLink: "#",
    github: "https://github.com/gauravhannaa/android-surveillance"
  }
];

// ================= CACHE SYSTEM =================
const CACHE_KEY = "portfolio_cache_v2";

let cachedData = {
  skills: [],
  experiences: [],
  projects: [],
  profile: null,
  certifications: [],
  repositories: [],
  reports: [],
};

// Load cache safely
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
      cachedData = { ...cachedData, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error("⚠️ Cache load failed:", err);
  }
};

// Save cache safely
const saveToStorage = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  } catch (err) {
    console.error("⚠️ Cache save failed:", err);
  }
};

loadFromStorage();

// Generic safe fetch wrapper
const safeFetch = async (apiCall, key) => {
  try {
    const res = await apiCall();
    cachedData[key] = res.data;
    saveToStorage();
    return res.data;
  } catch (error) {
    console.error(`❌ Fetch error (${key}):`, error);
    return cachedData[key];
  }
};

// ================= FETCH FUNCTIONS =================
export const fetchSkillsData = () => safeFetch(apiFetchSkills, "skills");

export const fetchExperiencesData = async () => {
  const data = await safeFetch(apiFetchExperiences, "experiences");

  return data.sort(
    (a, b) =>
      new Date(b.startDate || 0) - new Date(a.startDate || 0)
  );
};

// 🔥 UPDATED PROJECT FETCH WITH FALLBACK
export const fetchProjectsData = async () => {
  const data = await safeFetch(apiFetchProjects, "projects");

  if (!data || data.length === 0) {
    console.warn("⚠️ Using default project data");
    return defaultProjects;
  }

  return data;
};

export const fetchProfileData = async () => {
  const data = await safeFetch(apiFetchProfile, "profile");
  return data || defaultProfile;
};

export const fetchCertificationsData = () =>
  safeFetch(apiFetchCertifications, "certifications");

export const fetchRepositoriesData = () =>
  safeFetch(apiFetchRepositories, "repositories");

export const fetchReportsData = () =>
  safeFetch(apiFetchReports, "reports");

// ================= ADMIN FUNCTIONS =================
const updateCacheAfterCRUD = async (fetchFn, key) => {
  const updated = await fetchFn();
  cachedData[key] = updated;
  saveToStorage();
};

// Skills
export const createSkill = async (data) => {
  const res = await apiCreateSkill(data);
  await updateCacheAfterCRUD(fetchSkillsData, "skills");
  return res.data;
};

export const updateSkill = async (id, data) => {
  const res = await apiUpdateSkill(id, data);
  await updateCacheAfterCRUD(fetchSkillsData, "skills");
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await apiDeleteSkill(id);
  await updateCacheAfterCRUD(fetchSkillsData, "skills");
  return res.data;
};

// Experiences
export const createExperience = async (data) => {
  const res = await apiCreateExperience(data);
  await updateCacheAfterCRUD(fetchExperiencesData, "experiences");
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await apiUpdateExperience(id, data);
  await updateCacheAfterCRUD(fetchExperiencesData, "experiences");
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await apiDeleteExperience(id);
  await updateCacheAfterCRUD(fetchExperiencesData, "experiences");
  return res.data;
};

// Projects
export const createProject = async (data) => {
  const res = await apiCreateProject(data);
  await updateCacheAfterCRUD(fetchProjectsData, "projects");
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await apiUpdateProject(id, data);
  await updateCacheAfterCRUD(fetchProjectsData, "projects");
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await apiDeleteProject(id);
  await updateCacheAfterCRUD(fetchProjectsData, "projects");
  return res.data;
};

// Profile
export const updateProfile = async (data) => {
  const res = await apiUpdateProfile(data);
  await updateCacheAfterCRUD(fetchProfileData, "profile");
  return res.data;
};

// Certifications
export const createCertification = async (data) => {
  const res = await apiCreateCertification(data);
  await updateCacheAfterCRUD(fetchCertificationsData, "certifications");
  return res.data;
};

export const updateCertification = async (id, data) => {
  const res = await apiUpdateCertification(id, data);
  await updateCacheAfterCRUD(fetchCertificationsData, "certifications");
  return res.data;
};

export const deleteCertification = async (id) => {
  const res = await apiDeleteCertification(id);
  await updateCacheAfterCRUD(fetchCertificationsData, "certifications");
  return res.data;
};

// Repositories
export const createRepository = async (data) => {
  const res = await apiCreateRepository(data);
  await updateCacheAfterCRUD(fetchRepositoriesData, "repositories");
  return res.data;
};

export const updateRepository = async (id, data) => {
  const res = await apiUpdateRepository(id, data);
  await updateCacheAfterCRUD(fetchRepositoriesData, "repositories");
  return res.data;
};

export const deleteRepository = async (id) => {
  const res = await apiDeleteRepository(id);
  await updateCacheAfterCRUD(fetchRepositoriesData, "repositories");
  return res.data;
};

// Reports
export const createReport = async (data) => {
  const res = await apiCreateReport(data);
  await updateCacheAfterCRUD(fetchReportsData, "reports");
  return res.data;
};

export const updateReport = async (id, data) => {
  const res = await apiUpdateReport(id, data);
  await updateCacheAfterCRUD(fetchReportsData, "reports");
  return res.data;
};

export const deleteReport = async (id) => {
  const res = await apiDeleteReport(id);
  await updateCacheAfterCRUD(fetchReportsData, "reports");
  return res.data;
};

// ================= DEFAULT PROFILE =================
const defaultProfile = {
  name: "Gaurav Tiwari",
  role: "Tech Support Engineer | Cyber Security Enthusiast",
  email: "your-email@example.com",
  github: "https://github.com/gauravhannaa",
  linkedin: "https://linkedin.com/in/gaurav-tiwari",
  instagram: "https://instagram.com/mrx_gaurav__007",
  facebook: "https://www.facebook.com/Gauravhanna",
  availability: "Open to Remote Opportunities",
  bio: "Tech Support Engineer with expertise in system troubleshooting, network security, and enterprise IT support."
};

// ================= EXPORT =================
export let skills = cachedData.skills;
export let experiences = cachedData.experiences;
export let projects =
  cachedData.projects && cachedData.projects.length > 0
    ? cachedData.projects
    : defaultProjects;

export let profile = cachedData.profile || defaultProfile;
export let certifications = cachedData.certifications;
export let repositories = cachedData.repositories;
export let reports = cachedData.reports;