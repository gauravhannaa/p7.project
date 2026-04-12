import Layout from "../components/Layout";
import SkillCard from "../components/SkillCard";
import CommandTerminal from "../components/CommandTerminal";
import TypewriterText from "../components/TypewriterText";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchProfile, fetchSkills } from "../api";

const Dashboard = () => {
  const canvasRef = useRef(null);
  const [github, setGithub] = useState(null);
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);

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
        const text = String.fromCharCode(0x30A0 + Math.random() * 96); // random unicode
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

  // Stats data
  const statsData = [
    { label: "Projects", value: 12 },
    { label: "Experience", value: "2+ Yr" },
    { label: "GitHub Repos", value: github?.public_repos || "..." },
    { label: "Followers", value: github?.followers || "..." },
  ];

  const certifications = [
    "IBM Cyber Security",
    "Accenture Simulation",
    "Android Dev"
  ];

  return (
    <Layout>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
      />

      <div className="space-y-8">
        {/* HERO PANEL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 border border-green-500/20"
        >
          <h1 className="text-2xl font-bold text-green-400 font-mono">
            <TypewriterText text="> Booting Secure Dashboard..." delay={20} />
          </h1>
          <div className="mt-4 text-sm font-mono text-gray-300 space-y-1">
            <p>&gt; Name: <span className="text-green-400">{profile.name || "Gaurav Tiwari"}</span></p>
            <p>&gt; Role: Tech Support | Cyber Security</p>
            <p>&gt; Status: <span className="text-yellow-400">{profile.availability || "Open to Opportunities"}</span></p>
          </div>
        </motion.div>

        {/* LIVE STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((item, i) => (
            <div key={i} className="glass-panel p-4 text-center border border-green-500/20">
              <h2 className="text-green-400 text-xl font-bold">{item.value}</h2>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* SKILLS MATRIX */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 font-bold mb-4">⚡ Skills Matrix</h2>
          {skills.length === 0 ? (
            <p className="text-gray-400 text-sm">No skills added yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {skills.map((skill, idx) => (
                <SkillCard key={idx} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          )}
        </div>

        {/* SYSTEM STATUS */}
        <div className="glass-panel p-6 border border-green-500/20 font-mono text-sm">
          <h2 className="text-green-400 mb-3">🧠 System Status</h2>
          <p>&gt; Server: Online 🟢</p>
          <p>&gt; Security: Active 🔐</p>
          <p>&gt; Firewall: Enabled 🧱</p>
          <p>&gt; Last Scan: 2 min ago</p>
        </div>

        {/* CERTIFICATIONS */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 mb-3">🎓 Certifications</h2>
          <ul className="text-sm font-mono text-gray-300">
            {certifications.map((cert, idx) => (
              <li key={idx}>&gt; {cert}</li>
            ))}
          </ul>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex gap-4">
          <a href="/resume.pdf" download className="btn bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition">
            Download Resume
          </a>
          <a href="/contact" className="btn border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition">
            Contact Me
          </a>
        </div>

        {/* TERMINAL */}
        <CommandTerminal />
      </div>
    </Layout>
  );
};

export default Dashboard;