import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="border border-neon/20 rounded-lg p-4 bg-black/40 hover:border-neon/60 transition"
    >
      <h3 className="text-lg font-bold text-neon">{project.title}</h3>
      <p className="text-gray-400 text-sm mt-1">{project.summary}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tech.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 bg-neon/10 rounded-full">
            {t}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          {project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-neon/70 hover:text-neon">
              {/* Fallback text icon – avoids import error */}
              <span className="text-xs">[GitHub]</span>
            </a>
          )}
          {project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-neon/70 hover:text-neon">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <span className="text-[10px] text-neon/50">{project.status}</span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;