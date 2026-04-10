import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UltraIntro = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const bootSequence = [
    'Booting Cyber Security System...',
    'Initializing Kernel...',
    'Bypassing Firewalls...',
    'Connecting to Secure Server...',
    'Decrypting Data...',
    'Authenticating User...',
    'Access Control Verified...'
  ];

  // ---------- SOUND SYSTEM ----------
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }, []);

  const playBeep = useCallback((type = 'typing') => {
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'typing') {
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'granted') {
        osc.frequency.value = 1568;
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.value = 1318;
        gain2.gain.setValueAtTime(0.2, now + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc2.start(now + 0.2);
        osc2.stop(now + 0.5);
      }
    } catch (e) { console.warn('Audio error:', e); }
  }, [initAudio]);

  // ---------- VIBRATION ----------
  const vibrate = useCallback((duration, intensity = 'light') => {
    if ('vibrate' in navigator) {
      if (intensity === 'light') navigator.vibrate(duration);
      else if (intensity === 'strong') navigator.vibrate([200, 100, 200]);
    }
  }, []);

  // ---------- MATRIX RAIN (Canvas) ----------
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

  // ---------- BOOT SEQUENCE TYPING ----------
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
          playBeep('typing');
          vibrate(30, 'light');
          charIndex = 0;
          lineIndex++;
          setProgress((lineIndex / bootSequence.length) * 100);
          interval = setTimeout(typeNextLine, 200);
        }
      } else {
        setProgress(100);
        setTimeout(() => {
          setAccessGranted(true);
          playBeep('granted');
          vibrate(400, 'strong');
          setTimeout(() => {
            setShowMatrix(false);
            setTimeout(() => {
              onComplete(); // ✅ only call callback, no navigation
            }, 1500);
          }, 2000);
        }, 400);
      }
    };
    typeNextLine();
    return () => clearTimeout(interval);
  }, [bootSequence, playBeep, vibrate, onComplete]);

  // ---------- GLITCH TITLE ----------
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

  // Unlock audio on first click
  useEffect(() => {
    const handleFirstClick = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  return (
    <AnimatePresence>
      {showMatrix && (
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

            <div className="font-mono text-sm space-y-1 mb-6 min-h-[250px]">
              {bootLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-green-400"
                >
                  &gt; {line}
                  {idx === bootLines.length - 1 && !accessGranted && (
                    <span className="inline-block w-2 h-4 bg-neon ml-1 animate-blink" />
                  )}
                </motion.div>
              ))}
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

            {!accessGranted && (
              <div className="flex justify-end mt-2">
                <span className="text-neon animate-blink">_</span>
              </div>
            )}
          </motion.div>

          <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono">
            Secure Terminal v2.4.1
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
            AES-256 Encrypted
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UltraIntro;