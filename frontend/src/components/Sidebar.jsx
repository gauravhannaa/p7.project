import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, FolderGit2, Database, User, BarChart3, Award, Briefcase, Mail, FileText, Sun, Moon, Copy } from "lucide-react";
import { profile } from "../data/portfolioData";
import { toast } from "react-hot-toast";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toast.success("Email copied to clipboard!");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: FolderGit2 },
    { name: "Repositories", path: "/repositories", icon: Database },
    { name: "About", path: "/about", icon: User },
    { name: "GitHub Stats", path: "/stats", icon: BarChart3 },
    { name: "Certifications", path: "/certifications", icon: Award },
    { name: "Experience", path: "/experience", icon: Briefcase },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Resume", path: "/resume", icon: FileText },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-black/80 backdrop-blur-sm border-r border-neon/30 z-40 flex flex-col p-4"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-neon flex items-center justify-center mb-3">
          <span className="text-4xl">👨‍💻</span>
        </div>
        <h2 className="text-xl font-bold text-neon">{profile.name}</h2>
        <p className="text-xs text-neon/70">{profile.role}</p>
        <div className="mt-1 px-2 py-0.5 border border-neon/50 rounded-full text-[10px]">Verified ✅</div>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 mb-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-neon/20 text-neon border-l-2 border-neon"
                  : "text-gray-400 hover:text-neon hover:bg-neon/10"
              }`
            }
          >
            <item.icon size={18} />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm border border-neon/30 rounded-md hover:bg-neon/10 transition"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={copyEmail}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm border border-neon/30 rounded-md hover:bg-neon/10 transition"
        >
          <Copy size={16} /> Copy Email
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;