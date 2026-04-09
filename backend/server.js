import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { createDefaultAdmin } from './controllers/authController.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Import models for seeding
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import Report from './models/Report.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// Create default admin user
createDefaultAdmin();

// Seed resume data (only if collections are empty)
async function seedResumeData() {
  try {
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

    // ----- SKILLS -----
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        { name: "Windows 10/11 Troubleshooting", percentage: 85, category: "Technical" },
        { name: "Linux", percentage: 70, category: "Technical" },
        { name: "Customer & Technical Support (L1/L2)", percentage: 90, category: "Support" },
        { name: "Networking (TCP/IP, DNS, DHCP, VPN)", percentage: 75, category: "Networking" },
        { name: "Python", percentage: 65, category: "Programming" },
        { name: "SQL", percentage: 70, category: "Database" },
        { name: "MS Office & Outlook", percentage: 85, category: "Productivity" },
        { name: "Ticketing & CRM Tools", percentage: 80, category: "Tools" }
      ]);
      console.log("✅ Seeded skills from resume");
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
  } catch (error) {
    console.error("Error seeding resume data:", error);
  }
}

// Run seeding after database connection and admin creation
(async () => {
  await seedResumeData();
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/contact', contactRoutes);

// Serve admin dashboard static files
app.use('/admin-dashboard', express.static(path.join(__dirname, '../admin-dashboard')));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Cyber Security Portfolio API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});