import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../api';

const ResumePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile().then(res => setProfile(res.data)).catch(console.error);
  }, []);

  // If you have a PDF file hosted, use its URL. Otherwise, provide a fallback.
  const resumeUrl = profile.resumeUrl || 'https://p7-project-1.onrender.com/uploads/resume.pdf'; // adjust

  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-4xl mx-auto glass-card p-8 rounded-lg border border-green-500/30">
        <button onClick={() => navigate('/')} className="mb-6 text-green-400 hover:underline">← Back to Terminal</button>
        <h1 className="text-4xl font-bold text-green-400 mb-6">📄 Resume</h1>
        
        <div className="space-y-6">
          <div className="border border-green-500/30 rounded p-4">
            <h2 className="text-xl font-bold text-green-400">Gaurav Tiwari</h2>
            <p className="text-gray-400">Customer & Technical Support Engineer</p>
            <div className="mt-4 flex gap-4">
              <a href={resumeUrl} download className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition">
                📥 Download Resume (PDF)
              </a>
              {resumeUrl !== '#' && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-black transition">
                  👁️ View Resume
                </a>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-4">If download doesn't work, please contact me directly.</p>
          </div>
          
          {/* Quick summary */}
          <div className="glass-panel p-4">
            <h3 className="text-lg font-bold text-green-400 mb-2">Quick Summary</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>L1/L2 Customer & Technical Support Engineer</li>
              <li>Onsite IT support at Maruti Suzuki India Ltd.</li>
              <li>Skilled in Windows/Linux, Networking, Security</li>
              <li>Certified in Cyber Security by IBM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;