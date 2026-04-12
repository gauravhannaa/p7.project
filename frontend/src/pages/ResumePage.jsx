import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../api';

const ResumePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then(res => setProfile(res.data || {})) // ✅ ensure object
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black/80 flex items-center justify-center">
      <div className="text-green-400 text-xl animate-pulse">Loading resume...</div>
    </div>
  );

  const resumeUrl = '/resume.pdf';

  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-4xl mx-auto glass-card p-8 rounded-lg border border-green-500/30">
        <button onClick={() => navigate('/')} className="mb-6 text-green-400 hover:underline flex items-center gap-2">
          ← Back to Terminal
        </button>
        <h1 className="text-4xl font-bold text-green-400 mb-6 glow-text">📄 Resume</h1>
        <div className="space-y-6">
          <div className="border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-2">{profile.name || 'Gaurav Tiwari'}</h2>
            <p className="text-gray-400">{profile.title || 'Customer & Technical Support Engineer'}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href={resumeUrl} 
                download 
                className="px-5 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition font-mono"
              >
                📥 Download Resume (PDF)
              </a>
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-black transition"
              >
                👁️ View Online
              </a>
            </div>
          </div>
          <div className="glass-panel p-5">
            <h3 className="text-lg font-bold text-green-400 mb-3">📋 Professional Summary</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {profile.bio || 'Customer & Technical Support Engineer with hands-on experience in L1/L2 desktop support, Windows troubleshooting, onsite IT operations at Maruti Suzuki India Ltd.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;