import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UltraIntro = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showSanskrit, setShowSanskrit] = useState(false);
  const [currentShloka, setCurrentShloka] = useState('');
  const canvasRef = useRef(null);

  const bootSequence = [
    'Booting Cyber Security System...',
    'Initializing Kernel...',
    'Bypassing Firewalls...',
    'Connecting to Secure Server...',
    'Decrypting Data...',
    'Authenticating User...',
    'Access Control Verified...'
  ];

  // Sanskrit shlokas (short verses)
  const sanskritVerses = [
    'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं',
    'यदा यदा हि धर्मस्य ग्लानिर्भवति',
    'कर्मण्येवाधिकारस्ते मा फलेषु',
    'वसांसि जीर्णानि यथा विहाय',
    'नैनं छिन्दन्ति शस्त्राणि',
    'अहिंसा परमो धर्मः',
    'सत्यमेव जयते',
    'विद्या ददाति विनयम्'
  ];

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let fontSize = 16;
    let columns, drops;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Boot sequence typing
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let interval;

    const typeNextLine = () => {
      if (lineIndex < bootSequence.length) {
        const currentLine = bootSequence[lineIndex];
        if (charIndex < currentLine.length) {
          setBootLines(prev => {
            const newLines = [...prev];
            if (newLines[lineIndex]) newLines[lineIndex] = currentLine.slice(0, charIndex + 1);
            else newLines[lineIndex] = currentLine.slice(0, charIndex + 1);
            return newLines;
          });
          charIndex++;
          interval = setTimeout(typeNextLine, 50);
        } else {
          charIndex = 0;
          lineIndex++;
          setProgress((lineIndex / bootSequence.length) * 100);
          interval = setTimeout(typeNextLine, 200);
        }
      } else {
        // Boot sequence finished -> show Sanskrit welcome
        setProgress(100);
        setShowSanskrit(true);
        // Rotate Sanskrit verses every 1.5 seconds
        let verseIndex = 0;
        const verseInterval = setInterval(() => {
          setCurrentShloka(sanskritVerses[verseIndex % sanskritVerses.length]);
          verseIndex++;
        }, 1500);
        // After 4 seconds, show ACCESS GRANTED and then exit
        setTimeout(() => {
          clearInterval(verseInterval);
          setAccessGranted(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 4000);
      }
    };

    typeNextLine();
    return () => clearTimeout(interval);
  }, [bootSequence, onComplete, sanskritVerses]);

  // Glitch title
  const [glitchText, setGlitchText] = useState('root@secure-system:~$');
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(prev => {
        if (Math.random() > 0.9) {
          return prev.split('').map(c => Math.random() > 0.95 ? '#' : c).join('');
        }
        return 'root@secure-system:~$';
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent bg-[length:100%_4px] animate-scan" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-2xl mx-4 bg-black/80 backdrop-blur-md border border-neon rounded-lg shadow-2xl shadow-neon/30 p-6"
        >
          <div className="flex items-center gap-2 border-b border-neon/50 pb-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-mono text-neon ml-2 animate-glitch">
              {glitchText}
            </span>
          </div>

          <div className="font-mono text-sm space-y-1 mb-6 min-h-[300px]">
            {bootLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-green-400"
              >
                &gt; {line}
              </motion.div>
            ))}
            {showSanskrit && !accessGranted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 pt-3 border-t border-neon/30 text-center"
              >
                <div className="text-2xl font-bold text-neon mb-2">{currentShloka}</div>
                <div className="text-lg text-green-300">यथा कर्म तथा फलम् ॥</div>
                <div className="text-sm text-gray-400 mt-2">As you act, so shall you reap</div>
                <div className="text-md text-neon mt-4 animate-pulse">
                  🙏 Welcome to Gaurav Hanna's Cyber Portfolio 🙏
                </div>
              </motion.div>
            )}
            {accessGranted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-2xl font-bold text-neon text-center mt-6 py-4 border-t border-neon/30"
              >
                🔐 ACCESS GRANTED
              </motion.div>
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
          <div className="text-right text-xs text-neon/70 mt-1">
            Loading... {Math.floor(progress)}%
          </div>
          {!accessGranted && showSanskrit && (
            <div className="flex justify-end mt-2">
              <span className="text-neon animate-blink">_</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UltraIntro;