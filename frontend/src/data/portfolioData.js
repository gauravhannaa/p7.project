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

// ================= ✅ DEFAULT EXPERIENCES (ADDED) =================
const defaultExperiences = [
  {
    id: 1,
    role: "Tech Support Engineer (L1 / L2)",
    company: "Starlink Communication Pvt. Ltd.",
    location: "Gurgaon (Client: Maruti Suzuki India Ltd.)",
    duration: "Nov 2025 – Present",

    description:
      "Delivering enterprise-level IT support and ensuring system availability for a large-scale automotive environment.",

    highlights: [
      "L1/L2 technical & desktop support (remote + onsite)",
      "Windows 10/11 troubleshooting (login, crash, performance)",
      "MS Outlook (OST/PST, profiles) & Office support",
      "LAN/Wi-Fi, DNS, DHCP, TCP/IP issue resolution",
      "Incident management via CRM tools (SLA based)",
      "Hardware troubleshooting (PCs, printers, scanners)",
      "Software installation, patches & security updates",
      "Onsite IT support at Maruti Suzuki",
      "System optimization & downtime reduction"
    ]
  },
  {
    id: 2,
    role: "IT Support Trainee",
    company: "APMP MOTOR LLP",
    location: "Manesar, Gurgaon",
    duration: "Aug 2025 – Nov 2025",

    description:
      "Gained hands-on experience in IT support, troubleshooting, and enterprise system environments.",

    highlights: [
      "Basic desktop & system troubleshooting",
      "Software installation & configuration",
      "Networking fundamentals",
      "Worked with IT team on real-world issues"
    ]
  }
];

// ================= DEFAULT PROJECTS =================
const defaultProjects = [
  {
    id: 1,
    title: "🚀 DevOps / Cybersecurity Portfolio Web App",
    tech: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
    description: "Modern DevOps portfolio with hacker UI",
    highlights: ["Terminal UI", "GitHub integration", "Responsive"],
    purpose: "Frontend + DevOps showcase",
    liveLink: "https://gauravhanna-spy.onrender.com/",
    github: "https://github.com/gauravhannaa/portfolio"
  },
  {
    id: 2,
    title: "📱 Android Surveillance & Monitoring Application",
    tech: ["Kotlin", "Android SDK", "OkHttp"],
    description: "Real-time monitoring Android app",
    highlights: ["GPS tracking", "Secure API", "Background service"],
    purpose: "Android + Security project",
    liveLink: "#",
    github: "https://github.com/gauravhannaa/android-surveillance"
  }
];

// ================= CACHE =================
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

// Load cache
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

const saveToStorage = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  } catch (err) {
    console.error("⚠️ Cache save failed:", err);
  }
};

loadFromStorage();

// Safe fetch
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

// ================= FETCH =================
export const fetchSkillsData = () => safeFetch(apiFetchSkills, "skills");

// 🔥 UPDATED EXPERIENCE FETCH WITH FALLBACK
export const fetchExperiencesData = async () => {
  const data = await safeFetch(apiFetchExperiences, "experiences");

  if (!data || data.length === 0) {
    console.warn("⚠️ Using default experience data");
    return defaultExperiences;
  }

  return data.sort(
    (a, b) =>
      new Date(b.startDate || 0) - new Date(a.startDate || 0)
  );
};

// Projects
export const fetchProjectsData = async () => {
  const data = await safeFetch(apiFetchProjects, "projects");

  if (!data || data.length === 0) {
    return defaultProjects;
  }

  return data;
};

export const fetchProfileData = async () => {
  const data = await safeFetch(apiFetchProfile, "profile");
  return data || defaultProfile;
};

// ================= EXPORT =================
export let skills = cachedData.skills;

export let experiences =
  cachedData.experiences && cachedData.experiences.length > 0
    ? cachedData.experiences
    : defaultExperiences;

export let projects =
  cachedData.projects && cachedData.projects.length > 0
    ? cachedData.projects
    : defaultProjects;

export let profile = cachedData.profile || defaultProfile;
export let certifications = cachedData.certifications;
export let repositories = cachedData.repositories;
export let reports = cachedData.reports;