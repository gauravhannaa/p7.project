import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Reports from './components/Reports';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen">
      <MatrixBackground />
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-hacker-green/20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <span className="text-hacker-green font-bold text-xl">&lt;GT/&gt;</span>
            <div className="hidden md:flex gap-6">
              <a href="#about" className="text-gray-300 hover:text-hacker-green transition">About</a>
              <a href="#skills" className="text-gray-300 hover:text-hacker-green transition">Skills</a>
              <a href="#experience" className="text-gray-300 hover:text-hacker-green transition">Experience</a>
              <a href="#projects" className="text-gray-300 hover:text-hacker-green transition">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-hacker-green transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Experience />
        <Projects />
        <Reports />
        <Contact />
      </main>
      <footer className="py-6 text-center border-t border-hacker-green/20 text-gray-500 text-sm">
        <p>&copy; 2024 Gaurav Tiwari. All rights reserved. | Securing the digital world 🔐</p>
      </footer>
    </div>
  );
}

export default App;