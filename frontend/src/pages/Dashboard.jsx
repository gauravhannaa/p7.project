import Layout from "../components/Layout";
import SkillCard from "../components/SkillCard";
import CommandTerminal from "../components/CommandTerminal";
import TypewriterText from "../components/TypewriterText";
import { profile, skills } from "../data/portfolioData";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const canvasRef = useRef(null);
  const [github, setGithub] = useState(null);

  // 🔥 GitHub API Fetch
  useEffect(() => {
    fetch("https://api.github.com/users/YOUR_USERNAME")
      .then(res => res.json())
      .then(data => setGithub(data));
  }, []);

  // 🟢 Matrix Rain Effect (Optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff9f";
      ctx.font = fontSize + "px monospace";

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
      />

      <div className="space-y-8">

        {/* 🔥 HERO PANEL */}
        <motion.div className="glass-panel p-6 border border-green-500/20">
          <h1 className="text-2xl font-bold text-green-400 font-mono">
            <TypewriterText text="> Booting Secure Dashboard..." delay={20} />
          </h1>

          <div className="mt-4 text-sm font-mono text-gray-300 space-y-1">
            <p>&gt; Name: <span className="text-green-400">Gaurav Tiwari</span></p>
            <p>&gt; Role: Tech Support | Cyber Security</p>
            <p>&gt; Status: <span className="text-yellow-400">{profile.availability}</span></p>
          </div>
        </motion.div>

        {/* 📊 LIVE STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Projects", value: 12 },
            { label: "Experience", value: "2+ Yr" },
            { label: "GitHub Repos", value: github?.public_repos || "..." },
            { label: "Followers", value: github?.followers || "..." },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-4 text-center border border-green-500/20">
              <h2 className="text-green-400 text-xl font-bold">{item.value}</h2>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* ⚡ SKILLS */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 font-bold mb-4">⚡ Skills Matrix</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={i} {...skill} />
            ))}
          </div>
        </div>

        {/* 🧠 SYSTEM STATUS */}
        <div className="glass-panel p-6 border border-green-500/20 font-mono text-sm">
          <h2 className="text-green-400 mb-3">🧠 System Status</h2>
          <p>&gt; Server: Online 🟢</p>
          <p>&gt; Security: Active 🔐</p>
          <p>&gt; Firewall: Enabled 🧱</p>
          <p>&gt; Last Scan: 2 min ago</p>
        </div>

        {/* 🎓 CERTIFICATIONS */}
        <div className="glass-panel p-6 border border-green-500/20">
          <h2 className="text-green-400 mb-3">🎓 Certifications</h2>
          <ul className="text-sm font-mono text-gray-300">
            <li>&gt; IBM Cyber Security</li>
            <li>&gt; Accenture Simulation</li>
            <li>&gt; Android Dev</li>
          </ul>
        </div>

        {/* ⚡ QUICK ACTIONS */}
        <div className="flex gap-4">
          <a href="/resume.pdf" className="btn">Download Resume</a>
          <a href="/contact" className="btn">Contact Me</a>
        </div>

        {/* 💀 TERMINAL */}
        <CommandTerminal />

      </div>
    </Layout>
  );
};

export default Dashboard;