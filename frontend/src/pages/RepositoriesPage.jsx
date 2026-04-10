import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { repositories } from "../data/portfolioData";
import { GitFork, Star, Clock } from "lucide-react";

const RepositoriesPage = () => {
  return (
    <Layout>
      <PageHeader title="Git Repository Terminal" subtitle="Clone and explore my code" />
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.name} className="glass-panel p-4 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-neon">{repo.name}</h3>
              <p className="text-sm text-gray-400">{repo.description}</p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1"><Star size={12} /> {repo.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {repo.updated}</span>
                <span className="text-neon/70">{repo.language}</span>
              </div>
            </div>
            <button className="mt-2 md:mt-0 text-xs border border-neon/30 px-3 py-1 rounded hover:bg-neon/10">
              git clone
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default RepositoriesPage;