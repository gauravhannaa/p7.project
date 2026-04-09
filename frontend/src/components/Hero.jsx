import { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const lines = [
    '> Initializing system...',
    '> Access Granted',
    '> Welcome Gaurav Tiwari (gauravhanna)',
    '> Cyber Security Engineer',
    '',
    'यथा कर्म तथा फलम् ॥'
  ];
  
  useEffect(() => {
    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex];
      if (charIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + currentLine[charIndex]);
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + '\n');
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }, 200);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, lineIndex]);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <pre className="text-hacker-green text-sm sm:text-base md:text-lg lg:text-xl font-mono whitespace-pre-wrap text-left bg-black/50 p-6 rounded-lg border border-hacker-green/30 backdrop-blur-sm">
          {displayText}
          <span className={`inline-block w-2 h-5 bg-hacker-green ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
        </pre>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="#contact" className="px-6 py-3 border border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black transition-all duration-300 rounded">
            Contact Me
          </a>
          <a href="#projects" className="px-6 py-3 bg-hacker-green text-black hover:bg-transparent hover:border hover:border-hacker-green hover:text-hacker-green transition-all duration-300 rounded">
            View Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;