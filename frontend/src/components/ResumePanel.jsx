import { Download, Printer } from "lucide-react";

const ResumePanel = () => {
  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-bold text-neon mb-4">📄 Resume Access Terminal</h2>
      <div className="border border-neon/20 rounded p-4 mb-4">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
          {`> cat resume.txt
Name: Gaurav Tiwari
Role: DevOps / Cloud / Cybersecurity Engineer
Experience: 2+ years in IT support, transitioning to DevOps
Skills: AWS, Docker, K8s, Linux, Python, Terraform, CI/CD
Certifications: AWS CCP, CKA (in progress)
`}
        </pre>
      </div>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 border border-neon/50 rounded hover:bg-neon/10">
          <Download size={16} /> Download PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-neon/50 rounded hover:bg-neon/10">
          <Printer size={16} /> Print
        </button>
      </div>
    </div>
  );
};

export default ResumePanel;