import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSkills } from '../api';
import { motion } from 'framer-motion';

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ DEFAULT SKILLS (FALLBACK DATA ADDED)
  const TechSkills = [
    // Technical
    { name: "Computer Networking (TCP/IP, DNS, DHCP, LAN/WAN)", category: "💻 Technical Skills" },
    { name: "Network Troubleshooting", category: "💻 Technical Skills" },
    { name: "Desktop & Hardware Troubleshooting", category: "💻 Technical Skills" },
    { name: "Windows 10/11 Troubleshooting", category: "💻 Technical Skills" },
    { name: "Linux Basics", category: "💻 Technical Skills" },
    { name: "MS Office & Outlook", category: "💻 Technical Skills" },
    { name: "Ticketing & CRM Tools (ServiceNow, Freshdesk)", category: "💻 Technical Skills" },
    { name: "Python Programming", category: "💻 Technical Skills" },
    { name: "SQL (Database Queries)", category: "💻 Technical Skills" },
    { name: "Digital Forensics (Autopsy, FTK)", category: "💻 Technical Skills" },
    { name: "Basic Cybersecurity", category: "💻 Technical Skills" },
    { name: "System Monitoring", category: "💻 Technical Skills" },

    // Networking
    { name: "IP Configuration", category: "🌐 Networking & IT Support" },
    { name: "Router/Switch Basics", category: "🌐 Networking & IT Support" },
    { name: "Network Issue Diagnosis", category: "🌐 Networking & IT Support" },
    { name: "Remote Desktop Support", category: "🌐 Networking & IT Support" },
    { name: "VPN Setup & Troubleshooting", category: "🌐 Networking & IT Support" },

    // Tools
    { name: "Windows OS", category: "🛠️ Tools & Platforms" },
    { name: "Linux OS", category: "🛠️ Tools & Platforms" },
    { name: "Microsoft Office Suite", category: "🛠️ Tools & Platforms" },
    { name: "Outlook", category: "🛠️ Tools & Platforms" },
    { name: "Service Desk Tools", category: "🛠️ Tools & Platforms" },
    { name: "CRM Systems", category: "🛠️ Tools & Platforms" },

    // Cyber
    { name: "Digital Forensics Analysis", category: "🔐 Cybersecurity & Forensics" },
    { name: "Log Analysis", category: "🔐 Cybersecurity & Forensics" },
    { name: "Threat Detection Basics", category: "🔐 Cybersecurity & Forensics" },
    { name: "Data Recovery", category: "🔐 Cybersecurity & Forensics" },
    { name: "Evidence Handling", category: "🔐 Cybersecurity & Forensics" },

    // Soft
    { name: "Communication Skills", category: "📊 Soft Skills" },
    { name: "Problem-Solving", category: "📊 Soft Skills" },
    { name: "Teamwork", category: "📊 Soft Skills" },
    { name: "Time Management", category: "📊 Soft Skills" },
    { name: "Adaptability", category: "📊 Soft Skills" },
    { name: "Customer Handling", category: "📊 Soft Skills" },
    { name: "Analytical Thinking", category: "📊 Soft Skills" },

    // Professional
    { name: "Incident Management", category: "🚀 Professional Skills" },
    { name: "Ticket Handling", category: "🚀 Professional Skills" },
    { name: "Documentation", category: "🚀 Professional Skills" },
    { name: "Technical Support", category: "🚀 Professional Skills" },
    { name: "Troubleshooting Approach", category: "🚀 Professional Skills" },
    { name: "Quick Learning Ability", category: "🚀 Professional Skills" }
  ];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await fetchSkills();

        // 🔥 API fallback logic
        if (!res.data || res.data.length === 0) {
          console.warn("⚠️ Using default skills");
          setSkills(defaultSkills);
        } else {
          setSkills(res.data);
        }

      } catch (err) {
        console.error('Error loading skills:', err);
        setError('Failed to load skills. Using fallback data.');
        setSkills(defaultSkills); // fallback
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  // Group skills
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {});

  // ================= UI =================

  if (loading) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <div className="text-green-400 text-xl animate-pulse">
          Loading skills matrix...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate('/')}
          className="mb-6 text-green-400 hover:underline flex items-center gap-2 font-mono"
        >
          ← Back to Terminal
        </button>

        {/* Header */}
        <div className="glass-card p-6 border border-green-500/30 mb-8">
          <h1 className="text-4xl font-bold text-green-400">⚡ Skills Matrix</h1>
          <p className="text-gray-400 font-mono">
            &gt; categorized professional skill inventory
          </p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 border border-green-500/30 hover:border-green-500/60"
            >
              <h2 className="text-xl text-green-400 mb-3 border-b border-green-500/30 pb-2">
                {category}
              </h2>

              <ul className="space-y-2">
                {items.map((skill, i) => (
                  <li key={i} className="text-gray-300 text-sm flex gap-2">
                    <span className="text-green-500">›</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500 font-mono">
          <span className="text-green-400">$</span> skills --load --secure ✔
        </div>

      </div>
    </div>
  );
};

export default SkillsPage;