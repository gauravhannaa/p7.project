import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { fetchProfile, fetchSkills } from "../api";
import { profile as staticProfile, skills as staticSkills } from "../data/portfolioData";

const AboutPage = () => {
  const [profile, setProfile] = useState(staticProfile);
  const [skills, setSkills] = useState(staticSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, skillsRes] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
        ]);
        // If API returns valid data, use it; otherwise keep static fallback
        if (profileRes.data && Object.keys(profileRes.data).length > 0) {
          setProfile(profileRes.data);
        }
        if (skillsRes.data && skillsRes.data.length > 0) {
          setSkills(skillsRes.data);
        }
      } catch (error) {
        console.error("Error loading about data from API, using static fallback", error);
        // Keep static data (already set)
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-green-400 text-xl animate-pulse">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="System Identity / About User" />
      <div className="glass-panel p-6 space-y-6">

        {/* Who Am I */}
        <div>
          <h2 className="text-xl font-bold text-neon">👤 Who Am I</h2>
          <p className="text-green-400 mt-2">
            {profile.bio || staticProfile.bio}
          </p>
        </div>

        {/* What I Do */}
        <div>
          <h2 className="text-xl font-bold text-neon">🚀 What I Do</h2>
          <p className="text-green-400 mt-2">
            {profile.title || staticProfile.title}
          </p>
        </div>

        {/* Career Objective */}
        <div>
          <h2 className="text-xl font-bold text-neon">🎯 Career Objective</h2>
          <p className="text-green-400 mt-2">
            To proactively identify risks, reinforce system security, and maintain 
            high-availability environments while continuously evolving with modern 
            cybersecurity practices and technologies.
          </p>
        </div>

        {/* Expertise */}
        <div>
          <h2 className="text-xl font-bold text-neon">🧠 Expertise</h2>
          <ul className="text-green-400 mt-2 space-y-1 list-disc list-inside">
            <li>Enterprise System Support & Troubleshooting</li>
            <li>Network Security & Protocol Management (TCP/IP, DNS, DHCP, VPN)</li>
            <li>Windows/Linux System Administration</li>
            <li>Incident Handling & Performance Optimization</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-xl font-bold text-neon">📍 Location</h2>
          <p className="text-green-400 mt-2">
            {profile.location || staticProfile.location} | Open to Remote Opportunities
          </p>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-xl font-bold text-neon">🛡️ Mission</h2>
          <p className="text-green-400 mt-2 font-semibold tracking-wide">
            Detect. Analyze. Defend. Secure.
          </p>
        </div>

        {/* Tools I Work With */}
        <div>
          <h2 className="text-xl font-bold text-neon">🛠️ Tools I Work With</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.slice(0, 10).map((s, idx) => (
              <span
                key={s._id || idx}
                className="text-xs px-2 py-1 border border-neon/30 rounded-full text-green-400"
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