import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchProjects } from '../api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };
  
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Projects /&gt;
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, idx) => (
            <div 
              key={project._id}
              className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg overflow-hidden transition-all duration-500 delay-${idx * 100} hover:border-hacker-green/60 hover:scale-105 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-hacker-green mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex gap-3">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-hacker-green border border-hacker-green px-3 py-1 rounded hover:bg-hacker-green hover:text-black transition">
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-hacker-green border border-hacker-green px-3 py-1 rounded hover:bg-hacker-green hover:text-black transition">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;