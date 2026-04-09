import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchSkills } from '../api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    loadSkills();
  }, []);
  
  const loadSkills = async () => {
    try {
      const { data } = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };
  
  return (
    <section id="skills" className="py-20 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Technical Skills /&gt;
        </h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <div 
              key={skill._id}
              className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-4 transition-all duration-500 delay-${idx * 100} ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="flex justify-between mb-2">
                <span className="text-hacker-green font-bold">{skill.name}</span>
                <span className="text-gray-400">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-hacker-green h-2 rounded-full transition-all duration-1000"
                  style={{ width: inView ? `${skill.percentage}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;