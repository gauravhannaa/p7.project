import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AdminProvider, useAdmin } from "./context/AdminContext";
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
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

// AnimatedRoutes component with page transitions
function AnimatedRoutes() {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  
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
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("introSeen");
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      sessionStorage.setItem("introSeen", "true");
    }
  }, []);

  if (showIntro) {
    return <UltraIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

export default App;