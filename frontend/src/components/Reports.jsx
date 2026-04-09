import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchReports } from '../api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    loadReports();
  }, []);
  
  const loadReports = async () => {
    try {
      const { data } = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };
  
  return (
    <section id="reports" className="py-20 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Security Reports /&gt;
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reports.map((report, idx) => (
            <a 
              key={report._id}
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-6 transition-all duration-500 delay-${idx * 100} hover:border-hacker-green/60 hover:scale-105 block ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-bold text-hacker-green mb-2">{report.title}</h3>
              <p className="text-gray-400 text-sm">{report.description}</p>
              <div className="mt-4 text-hacker-green/70 text-sm">📄 Download PDF →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reports;