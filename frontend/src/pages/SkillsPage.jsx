import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSkills } from '../api';
import { motion } from 'framer-motion';

// Fallback skills data (your table content)
const defaultSkills = [
  {
    category: "💻 Technical Skills",
    items: [
      "Computer Networking (TCP/IP, DNS, DHCP, LAN/WAN)",
      "Network Troubleshooting",
      "Desktop & Hardware Troubleshooting",
      "Windows 10/11 Troubleshooting",
      "Linux Basics",
      "MS Office & Outlook",
      "Ticketing & CRM Tools (ServiceNow, Freshdesk)",
      "Python Programming",
      "SQL (Database Queries)",
      "Digital Forensics (Autopsy, FTK)",
      "Basic Cybersecurity",
      "System Monitoring"
    ]
  },
  {
    category: "🌐 Networking & IT Support",
    items: [
      "IP Configuration",
      "Router/Switch Basics",
      "Network Issue Diagnosis",
      "Remote Desktop Support",
      "VPN Setup & Troubleshooting"
    ]
  },
  {
    category: "🛠️ Tools & Platforms",
    items: [
      "Windows OS",
      "Linux OS",
      "Microsoft Office Suite",
      "Outlook",
      "Service Desk Tools",
      "CRM Systems"
    ]
  },
  {
    category: "🔐 Cybersecurity & Forensics",
    items: [
      "Digital Forensics Analysis",
      "Log Analysis",
      "Threat Detection Basics",
      "Data Recovery",
      "Evidence Handling"
    ]
  },
  {
    category: "📊 Soft Skills",
    items: [
      "Communication Skills",
      "Problem-Solving",
      "Teamwork",
      "Time Management",
      "Adaptability",
      "Customer Handling",
      "Analytical Thinking"
    ]
  },
  {
    category: "🚀 Professional Skills",
    items: [
      "Incident Management",
      "Ticket Handling",
      "Documentation",
      "Technical Support",
      "Troubleshooting Approach",
      "Quick Learning Ability"
    ]
  }
];

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useDefault, setUseDefault] = useState(false);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await fetchSkills();
        if (res.data && res.data.length > 0) {
          // If backend has skills, we can optionally group them by category.
          // For simplicity, we'll still use the default structured display,
          // but you could map backend data to categories.
          setSkills(res.data);
          setUseDefault(false);
        } else {
          setUseDefault(true);
        }
      } catch (err) {
        console.error("Error loading skills from API, using default data", err);
        setUseDefault(true);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <div className="text-green-400 text-xl animate-pulse">Loading skills matrix...</div>
      </div>
    );
  }

  // If we are using default structured data
  if (useDefault) {
    return (
      <div className="min-h-screen bg-black/80 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-green-400 hover:underline flex items-center gap-2 transition-colors font-mono"
          >
            ← Back to Terminal
          </button>

          {/* Header */}
          <div className="glass-card p-6 rounded-lg border border-green-500/30 mb-8">
            <h1 className="text-4xl font-bold text-green-400 glow-text mb-2">⚡ Skills Matrix</h1>
            <p className="text-gray-400 font-mono">> Displaying categorized skill inventory</p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultSkills.map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-5 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-green-400 mb-3 border-b border-green-500/30 pb-2">
                  {group.category}
                </h2>
                <ul className="space-y-2">
                  {group.items.map((skill, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-green-500">›</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Terminal footer */}
          <div className="mt-12 pt-4 border-t border-green-500/20 text-center text-xs text-gray-500 font-mono">
            <span className="text-green-400">$</span> skills --list --categories | wc -l
          </div>
        </div>
      </div>
    );
  }

  // If using backend data (fallback simple list)
  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-6 text-green-400 hover:underline">← Back to Terminal</button>
        <div className="glass-card p-6 rounded-lg border border-green-500/30 mb-8">
          <h1 className="text-4xl font-bold text-green-400 glow-text mb-2">⚡ Skills</h1>
          <p className="text-gray-400 font-mono">> Fetched from your profile database</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <motion.div key={skill._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="glass-card p-4 border border-green-500/30 rounded-lg">
              <div className="flex justify-between"><span className="font-bold text-green-400">{skill.name}</span><span className="text-gray-400">{skill.percentage}%</span></div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${skill.percentage}%` }} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;