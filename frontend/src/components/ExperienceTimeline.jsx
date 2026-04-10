import { Briefcase } from "lucide-react";

const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <div key={idx} className="border-l-2 border-neon/50 pl-4 relative">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon"></div>
          <div className="flex flex-wrap justify-between items-start">
            <h3 className="text-lg font-bold text-neon">{exp.role}</h3>
            <span className="text-xs text-gray-400">{exp.duration}</span>
          </div>
          <p className="text-sm text-gray-300">{exp.company}</p>
          <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
            {exp.responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-2">
            {exp.tools.map((tool) => (
              <span key={tool} className="text-[10px] px-2 py-0.5 bg-neon/10 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;