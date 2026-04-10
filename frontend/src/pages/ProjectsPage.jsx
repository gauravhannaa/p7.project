import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/portfolioData";

const ProjectsPage = () => {
  return (
    <Layout>
      <PageHeader title="Project Explorer Terminal" subtitle="List of DevOps / Cloud / Security projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Layout>
  );
};

export default ProjectsPage;