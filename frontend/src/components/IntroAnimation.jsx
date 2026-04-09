import React, { useEffect, useRef, useState } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let drops = [];
    let fontSize = 24;
    let columns = 0;
    let startTime = Date.now();
    const duration = 5000; // 5 seconds intro

    const sanskritShlokas = [
      "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं",
      "यदा यदा हि धर्मस्य ग्लानिर्भवति",
      "कर्मण्येवाधिकारस्ते मा फलेषु",
      "परित्राणाय साधूनां विनाशाय",
      "वसांसि जीर्णानि यथा विहाय",
      "नैनं छिन्दन्ति शस्त्राणि",
      "अहिंसा परमो धर्मः",
      "सत्यमेव जयते",
    ];

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const randomShloka = sanskritShlokas[Math.floor(Math.random() * sanskritShlokas.length)];
        const randomChar = randomShloka[Math.floor(Math.random() * randomShloka.length)];
        const char = randomChar || 'ॐ';
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      // Draw welcome text overlay (fades out at the end)
      const elapsed = Date.now() - startTime;
      const opacity = Math.min(1, Math.max(0, 1 - (elapsed / duration) * 1.5));
      if (opacity > 0) {
        ctx.font = 'bold 48px monospace';
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff41';
        ctx.textAlign = 'center';
        ctx.fillText('🔐 GAURAV HANNA', canvas.width/2, canvas.height/2 - 60);
        ctx.font = '28px monospace';
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.9})`;
        ctx.fillText('यथा कर्म तथा फलम् ॥', canvas.width/2, canvas.height/2);
        ctx.font = '20px monospace';
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.7})`;
        ctx.fillText('As you act, so shall you reap', canvas.width/2, canvas.height/2 + 50);
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.5})`;
        ctx.fillText('Initializing Cyber Security Terminal...', canvas.width/2, canvas.height/2 + 120);
        ctx.textAlign = 'left';
        ctx.shadowBlur = 0;
      }
      
      if (elapsed >= duration) {
        setFadeOut(true);
        cancelAnimationFrame(animationId);
        setTimeout(onComplete, 500);
        return;
      }
      animationId = requestAnimationFrame(draw);
    };
    
    const handleResize = () => {
      initCanvas();
    };
    
    initCanvas();
    draw();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);
  
  return (
    <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default IntroAnimation;