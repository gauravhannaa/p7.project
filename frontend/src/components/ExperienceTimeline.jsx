const ExperienceTimeline = ({ experiences }) => {
  // Helper to convert API experience to the static format expected by the JSX
  const normalizeExperience = (exp) => {
    // If it already has `duration` and `highlights` (static format), return as is
    if (exp.duration) return exp;

    // Otherwise, assume it's from the API – convert to static-like structure
    const start = exp.startDate || 'N/A';
    const end = exp.isCurrent ? 'Present' : (exp.endDate || 'N/A');
    const duration = `${start} – ${end}`;

    return {
      id: exp._id,
      role: exp.role,
      company: exp.company,
      location: exp.location || 'N/A',
      duration: duration,
      description: exp.description || '',
      highlights: exp.responsibilities || [],
      companyInfo: exp.companyInfo || '',
      clients: exp.clients || []
    };
  };

  const normalizedExperiences = experiences.map(normalizeExperience);

  return (
    <div className="space-y-6">
      {normalizedExperiences.map((exp) => (
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
          {exp.clients && exp.clients.length > 0 && (
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