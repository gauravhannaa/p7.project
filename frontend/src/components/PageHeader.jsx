import React from 'react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle, backPath }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={handleBack} 
        className="p-2 border border-neon/30 rounded-md hover:bg-neon/10 transition-colors duration-200"
        aria-label="Go back"
      >
        <ArrowLeft size={18} className="text-neon" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-neon glow-text">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400 font-mono">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;