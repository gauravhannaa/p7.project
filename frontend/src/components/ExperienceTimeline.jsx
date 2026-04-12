const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="space-y-6">

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="glass-panel p-5 border border-neon/20 rounded hover:shadow-neon transition"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-lg font-bold text-neon">
              {exp.role}
            </h2>
            <span className="text-xs text-gray-400">
              {exp.duration}
            </span>
          </div>

          {/* Company */}
          <p className="text-gray-300 text-sm mt-1">
            {exp.company} • {exp.location}
          </p>

          {/* Description */}
          <p className="text-gray-400 text-sm mt-3">
            {exp.description}
          </p>

          {/* Highlights */}
          <ul className="mt-3 text-xs text-gray-400 list-disc list-inside space-y-1">
            {exp.highlights.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Company Info */}
          {exp.companyInfo && (
            <div className="mt-4 text-xs text-gray-500 border-t border-neon/10 pt-3">
              <span className="text-neon">Company Profile:</span> {exp.companyInfo}
            </div>
          )}

          {/* Clients */}
          {exp.clients && (
            <div className="mt-2 flex flex-wrap gap-2">
              {exp.clients.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 border border-neon/30 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default ExperienceTimeline;