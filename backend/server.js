import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { createDefaultAdmin } from './controllers/authController.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import repositoryRoutes from './routes/repositoryRoutes.js';

// Models for seeding
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import Report from './models/Report.js';
import Profile from './models/Profile.js';
import Certification from './models/Certification.js';
import Repository from './models/Repository.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB().catch(err => console.error('MongoDB connection error:', err));

// Create default admin user (with fallback values)
createDefaultAdmin();

// ---------------------- SEEDING FUNCTION ----------------------
async function seedResumeData() {
  try {
    // ----- PROFILE -----
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: "Gaurav Tiwari",
        username: "gauravhanna",
        title: "Customer & Technical Support Engineer | DevOps Enthusiast",
        bio: "Hands-on experience in L1/L2 desktop support, Windows troubleshooting, onsite IT operations at Maruti Suzuki India Ltd. Passionate about cloud, automation, and cybersecurity.",
        location: "Gurgaon, India",
        email: "gauravhanna2003@gmail.com",
        phone: "+91 9664609473",
        github: "https://github.com/gauravhannaa",
        linkedin: "https://linkedin.com/in/gaurav-tiwari",
        instagram: "https://instagram.com/mrx_gaurav__007",
        profileImage: "",
        resumeUrl: "",
      });
      console.log("✅ Seeded default profile");
    }

    // ----- EXPERIENCE -----
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          company: "Starlink Communication Pvt. Ltd.",
          role: "Customer & Technical Support Engineer",
          startDate: "Nov 2025",
          endDate: null,
          isCurrent: true,
          responsibilities: [
            "Providing L1/L2 customer, technical & desktop support via phone, email, remote tools, and onsite",
            "Troubleshooting software, hardware, OS, application, and connectivity issues",
            "Logging, tracking, and resolving incidents using CRM/ticketing tools as per SLA",
            "Supporting Windows 10/11, MS Outlook, MS Office, LAN/Wi-Fi, TCP/IP, DNS, DHCP",
            "Performing hardware troubleshooting for desktops, laptops, printers, scanners",
            "Providing onsite IT support at Maruti Suzuki India Ltd., ensuring uninterrupted business operations"
          ]
        },
        {
          company: "APMP MOTOR LLP",
          role: "Technical Support Engineer",
          startDate: "Aug 2025",
          endDate: "Nov 2025",
          isCurrent: false,
          responsibilities: [
            "Handled L1/L2 desktop support and end-user assistance",
            "Resolved hardware/software issues and maintained IT asset records",
            "Assisted with software installation, configuration, and user guidance"
          ]
        }
      ]);
      console.log("✅ Seeded experience data from resume");
    }

    // ----- SKILLS (Full static table) -----
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const allSkills = [
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
      await Skill.insertMany(allSkills);
      console.log(`✅ Seeded ${allSkills.length} skills from full table`);
    }

    // ----- REPORTS (Certificates) -----
    const reportCount = await Report.countDocuments();
    if (reportCount === 0) {
      await Report.insertMany([
        {
          title: "Network Management and Web Development",
          description: "Certificate from Netcamp Pvt. Ltd.",
          pdfUrl: "#"
        },
        {
          title: "Android with Core Java Development",
          description: "Certificate from Netcamp Pvt. Ltd.",
          pdfUrl: "#"
        },
        {
          title: "Web Development C#",
          description: "Certificate from United Group of Institution",
          pdfUrl: "#"
        },
        {
          title: "Cyber Security Fundamental Course",
          description: "Certificate from IBM SkillBuild",
          pdfUrl: "#"
        },
        {
          title: "Advanced Software Engineering",
          description: "Certificate from Walmart Global Tech",
          pdfUrl: "#"
        }
      ]);
      console.log("✅ Seeded certificates as reports from resume");
    }

    // ----- CERTIFICATIONS (new model) -----
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany([
        {
          title: "AWS Certified Cloud Practitioner",
          issuer: "Amazon Web Services",
          date: "2023",
          credentialId: "AWS-CCP-12345",
          verifyUrl: "#"
        },
        {
          title: "Certified Kubernetes Administrator (CKA)",
          issuer: "CNCF",
          date: "In Progress",
          credentialId: "CKA-67890",
          verifyUrl: "#"
        }
      ]);
      console.log("✅ Seeded certifications");
    }

    // ----- REPOSITORIES -----
    const repoCount = await Repository.countDocuments();
    if (repoCount === 0) {
      await Repository.insertMany([
        {
          name: "k8s-deployment-tool",
          description: "CLI tool for deploying apps to Kubernetes",
          language: "Go",
          stars: 12,
          forks: 3,
          updated: "2025-01-15",
          url: "#"
        },
        {
          name: "aws-terraform-modules",
          description: "Reusable Terraform modules for AWS",
          language: "HCL",
          stars: 8,
          forks: 2,
          updated: "2025-02-01",
          url: "#"
        }
      ]);
      console.log("✅ Seeded repositories");
    }

  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Run seeding after DB connection (but don't block server startup)
setTimeout(() => {
  seedResumeData().catch(console.error);
}, 2000);

// ---------------------- MIDDLEWARE ----------------------
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for Base64 images

// Static files for uploads (create folder if missing)
const uploadsPath = path.join(__dirname, 'uploads');
import fs from 'fs';
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/uploads', express.static(uploadsPath));

// ---------------------- BASE64 PROFILE PHOTO UPLOAD (No Cloudinary) ----------------------
app.post('/api/upload/profile-base64', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ message: 'No image data' });

    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    profile.profileImage = imageBase64; // store full base64 string (data:image/...)
    await profile.save();
    res.json({ imageUrl: imageBase64, message: 'Photo uploaded successfully' });
  } catch (err) {
    console.error('Base64 upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- API ROUTES ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/repositories', repositoryRoutes);

// Serve admin dashboard static files (ensure the folder exists)
const adminDashboardPath = path.join(__dirname, '../admin-dashboard');
if (fs.existsSync(adminDashboardPath)) {
  app.use('/admin-dashboard', express.static(adminDashboardPath));
  console.log('✅ Admin dashboard served from', adminDashboardPath);
} else {
  console.log('⚠️ Admin dashboard folder not found at', adminDashboardPath);
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Cyber Security Portfolio API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// ---------------------- START SERVER ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});