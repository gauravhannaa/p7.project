import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import CertificationCard from "../components/CertificationCard";
import { certifications } from "../data/portfolioData";

const CertificationsPage = () => {
  return (
    <Layout>
      <PageHeader title="Credential Verification Terminal" />
      <div className="space-y-4">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} cert={cert} />
        ))}
      </div>
      <div className="mt-6 glass-panel p-4">
        <p className="text-sm text-gray-400">&gt; verify --cert aws-cloud-practitioner</p>
        <p className="text-neon text-sm">✓ Certificate valid. Issued by Amazon Web Services.</p>
      </div>
    </Layout>
  );
};

export default CertificationsPage;