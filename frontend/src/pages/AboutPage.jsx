import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { profile, skills } from "../data/portfolioData";

const AboutPage = () => {
  return (
    <Layout>
      <PageHeader title="System Identity / About User" />
      <div className="glass-panel p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-neon">👤 Who Am I</h2>
          <p className="text-gray-300 mt-2">{profile.bio}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-neon">🚀 What I Do</h2>
          <p className="text-gray-300 mt-2">I bridge the gap between development and operations, automating infrastructure, securing systems, and building resilient cloud architectures.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-neon">🎯 Career Objective</h2>
          <p className="text-gray-300 mt-2">To leverage my skills in DevOps, cloud, and cybersecurity to deliver high‑impact solutions and continuously learn emerging technologies.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-neon">🛠️ Tools I Work With</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.slice(0, 10).map((s) => (
              <span key={s.name} className="text-xs px-2 py-1 border border-neon/30 rounded-full">{s.name}</span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;