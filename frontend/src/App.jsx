import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import UltraIntro from "./components/UltraIntro";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import AboutPage from "./pages/AboutPage";
import StatsPage from "./pages/StatsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import ResumePage from "./pages/ResumePage";

// AnimatedRoutes component with page transitions
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/repositories" element={<RepositoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Only show intro once per browser session
    const hasSeenIntro = sessionStorage.getItem("introSeen");
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      sessionStorage.setItem("introSeen", "true");
    }
  }, []);

  // If intro is still showing, render it
  if (showIntro) {
    return <UltraIntro onComplete={() => setShowIntro(false)} />;
  }

  // After intro, render the main app with router
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;