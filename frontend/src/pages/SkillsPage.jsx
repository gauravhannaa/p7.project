import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSkills } from '../api';
import { motion } from 'framer-motion';

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(skills.map(skill => skill.category || 'Technical'))];

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const { data } = await fetchSkills();
      setSkills(data);
      setFilteredSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => (skill.category || 'Technical') === activeCategory));
    }
  }, [activeCategory, skills]);

  // Group skills by category for display (optional)
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    const cat = skill.category || 'Technical';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <div className="text-green-400 text-xl animate-pulse">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 text-green-400 hover:underline flex items-center gap-2 transition-colors font-mono"
        >
          ← Back to Terminal
        </button>

        {/* Page header */}
        <div className="glass-card p-6 rounded-lg border border-green-500/30 mb-8">
          <h1 className="text-4xl font-bold text-green-400 glow-text mb-2">⚡ Technical Skills</h1>
          <p className="text-gray-400 font-mono">> Displaying skill matrix and proficiency levels</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-green-500 text-black border border-green-500'
                  : 'bg-black/50 text-green-400 border border-green-500/30 hover:bg-green-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills display - grouped by category when in 'All' view, otherwise flat */}
        {activeCategory === 'All' ? (
          // Grouped by category
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2 inline-block">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {categorySkills.map((skill, idx) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-card p-5 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-green-400">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-green-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Flat list for single category
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-5 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-green-400">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-green-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* If no skills */}
        {filteredSkills.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No skills found in this category.
          </div>
        )}

        {/* Terminal-style footer */}
        <div className="mt-12 pt-4 border-t border-green-500/20 text-center text-xs text-gray-500 font-mono">
          <span className="text-green-400">$</span> skills --display --all | grep -i "proficiency"
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;