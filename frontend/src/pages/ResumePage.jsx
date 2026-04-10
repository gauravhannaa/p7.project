import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import ResumePanel from "../components/ResumePanel";

const ResumePage = () => {
  return (
    <Layout>
      <PageHeader title="Resume Access Terminal" />
      <ResumePanel />
    </Layout>
  );
};

export default ResumePage;