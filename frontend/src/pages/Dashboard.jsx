import Layout from "../components/Layout";
import SkillCard from "../components/SkillCard";
import CommandTerminal from "../components/CommandTerminal";
import TypewriterText from "../components/TypewriterText";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchProfile, fetchSkills } from "../api";
import { 
  Code, Server, Shield, Terminal, Clock, Activity, 
  Award, Github, Users, FolderGit2, Cpu, Zap 
} from "lucide-react";

const Dashboard = () => {
  const canvasRef = useRef(null);
  const [github, setGithub] = useState(null);
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [uptime, setUptime] = useState(0);

  // Fetch profile and skills from API
  useEffect(() => {
    fetchProfile()
      .then(res => setProfile(res.data))
      .catch(console.error);
    fetchSkills()
      .then(res => setSkills(res.data))
      .catch(console.error);
  }, []);

  // GitHub API Fetch
  useEffect(() => {
    fetch("https://api.github.com/users/gauravhannaa")
      .then(res => res.json())
      .then(data => setGithub(data))
      .catch(console.error);
  }, []);

  // Fake uptime counter (just for show)
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Optimized Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let fontSize = 14;
    let columns, drops;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Format uptime
  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Stats data with icons
  const statsData = [
    { label: "Projects", value: 12, icon: FolderGit2, color: "text-blue-400" },
    { label: "Experience", value: "2+ Yr", icon: Briefcase, color: "text-yellow-400" },
    { label: "GitHub Repos", value: github?.public_repos || "...", icon: Github, color: "text-purple-400" },
    { label: "Followers", value: github?.followers || "...", icon: Users, color: "text-pink-400" },
  ];

  const certifications = [
    { name: "IBM Cyber Security", issuer: "IBM", year: "2024", icon: Shield },
    { name: "Accenture Simulation", issuer: "Accenture", year: "2023", icon: Code },
    { name: "Android Dev", issuer: "Google", year: "2024", icon: Cpu },
  ];

  return (
    <Layout>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
      />

      <div className="space-y-8">
        {/* HERO PANEL - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 border border-green-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <h1 className="text-2xl font-bold text-green-400 font-mono flex items-center gap-2">
            <Terminal size={24} />
            <TypewriterText text="> Booting Secure Dashboard..." delay={20} />
          </h1>
          <div className="mt-4 text-sm font-mono text-gray-300 space-y-1">
            <p>&gt; Name: <span className="text-green-400">{profile.name || "Gaurav Tiwari"}</span></p>
            <p>&gt; Role: <span className="text-cyan-400">Tech Support | Cyber Security</span></p>
            <p>&gt; Status: <span className="text-yellow-400 animate-pulse">{profile.availability || "Open to Opportunities"}</span></p>
            <p>&gt; Uptime: <span className="text-green-400">{formatUptime(uptime)}</span></p>
          </div>
        </motion.div>

        {/* LIVE STATS - Enhanced with icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-4 text-center border border-green-500/20 hover:border-green-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
            >
              <item.icon size={24} className={`mx-auto mb-2 ${item.color}`} />
              <h2 className="text-green-400 text-xl font-bold">{item.value}</h2>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SKILLS MATRIX - Enhanced with glow */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 font-bold mb-4 flex items-center gap-2">
            <Zap size={18} /> ⚡ Skills Matrix
          </h2>
          {skills.length === 0 ? (
            <p className="text-gray-400 text-sm">No skills added yet. Use admin dashboard to add.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {skills.slice(0, 12).map((skill, idx) => (
                <SkillCard key={idx} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          )}
        </div>

        {/* SYSTEM STATUS - Enhanced with icons */}
        <div className="glass-panel p-6 border border-green-500/20 font-mono text-sm">
          <h2 className="text-green-400 mb-3 flex items-center gap-2">
            <Activity size={16} /> 🧠 System Status
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <p>&gt; Server: <span className="text-green-400">Online 🟢</span></p>
            <p>&gt; Security: <span className="text-green-400">Active 🔐</span></p>
            <p>&gt; Firewall: <span className="text-green-400">Enabled 🧱</span></p>
            <p>&gt; Last Scan: <span className="text-yellow-400">2 min ago</span></p>
            <p>&gt; CPU Load: <span className="text-cyan-400">23%</span></p>
            <p>&gt; Memory: <span className="text-cyan-400">1.2GB / 8GB</span></p>
          </div>
        </div>

        {/* CERTIFICATIONS - Enhanced with hover details */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 mb-3 flex items-center gap-2">
            <Award size={18} /> 🎓 Certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="border border-green-500/30 rounded-lg p-3 hover:border-green-500/60 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <cert.icon size={16} className="text-green-400" />
                  <span className="text-sm font-bold text-green-400">{cert.name}</span>
                </div>
                <p className="text-xs text-gray-400">{cert.issuer} • {cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS - Fixed with Link */}
        <div className="flex gap-4">
          <a 
            href="/resume.pdf" 
            download 
            className="flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <Download size={16} /> Download Resume
          </a>
          <Link 
            to="/contact" 
            className="flex items-center gap-2 border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition"
          >
            <Mail size={16} /> Contact Me
          </Link>
        </div>

        {/* TERMINAL */}
        <CommandTerminal />
      </div>
    </Layout>
  );
};

export default Dashboard;