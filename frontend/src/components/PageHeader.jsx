import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-6">
      <button onClick={() => navigate(-1)} className="p-2 border border-neon/30 rounded-md hover:bg-neon/10 transition">
        <ArrowLeft size={18} />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-neon">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;