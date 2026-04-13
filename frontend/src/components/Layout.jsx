import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ScanlineOverlay from "./ScanlineOverlay";
import { Toaster } from "react-hot-toast";
import { Shield, Menu } from "lucide-react";

let useAdmin = () => ({ isAdmin: false });
try {
  const adminContext = require("../context/AdminContext");
  if (adminContext.useAdmin) useAdmin = adminContext.useAdmin;
} catch (e) {
  console.warn("AdminContext not available, admin features disabled");
}

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarMinimized, setSidebarMinimized] = useState(true); // start minimized
  const { isAdmin = false } = useAdmin();
  const navigate = useNavigate();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleSidebar = () => setSidebarMinimized(!sidebarMinimized);

  return (
    <div className="min-h-screen bg-black text-neon font-mono">
      {/* Hamburger button – toggles sidebar expansion */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-black/80 border border-neon/30 rounded-md"
      >
        <Menu size={24} className="text-neon" />
      </button>

      {/* Sidebar – always fixed, no drawer */}
      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isMinimized={sidebarMinimized}
        onMinimizeToggle={toggleSidebar}
      />

      {/* Main content – margin adjusts based on sidebar width */}
      <main className={`md:transition-all md:duration-300 p-4 md:p-6 ${sidebarMinimized ? 'md:ml-20' : 'md:ml-72'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Admin Quick Access Button */}
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