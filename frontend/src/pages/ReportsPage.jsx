import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReports } from '../api';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download } from 'lucide-react';

const ReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetchReports();
        setReports(res.data);
      } catch (err) {
        console.error('Error loading reports:', err);
        setError('Failed to load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <div className="text-green-400 text-xl animate-pulse">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/80 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-green-400 hover:underline flex items-center gap-2 transition-colors font-mono"
        >
          ← Back to Terminal
        </button>

        {/* Header */}
        <div className="glass-card p-6 rounded-lg border border-green-500/30 mb-8">
          <h1 className="text-4xl font-bold text-green-400 glow-text mb-2">📄 Reports & Certificates</h1>
          {/* ✅ Fixed: replaced > with {'>'} */}
          <p className="text-gray-400 font-mono">{'>'} Official documents, certifications, and achievements</p>
        </div>

        {reports.length === 0 ? (
          <div className="glass-card p-8 text-center text-gray-400">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No reports added yet.</p>
            <p className="text-sm mt-2">Use the <span className="text-green-400">Admin Dashboard</span> to add certificates and reports.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, idx) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-5 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-green-400" />
                    <h2 className="text-xl font-bold text-green-400">{report.title}</h2>
                  </div>
                  {report.pdfUrl && report.pdfUrl !== '#' && (
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-400 transition"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <p className="text-gray-300 text-sm mt-3 ml-9">{report.description}</p>
                {report.pdfUrl && report.pdfUrl !== '#' && (
                  <div className="mt-4 ml-9">
                    <a
                      href={report.pdfUrl}
                      download
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-green-500/50 rounded-md hover:bg-green-500 hover:text-black transition"
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Terminal footer */}
        <div className="mt-12 pt-4 border-t border-green-500/20 text-center text-xs text-gray-500 font-mono">
          <span className="text-green-400">$</span> reports --list --format=detailed | wc -l
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;