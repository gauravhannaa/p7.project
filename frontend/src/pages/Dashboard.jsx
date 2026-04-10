import Layout from "../components/Layout";
import SkillCard from "../components/SkillCard";
import CommandTerminal from "../components/CommandTerminal";
import { profile, skills } from "../data/portfolioData";
import TypewriterText from "../components/TypewriterText";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome terminal panel */}
        <div className="glass-panel p-6">
          <h1 className="text-2xl font-bold text-neon mb-2">
            <TypewriterText text="Welcome to the portfolio system" delay={30} />
          </h1>
          <div className="mt-4 font-mono text-sm space-y-1 text-gray-300">
            <p>&gt; User: {profile.name}</p>
            <p>&gt; Role: {profile.role}</p>
            <p>&gt; Status: {profile.availability}</p>
            <p>&gt; Focus: AWS, Docker, Kubernetes, Terraform, CI/CD, Security</p>
            <p>&gt; Certifications: AWS, CKA (in progress), IBM Cybersecurity</p>
            <p>&gt; Email: {profile.email}</p>
          </div>
        </div>

        {/* Core skills overview */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-neon mb-4">⚡ Core Skills Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.slice(0, 8).map((skill) => (
              <SkillCard key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </div>

        {/* Interactive command terminal */}
        <CommandTerminal />
      </div>
    </Layout>
  );
};

export default Dashboard;