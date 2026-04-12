import { FileText, Download, Eye } from "lucide-react";

const ResumePanel = () => {
  const resumeUrl = "/resume.pdf";

  return (
    <div className="glass-panel p-6 space-y-5 text-center">

      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <FileText className="text-neon" size={40} />
        <h2 className="text-xl font-bold text-neon">
          Professional Resume
        </h2>
        <p className="text-gray-400 text-sm">
          Access, preview, or download my latest resume
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">

        {/* View Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-neon rounded hover:bg-neon/20 transition text-sm"
        >
          <Eye size={16} /> View Resume
        </a>

        {/* Download Button */}
        <a
          href={resumeUrl}
          download="Gaurav_Tiwari_Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 border border-gray-500 rounded hover:bg-gray-700 transition text-sm"
        >
          <Download size={16} /> Download Resume
        </a>

      </div>

      {/* Preview (Optional but pro 🔥) */}
      <div className="mt-4 border border-neon/20 rounded overflow-hidden">
        <iframe
          src={resumeUrl}
          title="Resume Preview"
          className="w-full h-[500px] bg-black"
        />
      </div>

    </div>
  );
};

export default ResumePanel;