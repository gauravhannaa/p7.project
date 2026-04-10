import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);
  const bootMessages = [
    "> Initializing portfolio system...",
    "> Loading user profile...",
    "> Verifying access...",
    "> Booting DevOps terminal...",
    "> Access granted.",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[currentLine]]);
        currentLine++;
        setProgress((currentLine / bootMessages.length) * 100);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-lg p-6 border border-neon/30 rounded-lg bg-black/80">
        <div className="mb-6 text-neon font-mono">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="mb-2"
            >
              {line}
            </motion.p>
          ))}
          {lines.length === bootMessages.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 mt-4"
            >
              ✓ System ready.
            </motion.p>
          )}
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-neon/70">{Math.floor(progress)}%</div>
        <div className="mt-4 text-center text-neon/50 animate-blink">_</div>
      </div>
    </motion.div>
  );
};

export default IntroLoader;