import { useState } from "react";
import Sidebar from "./Sidebar";
import ScanlineOverlay from "./ScanlineOverlay";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-black text-neon font-mono">
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="ml-64 p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
      <ScanlineOverlay />
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#111", color: "#00ff41" } }} />
    </div>
  );
};

export default Layout;