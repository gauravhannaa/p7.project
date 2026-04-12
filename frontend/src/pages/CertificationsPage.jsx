import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import CertificationCard from "../components/CertificationCard";
import { certifications } from "../data/portfolioData";

const CertificationsPage = () => {
  return (
    <Layout>
      <PageHeader title="Credential Verification Terminal" />

      {/* Intro Section */}
      <div className="glass-panel p-6 space-y-4 mb-6">
        <h2 className="text-xl font-bold text-neon">
          🎓 Certifications & Professional Development
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          With a strong commitment to continuous learning and professional growth, 
          I have completed multiple industry-recognized certifications across cyber 
          security, software development, networking, and system technologies. These 
          certifications reflect my dedication to building a solid technical foundation 
          and advancing towards a specialized career in cyber security and secure system engineering.
        </p>
      </div>

      {/* Certification Highlights (Static Professional Content) */}
      <div className="glass-panel p-6 space-y-5 mb-6 text-sm text-gray-300">

        <div>
          <h3 className="text-neon font-semibold">🔐 Cyber Security – IBM SkillBuild</h3>
          <p>
            Successfully completed Cyber Security training under the IBM SkillBuild 
            Student Ambassador Program. Gained foundational knowledge in security principles, 
            threat analysis, risk management, and security posture improvement.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">💻 Accenture Job Simulation</h3>
          <p>
            Completed advanced coding and development simulation. Worked on problem-solving, 
            C programming, and enterprise-level workflows.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">🧠 Walmart Global Tech Simulation</h3>
          <p>
            Focused on advanced software engineering concepts including system design, 
            debugging, and real-world engineering challenges.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">🌐 Web Development using C#</h3>
          <p>
            Built dynamic web applications using ASP.NET and C#, with hands-on backend 
            development and scalable architecture design.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">📱 Android Development</h3>
          <p>
            Developed foundational Android applications using Core Java, covering UI, 
            lifecycle management, and app structure.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">🏭 Industrial Training – Netcamp</h3>
          <p>
            Gained practical exposure to real-world IT environments and software development workflows.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">🌍 Networking & Web Fundamentals</h3>
          <p>
            Learned system connectivity, troubleshooting, and web technologies to strengthen 
            infrastructure-level understanding.
          </p>
        </div>

        <div>
          <h3 className="text-neon font-semibold">🧩 NIIT Foundation</h3>
          <p>
            Focused on digital productivity, communication skills, and essential corporate tools.
          </p>
        </div>

      </div>

      {/* Dynamic Certification Cards */}
      <div className="space-y-4">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>

      {/* Verification Section */}
      <div className="mt-6 glass-panel p-4 space-y-2">
        <p className="text-sm text-gray-400">
          &gt; verify --cert all_credentials
        </p>
        <p className="text-neon text-sm">
          ✓ All certifications verified. Details available on LinkedIn profile.
        </p>
      </div>

    </Layout>
  );
};

export default CertificationsPage;