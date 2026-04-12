import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, FolderGit2, Database, User, BarChart3, Award, 
  Briefcase, Mail, FileText, Sun, Moon, Copy, Shield, 
  Zap, BookOpen, Code, Cpu, Users, Activity, UserCircle, Settings
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAdmin } from "../context/AdminContext";
import { useEffect, useState } from "react";
import { fetchProfile } from "../api";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    loadProfile();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email || "gauravhanna2003@gmail.com");
    toast.success("📧 Email copied to clipboard!");
  };

  // Professional grouping of navigation items
  const navGroups = [
    {
      title: "Profile",
      items: [
        { name: "About", path: "/about", icon: User },
        { name: "Resume", path: "/resume", icon: FileText },
        { name: "Contact", path: "/contact", icon: Mail },
      ]
    },
    {
      title: "Work",
      items: [
        { name: "Experience", path: "/experience", icon: Briefcase },
        { name: "Projects", path: "/projects", icon: FolderGit2 },
        { name: "Repositories", path: "/repositories", icon: Database },
      ]
    },
    {
      title: "Skills & Credentials",
      items: [
        { name: "Skills", path: "/skills", icon: Zap },
        { name: "Certifications", path: "/certifications", icon: Award },
        { name: "Reports", path: "/reports", icon: FileText },
      ]
    },
    {
      title: "Analytics",
      items: [
        { name: "GitHub Stats", path: "/stats", icon: BarChart3 },
      ]
    }
  ];

  return (
    <motion.aside
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-72 bg-black/90 backdrop-blur-xl border-r border-neon/40 z-40 flex flex-col shadow-2xl shadow-neon/10"
    >
      {/* Profile Section with Glow */}
      <div className="flex flex-col items-center py-6 px-4 border-b border-neon/30">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-neon flex items-center justify-center bg-black/50 shadow-lg shadow-neon/20">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl">👨‍💻</span>
            )}
          </div>
          {isAdmin && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
              <Shield size={12} className="text-black" />
            </div>
          )}
        </div>
        <h2 className="text-lg font-bold text-neon mt-3 tracking-wider">{profile.name || "Gaurav Tiwari"}</h2>
        <p className="text-[11px] text-neon/70 text-center mt-1 px-2">{profile.title || "Security & DevOps Engineer"}</p>
        <div className="mt-2 px-2 py-0.5 border border-neon/50 rounded-full text-[9px] bg-neon/5">
          🔐 Verified Secure
        </div>
      </div>

      {/* Navigation Links with Group Headers */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 px-2">
              {group.title}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 mb-1 rounded-md transition-all duration-200 group ${
                    isActive
                      ? "bg-neon/15 text-neon border-l-2 border-neon"
                      : "text-gray-400 hover:text-neon hover:bg-neon/5"
                  }`
                }
              >
                <item.icon size={16} className="group-hover:scale-105 transition-transform" />
                <span className="text-xs font-mono tracking-wide">{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-neon/30 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs border border-neon/40 rounded-md hover:bg-neon/10 transition-all hover:shadow-neon/20 hover:shadow-md"
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={copyEmail}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs border border-neon/40 rounded-md hover:bg-neon/10 transition-all hover:shadow-neon/20 hover:shadow-md"
        >
          <Copy size={14} /> Copy Email
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;