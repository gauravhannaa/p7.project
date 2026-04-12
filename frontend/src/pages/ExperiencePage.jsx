import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { experiences } from "../data/portfolioData";

const ExperiencePage = () => {
  return (
    <Layout>
      <PageHeader title="Professional Experience Logs" />

      {/* Intro Section */}
      <div className="glass-panel p-6 mb-6 space-y-3">
        <h2 className="text-xl font-bold text-neon">
          💼 Experience Overview
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          A results-driven Tech Support Engineer and Cyber Security Enthusiast 
          with hands-on experience in system troubleshooting, network security, 
          and infrastructure management. Proven ability to handle critical incidents, 
          optimize system performance, and maintain secure and high-availability environments.
        </p>
      </div>

      {/* Timeline */}
      <div className="glass-panel p-6">
        <ExperienceTimeline experiences={experiences} />
      </div>

      {/* Terminal Style Footer */}
      <div className="mt-6 glass-panel p-4">
        <p className="text-sm text-gray-400">
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