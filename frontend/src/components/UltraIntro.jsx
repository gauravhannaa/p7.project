import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UltraIntro = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("sanskrit"); // sanskrit -> boot -> done
  const canvasRef = useRef(null);

  const bootSequence = [
    "Initializing Secure Kernel...",
    "Loading Cyber Modules...",
    "Bypassing Firewalls...",
    "Establishing Encrypted Tunnel...",
    "Decrypting Intelligence Data...",
    "Authenticating Root Access...",
    "Access Control Verified..."
  ];

  const shlok = "यथा कर्म तथा फलम् ॥";

  // ✅ MATRIX (SANSKRIT)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let fontSize = 16;
    let columns;
    let drops;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const chars =
      "अआइईउऊऋएऐओऔकखगघचछजझटठडढतथदधनपफबभमयरलवशषसहॐ";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        )
          drops[i] = 0;

        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // ✅ FLOW CONTROL
  useEffect(() => {
    // Phase 1: Sanskrit intro (3 sec)
    if (phase === "sanskrit") {
      setTimeout(() => {
        setPhase("boot");
      }, 3000);
    }

    // Phase 2: Boot animation (~6 sec)
    if (phase === "boot") {
      let lineIndex = 0;
      let charIndex = 0;

      const type = () => {
        if (lineIndex < bootSequence.length) {
          const line = bootSequence[lineIndex];

          if (charIndex < line.length) {
            setBootLines((prev) => {
              const newLines = [...prev];
              newLines[lineIndex] = line.slice(0, charIndex + 1);
              return newLines;
            });

            charIndex++;
            setTimeout(type, 40);
          } else {
            charIndex = 0;
            lineIndex++;
            setProgress((lineIndex / bootSequence.length) * 100);
            setTimeout(type, 200);
          }
        } else {
          // Done → go dashboard after delay
          setProgress(100);
          setTimeout(() => {
            setPhase("done");
            onComplete(); // 🔥 dashboard open
          }, 2000);
        }
      };

      type();
    }
  }, [phase]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        exit={{ opacity: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />

        {/* TERMINAL BOX */}
        <div className="relative z-10 w-full max-w-2xl bg-black/80 border border-green-500 rounded-lg p-6 shadow-lg shadow-green-500/30">

          {/* HEADER */}
          <div className="flex items-center gap-2 mb-4 border-b border-green-500 pb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-green-400 font-mono ml-2">
              root@gauravhanna:~$
            </span>
          </div>

          {/* CONTENT */}
          <div className="font-mono text-green-400 min-h-[250px]">

            {/* 🧘 Phase 1 Sanskrit */}
            {phase === "sanskrit" && (
              <div className="text-center mt-16">
                <div className="text-2xl text-green-300 animate-pulse">
                  {shlok}
                </div>
                <div className="mt-4 text-gray-400">
                  Welcome to Cyber Intelligence System
                </div>
              </div>
            )}

            {/* 💻 Phase 2 Boot */}
            {phase !== "sanskrit" &&
              bootLines.map((line, i) => (
                <div key={i}>&gt; {line}</div>
              ))}

            {/* 🔐 Done */}
            {phase === "done" && (
              <div className="text-center text-2xl mt-6 text-green-400">
                🔐 ACCESS GRANTED
              </div>
            )}
          </div>

          {/* PROGRESS */}
          <div className="w-full h-1 bg-gray-800 mt-4">
            <div
              className="h-full bg-green-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-right text-xs text-green-400 mt-1">
            Loading... {Math.floor(progress)}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UltraIntro;