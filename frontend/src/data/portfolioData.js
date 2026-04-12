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
  email: "gauravhanna2003@gmail.com",
  github: "https://github.com/gauravhannaa",
  linkedin: "https://linkedin.com/in/gaurav-tiwari",
  instagram: "https://instagram.com/mrx_gaurav__007",
  facebook: "https://www.facebook.com/Gauravhanna",
  availability: "Open to Remote Opportunities",
  bio: "Tech Support Engineer with expertise in system troubleshooting, network security, and enterprise IT support."
};

// ================= DEFAULT EXPERIENCES (Your two jobs) =================
const defaultExperiences = [
  {
    id: 1,
    role: "Customer & Technical Support Engineer (L1/L2)",
    company: "Starlink Communication Pvt. Ltd.",
    location: "Client: Maruti Suzuki India Ltd., Gurgaon",
    startDate: "Nov 2025",
    endDate: null,
    isCurrent: true,
    responsibilities: [
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
    role: "Technical Support Executive",
    company: "APMP MOTOR LLP",
    location: "Manesar, Gurgaon",
    startDate: "Aug 2025",
    endDate: "Nov 2025",
    isCurrent: false,
    responsibilities: [
      "Basic desktop & system troubleshooting",
      "Software installation & configuration",
      "Networking fundamentals",
      "Worked with IT team on real-world issues"
    ]
  }
];

// ================= DEFAULT SKILLS (Your full categorized table) =================
const defaultSkills = [
  // 💻 Technical Skills
  { name: "Computer Networking (TCP/IP, DNS, DHCP, LAN/WAN)", percentage: 85, category: "💻 Technical Skills" },
  { name: "Network Troubleshooting", percentage: 80, category: "💻 Technical Skills" },
  { name: "Desktop & Hardware Troubleshooting", percentage: 90, category: "💻 Technical Skills" },
  { name: "Windows 10/11 Troubleshooting", percentage: 85, category: "💻 Technical Skills" },
  { name: "Linux Basics", percentage: 70, category: "💻 Technical Skills" },
  { name: "MS Office & Outlook", percentage: 85, category: "💻 Technical Skills" },
  { name: "Ticketing & CRM Tools (ServiceNow, Freshdesk)", percentage: 80, category: "💻 Technical Skills" },
  { name: "Python Programming", percentage: 65, category: "💻 Technical Skills" },
  { name: "SQL (Database Queries)", percentage: 70, category: "💻 Technical Skills" },
  { name: "Digital Forensics (Autopsy, FTK)", percentage: 60, category: "💻 Technical Skills" },
  { name: "Basic Cybersecurity", percentage: 75, category: "💻 Technical Skills" },
  { name: "System Monitoring", percentage: 70, category: "💻 Technical Skills" },
  // 🌐 Networking & IT Support
  { name: "IP Configuration", percentage: 80, category: "🌐 Networking & IT Support" },
  { name: "Router/Switch Basics", percentage: 75, category: "🌐 Networking & IT Support" },
  { name: "Network Issue Diagnosis", percentage: 85, category: "🌐 Networking & IT Support" },
  { name: "Remote Desktop Support", percentage: 90, category: "🌐 Networking & IT Support" },
  { name: "VPN Setup & Troubleshooting", percentage: 80, category: "🌐 Networking & IT Support" },
  // 🛠️ Tools & Platforms
  { name: "Windows OS", percentage: 90, category: "🛠️ Tools & Platforms" },
  { name: "Linux OS", percentage: 75, category: "🛠️ Tools & Platforms" },
  { name: "Microsoft Office Suite", percentage: 85, category: "🛠️ Tools & Platforms" },
  { name: "Outlook", percentage: 85, category: "🛠️ Tools & Platforms" },
  { name: "Service Desk Tools", percentage: 80, category: "🛠️ Tools & Platforms" },
  { name: "CRM Systems", percentage: 75, category: "🛠️ Tools & Platforms" },
  // 🔐 Cybersecurity & Forensics
  { name: "Digital Forensics Analysis", percentage: 60, category: "🔐 Cybersecurity & Forensics" },
  { name: "Log Analysis", percentage: 65, category: "🔐 Cybersecurity & Forensics" },
  { name: "Threat Detection Basics", percentage: 70, category: "🔐 Cybersecurity & Forensics" },
  { name: "Data Recovery", percentage: 55, category: "🔐 Cybersecurity & Forensics" },
  { name: "Evidence Handling", percentage: 60, category: "🔐 Cybersecurity & Forensics" },
  // 📊 Soft Skills
  { name: "Communication Skills", percentage: 90, category: "📊 Soft Skills" },
  { name: "Problem-Solving", percentage: 85, category: "📊 Soft Skills" },
  { name: "Teamwork", percentage: 85, category: "📊 Soft Skills" },
  { name: "Time Management", percentage: 80, category: "📊 Soft Skills" },
  { name: "Adaptability", percentage: 85, category: "📊 Soft Skills" },
  { name: "Customer Handling", percentage: 95, category: "📊 Soft Skills" },
  { name: "Analytical Thinking", percentage: 80, category: "📊 Soft Skills" },
  // 🚀 Professional Skills
  { name: "Incident Management", percentage: 80, category: "🚀 Professional Skills" },
  { name: "Ticket Handling", percentage: 85, category: "🚀 Professional Skills" },
  { name: "Documentation", percentage: 80, category: "🚀 Professional Skills" },
  { name: "Technical Support", percentage: 90, category: "🚀 Professional Skills" },
  { name: "Troubleshooting Approach", percentage: 90, category: "🚀 Professional Skills" },
  { name: "Quick Learning Ability", percentage: 85, category: "🚀 Professional Skills" },
];

// ================= DEFAULT PROJECTS =================
const defaultProjects = [
  {
    id: 1,
    title: "🚀 DevOps / Cybersecurity Portfolio Web App",
    tech: ["React.js", "Vite", "Tailwind CSS", "JavaScript"],
    description: "Modern DevOps portfolio with hacker terminal UI",
    highlights: ["Terminal UI", "GitHub integration", "Responsive design"],
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

const safeFetch = async (apiCall, key, fallbackData = null) => {
  try {
    const res = await apiCall();
    const data = res.data;
    if (data && (Array.isArray(data) ? data.length > 0 : true)) {
      cachedData[key] = data;
      saveToStorage();
      return data;
    } else {
      // If API returns empty, use fallback
      if (fallbackData) return fallbackData;
      return cachedData[key] || fallbackData;
    }
  } catch (error) {
    console.error(`❌ Fetch error (${key}):`, error);
    // Return fallback if provided, else cached
    return fallbackData || cachedData[key];
  }
};

// ================= FETCH FUNCTIONS (with fallbacks) =================
export const fetchSkillsData = () => safeFetch(apiFetchSkills, "skills", defaultSkills);

export const fetchExperiencesData = async () => {
  const data = await safeFetch(apiFetchExperiences, "experiences", defaultExperiences);
  // Sort by startDate descending
  return data.sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0));
};

export const fetchProjectsData = () => safeFetch(apiFetchProjects, "projects", defaultProjects);

export const fetchProfileData = () => safeFetch(apiFetchProfile, "profile", defaultProfile);

export const fetchCertificationsData = () => safeFetch(apiFetchCertifications, "certifications", []);

export const fetchRepositoriesData = () => safeFetch(apiFetchRepositories, "repositories", []);

export const fetchReportsData = () => safeFetch(apiFetchReports, "reports", []);

// ================= ADMIN FUNCTIONS (unchanged) =================
const updateCacheAfterCRUD = async (fetchFn, key) => {
  const updated = await fetchFn();
  cachedData[key] = updated;
  saveToStorage();
};

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

export const updateProfile = async (data) => {
  const res = await apiUpdateProfile(data);
  await updateCacheAfterCRUD(fetchProfileData, "profile");
  return res.data;
};

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

// ================= EXPORT DEFAULT DATA FOR DIRECT USE =================
export let skills = cachedData.skills.length ? cachedData.skills : defaultSkills;
export let experiences = cachedData.experiences.length ? cachedData.experiences : defaultExperiences;
export let projects = cachedData.projects.length ? cachedData.projects : defaultProjects;
export let profile = cachedData.profile || defaultProfile;
export let certifications = cachedData.certifications;
export let repositories = cachedData.repositories;
export let reports = cachedData.reports;