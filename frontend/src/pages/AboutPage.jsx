import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { profile, skills } from "../data/portfolioData";

const AboutPage = () => {
  return (
    <Layout>
      <PageHeader title="System Identity / About User" />
      <div className="glass-panel p-6 space-y-6">

        {/* Who Am I */}
        <div>
          <h2 className="text-xl font-bold text-neon">👤 Who Am I</h2>
          <p className="text-gray-300 mt-2">
            Tech Support Engineer & Cyber Security Enthusiast with hands-on experience in 
            diagnosing complex system issues, securing infrastructures, and maintaining 
            high-performance environments. Passionate about protecting systems and ensuring 
            seamless user experiences across enterprise platforms.
          </p>
        </div>

        {/* What I Do */}
        <div>
          <h2 className="text-xl font-bold text-neon">🚀 What I Do</h2>
          <p className="text-gray-300 mt-2">
            I specialize in enterprise-level technical support, advanced troubleshooting, 
            and system security. My work involves managing network protocols, resolving 
            critical incidents, and strengthening system defenses across Windows and Linux 
            environments.
          </p>
        </div>

        {/* Career Objective */}
        <div>
          <h2 className="text-xl font-bold text-neon">🎯 Career Objective</h2>
          <p className="text-gray-300 mt-2">
            To proactively identify risks, reinforce system security, and maintain 
            high-availability environments while continuously evolving with modern 
            cybersecurity practices and technologies.
          </p>
        </div>

        {/* Expertise */}
        <div>
          <h2 className="text-xl font-bold text-neon">🧠 Expertise</h2>
          <ul className="text-gray-300 mt-2 space-y-1 list-disc list-inside">
            <li>Enterprise System Support & Troubleshooting</li>
            <li>Network Security & Protocol Management (TCP/IP, DNS, DHCP, VPN)</li>
            <li>Windows/Linux System Administration</li>
            <li>Incident Handling & Performance Optimization</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-neon">📍 Location</h2>
          <p className="text-gray-300 mt-2">
            Gurgaon, Haryana, India | Open to Remote Opportunities
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-xl font-bold text-neon">🛡️ Mission</h2>
          <p className="text-gray-300 mt-2 font-semibold tracking-wide">
            Detect. Analyze. Defend. Secure.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-xl font-bold text-neon">🛠️ Tools I Work With</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.slice(0, 10).map((s) => (
              <span
                key={s.name}
                className="text-xs px-2 py-1 border border-neon/30 rounded-full"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AboutPage;