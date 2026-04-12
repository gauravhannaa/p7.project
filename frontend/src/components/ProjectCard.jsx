<div className="glass-panel p-5 space-y-4 hover:shadow-neon hover:scale-[1.02] transition duration-300 relative overflow-hidden">

  {/* Glow Border Effect */}
  <div className="absolute inset-0 rounded-xl border border-neon/10 pointer-events-none"></div>

  {/* Header */}
  <div className="flex justify-between items-start">
    <h2 className="text-lg font-bold text-neon leading-snug">
      {project.title}
    </h2>

    {/* Live Badge */}
    {project.liveLink && project.liveLink !== "#" && (
      <span className="text-[10px] px-2 py-1 bg-neon/20 border border-neon rounded text-neon animate-pulse">
        LIVE
      </span>
    )}
  </div>

  {/* Description */}
  <p className="text-gray-300 text-sm leading-relaxed">
    {project.description}
  </p>

  {/* Tech Stack */}
  <div>
    <p className="text-xs text-gray-400 mb-1">⚙ Tech Stack</p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map((t, i) => (
        <span
          key={i}
          className="text-xs px-2 py-1 border border-neon/30 rounded-full hover:bg-neon/10 transition"
        >
          {t}
        </span>
      ))}
    </div>
  </div>

  {/* Highlights */}
  <div>
    <p className="text-xs text-gray-400 mb-1">🔍 Key Highlights</p>
    <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
      {project.highlights.map((h, i) => (
        <li key={i} className="hover:text-neon transition">
          {h}
        </li>
      ))}
    </ul>
  </div>

  {/* Purpose */}
  {project.purpose && (
    <div>
      <p className="text-xs text-gray-400 mb-1">🎯 Purpose</p>
      <p className="text-xs text-gray-300 italic">
        {project.purpose}
      </p>
    </div>
  )}

  {/* Buttons */}
  <div className="flex gap-3 pt-3">

    {/* Live Button */}
    {project.liveLink && project.liveLink !== "#" && (
      <a
        href={project.liveLink}
        target="_blank"
        rel="noreferrer"
        className="text-xs px-3 py-1 border border-neon rounded hover:bg-neon/20 hover:shadow-neon transition"
      >
        🚀 Live Preview
      </a>
    )}

    {/* GitHub Button */}
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="text-xs px-3 py-1 border border-gray-500 rounded hover:bg-gray-700 transition"
      >
        💻 Source Code
      </a>
    )}

  </div>

</div>