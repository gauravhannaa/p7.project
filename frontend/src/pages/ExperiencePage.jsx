import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { useEffect, useState } from "react";
import { fetchExperiences } from "../api";
import { experiences as staticExperiences } from "../data/portfolioData";

// Convert static experience format to the format expected by ExperienceTimeline
const normalizeStaticExperience = (exp) => {
  // If already in API format (with startDate, endDate, etc.), return as is
  if (exp.startDate) return exp;

  // Extract dates from duration string like "Nov 2025 – Present" or "Aug 2025 – Nov 2025"
  let startDate = exp.duration?.split(' – ')[0] || exp.startDate || 'N/A';
  let endDate = exp.duration?.split(' – ')[1] || exp.endDate || 'N/A';
  const isCurrent = endDate === 'Present' || endDate === 'present' || exp.isCurrent || false;

  return {
    _id: exp.id || `static_${exp.role}_${exp.company}`,
    role: exp.role,
    company: exp.company,
    startDate: startDate,
    endDate: isCurrent ? null : (endDate !== 'N/A' ? endDate : null),
    isCurrent: isCurrent,
    responsibilities: exp.responsibilities || exp.highlights || [],
    // Keep original description if needed
    description: exp.description,
  };
};

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const res = await fetchExperiences();
        const apiExperiences = (res.data && res.data.length > 0) ? res.data : [];

        // Normalize static experiences
        const staticNormalized = Array.isArray(staticExperiences)
          ? staticExperiences.map(normalizeStaticExperience)
          : [];

        // Merge: start with static, then add API entries that don't duplicate
        const allExperiences = [...staticNormalized];
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
        // Fallback to static only
        const staticNormalized = Array.isArray(staticExperiences)
          ? staticExperiences.map(normalizeStaticExperience)
          : [];
        setExperiences(staticNormalized);
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