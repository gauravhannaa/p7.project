import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";

const StatsPage = () => {
  const stats = {
    repos: 12,
    commits: 234,
    stars: 45,
    prs: 8,
    contributions: 520,
  };
  return (
    <Layout>
      <PageHeader title="Performance Monitoring Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <motion.div key={key} whileHover={{ scale: 1.05 }} className="glass-panel p-4 text-center">
            <p className="text-3xl font-bold text-neon">{value}</p>
            <p className="text-xs uppercase tracking-wider">{key}</p>
          </motion.div>
        ))}
      </div>
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-neon mb-3">📊 Contribution Activity (simulated)</h3>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="w-full aspect-square bg-neon/20 rounded-sm" style={{ opacity: Math.random() * 0.8 + 0.2 }}></div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StatsPage;