import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ScanlineOverlay from "./ScanlineOverlay";
import { Toaster } from "react-hot-toast";
import { Shield, Menu } from "lucide-react";

// Try to import AdminContext, but don't fail if it doesn't exist
let useAdmin = () => ({ isAdmin: false });
try {
  const adminContext = require("../context/AdminContext");
  if (adminContext.useAdmin) useAdmin = adminContext.useAdmin;
} catch (e) {
  console.warn("AdminContext not available, admin features disabled");
}

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isAdmin = false } = useAdmin();
  const navigate = useNavigate();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-black text-neon font-mono">
      {/* Hamburger button (visible only on mobile) */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-black/80 border border-neon/30 rounded-md md:hidden"
      >
        <Menu size={24} className="text-neon" />
      </button>

      {/* Sidebar – drawer on mobile, fixed on desktop */}
      <div
        className={`
          fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content – margin-left only on desktop */}
      <main className="md:ml-64 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Admin Quick Access Button (unchanged) */}
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => navigate('/admin')}
              className="p-3 bg-neon/20 border border-neon rounded-full hover:bg-neon/30 transition shadow-lg"
            >
              <Shield size={20} className={isAdmin ? "text-yellow-400" : "text-neon"} />
            </button>
          </div>
          {children}
        </div>
      </main>
      <ScanlineOverlay />
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#111", color: "#00ff41" } }} />
    </div>
  );
};

export default Layout;