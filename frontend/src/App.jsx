import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MatrixBackground from './components/MatrixBackground';
import TerminalDashboard from './components/TerminalDashboard';
import IntroAnimation from './components/IntroAnimation';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
  };
  
  return (
    <Router>
      <div className="relative min-h-screen">
        <MatrixBackground />
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
        <Routes>
          <Route path="/" element={<TerminalDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;