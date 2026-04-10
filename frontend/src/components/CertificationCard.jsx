import { Award, ExternalLink } from "lucide-react";

const CertificationCard = ({ cert }) => {
  return (
    <div className="border border-neon/20 rounded-lg p-4 flex items-start gap-3 bg-black/40">
      <Award className="text-neon shrink-0" size={24} />
      <div className="flex-1">
        <h3 className="font-bold text-neon">{cert.title}</h3>
        <p className="text-xs text-gray-400">{cert.issuer} · {cert.date}</p>
        <p className="text-[10px] text-gray-500">ID: {cert.id}</p>
        {cert.verifyUrl !== "#" && (
          <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-neon/70 hover:text-neon">
            Verify <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;