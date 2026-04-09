import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchExperiences } from '../api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    loadExperiences();
  }, []);
  
  const loadExperiences = async () => {
    try {
      const { data } = await fetchExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };
  
  return (
    <section id="experience" className="py-20 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Experience /&gt;
        </h2>
        <div ref={ref} className="space-y-6">
          {experiences.map((exp, idx) => (
            <div 
              key={exp._id}
              className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-6 transition-all duration-500 delay-${idx * 150} ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-hacker-green">{exp.role}</h3>
                  <p className="text-gray-400 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;