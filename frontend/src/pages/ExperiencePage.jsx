import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { useEffect, useState } from "react";
import { fetchExperiences } from "../api";
import { experiences as staticExperiences } from "../data/portfolioData";

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const res = await fetchExperiences();
        const apiExperiences = (res.data && res.data.length > 0) ? res.data : [];
        
        // Merge static and API experiences, avoiding duplicates by role+company or _id
        const allExperiences = [...staticExperiences];
        apiExperiences.forEach(apiExp => {
          const exists = allExperiences.some(exp => 
            (exp.role === apiExp.role && exp.company === apiExp.company) || 
            exp._id === apiExp._id
          );
          if (!exists) {
            allExperiences.push(apiExp);
          }
        });
        setExperiences(allExperiences);
      } catch (error) {
        console.error("Error loading experiences from API, using static only", error);
        setExperiences(staticExperiences);
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-green-400 text-xl animate-pulse">Loading experience...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Professional Experience Logs" />

      {/* Intro Section */}
      <div className="glass-panel p-6 mb-6 space-y-3">
        <h2 className="text-xl font-bold text-neon">
          💼 Experience Overview
        </h2>
        <p className="text-green-400 text-sm leading-relaxed">
          A results-driven Tech Support Engineer and Cyber Security Enthusiast 
          with hands-on experience in system troubleshooting, network security, 
          and infrastructure management. Proven ability to handle critical incidents, 
          optimize system performance, and maintain secure and high-availability environments.
        </p>
      </div>

      {/* Timeline */}
      <div className="glass-panel p-6">
        {experiences.length === 0 ? (
          <p className="text-green-400 text-center py-4">No experience data available. Use admin dashboard to add.</p>
        ) : (
          <ExperienceTimeline experiences={experiences} />
        )}
      </div>

      {/* Terminal Style Footer */}
      <div className="mt-6 glass-panel p-4">
        <p className="text-sm text-green-400">
          &gt; load --experience --timeline
        </p>
        <p className="text-neon text-sm">
          ✓ Experience logs successfully mapped and verified.
        </p>
      </div>

    </Layout>
  );
};

export default ExperiencePage;