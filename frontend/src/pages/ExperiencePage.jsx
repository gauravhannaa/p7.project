import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { experiences } from "../data/portfolioData";

const ExperiencePage = () => {
  return (
    <Layout>
      <PageHeader title="Professional Experience Logs" />
      <div className="glass-panel p-6">
        <ExperienceTimeline experiences={experiences} />
      </div>
    </Layout>
  );
};

export default ExperiencePage;