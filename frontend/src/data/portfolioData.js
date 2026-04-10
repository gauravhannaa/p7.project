export const profile = {
  name: "Gaurav Tiwari",
  username: "gauravhanna",
  role: "DevOps / Cloud / Cybersecurity Engineer",
  location: "Gurgaon, India",
  email: "gauravhanna2003@gmail.com",
  phone: "+91 9664609473",
  availability: "Available for remote work",
  bio: "Hands-on experience in L1/L2 support, Windows, networking, security. Passionate about cloud, automation, and DevSecOps.",
  github: "https://github.com/gauravhannaa",
  linkedin: "https://linkedin.com/in/gaurav-tiwari",
  instagram: "https://instagram.com/mrx_gaurav__007",
};

export const skills = [
  { name: "AWS", percentage: 85, category: "Cloud" },
  { name: "Docker", percentage: 80, category: "Container" },
  { name: "Kubernetes", percentage: 75, category: "Orchestration" },
  { name: "Linux", percentage: 90, category: "OS" },
  { name: "Python", percentage: 70, category: "Programming" },
  { name: "Terraform", percentage: 65, category: "IaC" },
  { name: "GitHub Actions", percentage: 75, category: "CI/CD" },
  { name: "Jenkins", percentage: 60, category: "CI/CD" },
  { name: "Ansible", percentage: 55, category: "Config" },
  { name: "Networking", percentage: 80, category: "Infra" },
  { name: "Cybersecurity", percentage: 70, category: "Security" },
  { name: "Monitoring (Prometheus/Grafana)", percentage: 65, category: "Observability" },
];

export const projects = [
  {
    id: 1,
    title: "CI/CD Pipeline Automation",
    summary: "Automated build/test/deploy using GitHub Actions and AWS ECS.",
    tech: ["GitHub Actions", "AWS", "Docker", "Node.js"],
    github: "https://github.com/gauravhannaa/ci-cd-demo",
    demo: "#",
    status: "Completed",
    category: "DevOps",
  },
  {
    id: 2,
    title: "Kubernetes Deployment Project",
    summary: "Deployed microservices on EKS with Helm and monitoring stack.",
    tech: ["K8s", "Helm", "Terraform", "Prometheus"],
    github: "#",
    demo: "#",
    status: "In Progress",
    category: "Cloud",
  },
  // Add more as needed
];

export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    id: "AWS-CCP-12345",
    verifyUrl: "#",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    date: "2024",
    id: "CKA-67890",
    verifyUrl: "#",
  },
  // more
];

export const experiences = [
  {
    company: "Starlink Communication Pvt. Ltd.",
    role: "Customer & Technical Support Engineer",
    duration: "Nov 2025 – Present",
    responsibilities: [
      "L1/L2 support at Maruti Suzuki India Ltd.",
      "Windows/Linux troubleshooting",
      "Networking & hardware support",
    ],
    tools: ["Windows", "Linux", "CRM", "Ticketing"],
  },
  {
    company: "APMP MOTOR LLP",
    role: "Technical Support Engineer",
    duration: "Aug 2025 – Nov 2025",
    responsibilities: [
      "Desktop support, IT asset management",
      "Software installation and user assistance",
    ],
    tools: ["Windows", "Office 365"],
  },
];

export const repositories = [
  {
    name: "k8s-deployment-tool",
    description: "CLI tool for deploying apps to Kubernetes",
    language: "Go",
    stars: 12,
    forks: 3,
    updated: "2025-01-15",
    url: "#",
  },
  {
    name: "aws-terraform-modules",
    description: "Reusable Terraform modules for AWS",
    language: "HCL",
    stars: 8,
    forks: 2,
    updated: "2025-02-01",
    url: "#",
  },
];