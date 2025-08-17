
export type Agent = {
  id: string;
  name: string;
  nameIntials: string;
  description: string;
  slug: string;
};

const agents: Agent[] = [
  {
    id: "1",
    name: "Smart Router",
    nameIntials: "SR",
    description: "Automatically routes to the best agent for your needs",
    slug: "smart-router",
  },
  {
    id: "2",
    name: "Property Analyzer",
    nameIntials: "PA",
    description: "Image analysis for property issues and troubleshooting",
    slug: "property-analyzer",
  },
  {
    id: "3",
    name: "Tenancy FAQ",
    nameIntials: "TF",
    description: "Legal guidance and rental questions",
    slug: "tenancy-faq",
  },
];

export default agents;