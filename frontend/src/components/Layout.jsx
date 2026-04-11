import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ScanlineOverlay from "./ScanlineOverlay";
import { Toaster } from "react-hot-toast";
import { Shield } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-black text-neon font-mono">
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="ml-64 p-6">
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