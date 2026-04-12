import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { fetchRepositories } from "../api";
import { repositories as staticRepositories } from "../data/portfolioData";
import { GitFork, Star, Clock } from "lucide-react";

const RepositoriesPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const res = await fetchRepositories();
        if (res.data && res.data.length > 0) {
          setRepositories(res.data);
        } else {
          // Fallback to static data if API returns empty
          setRepositories(staticRepositories);
        }
      } catch (error) {
        console.error("Error loading repositories from API, using static fallback", error);
        setRepositories(staticRepositories);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-green-400 text-xl animate-pulse">Loading repositories...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Git Repository Terminal" subtitle="Clone and explore my code" />
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo._id || repo.name} className="glass-panel p-4 flex flex-wrap justify-between items-center">
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