import { useEffect, useRef } from 'react';

// List of Sanskrit shlokas (from Bhagavad Gita, Upanishads, etc.)
const sanskritShlokas = [
  "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
  "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
  "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
  "वसांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि। तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही॥",
  "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः। न चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥",
  "अहिंसा परमो धर्मः सत्यं परमं तपः। सर्वं क्षमया तपस्तप्यं न हि क्षमा समं तपः॥",
  "सत्यमेव जयते नानृतम् सत्येन पन्था विततो देवयानः। येनाक्रमन्त्यृषयो ह्याप्तकामो यत्र तत् सत्यस्य परमं निधानम्॥",
  "शुचौ देशे प्रतिष्ठाप्य स्थिरमासनमात्मनः। नात्युच्छ्रितं नातिनीचं चैलाजिनकुशोत्तरम्॥",
  "विद्या ददाति विनयं विनयाद्याति पात्रताम्। पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥",
  "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
  "तस्मादसक्तः सततं कार्यं कर्म समाचर। असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
];

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let drops = [];
    let fontSize = 16; // slightly larger for Devanagari readability
    let columns = 0;
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      // Initialize drops: each column starts at a random row
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // start above canvas
      }
    };
    
    const draw = () => {
      // Semi-transparent black to create fading trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text color: neon green with slight random variation
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'Segoe UI', 'Courier New', monospace`;
      ctx.shadowBlur = 0;
      
      for (let i = 0; i < drops.length; i++) {
        // Randomly pick a shloka from the list for each column
        const shloka = sanskritShlokas[Math.floor(Math.random() * sanskritShlokas.length)];
        // Display only a portion of the shloka? For matrix effect, we can show first few chars
        // But to keep it elegant, we'll show the whole shloka truncated to 20-30 chars?
        // Better: show the shloka as a whole but wrap? No, matrix rain works with single characters.
        // So we need to break shlokas into characters. Let's pick a random character from a random shloka.
        const randomShloka = sanskritShlokas[Math.floor(Math.random() * sanskritShlokas.length)];
        const randomChar = randomShloka[Math.floor(Math.random() * randomShloka.length)];
        const charToDraw = randomChar || 'ॐ';
        
        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(charToDraw, x, y);
        
        // Reset drop when it reaches bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        // Add occasional brightness glow
        if (Math.random() > 0.995) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(charToDraw, x, y);
          ctx.fillStyle = '#00ff41';
        }
        drops[i]++;
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
  }, []);
  
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20" />;
};

export default MatrixBackground;