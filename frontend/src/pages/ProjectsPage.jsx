import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import { projects as staticProjects } from "../data/portfolioData";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchProjects();
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          // Fallback to static data if API returns empty
          setProjects(staticProjects);
        }
      } catch (error) {
        console.error("Error loading projects from API, using static fallback", error);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-green-400 text-xl animate-pulse">Loading projects...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Project Explorer Terminal" subtitle="List of DevOps / Cloud / Security projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project._id || project.id} project={project} />
        ))}
      </div>
    </Layout>
  );
};

export default ProjectsPage;