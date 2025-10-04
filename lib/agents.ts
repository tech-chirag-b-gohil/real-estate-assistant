
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
    name: "Property Analyzer",
    nameIntials: "PA",
    description: "Image analysis for property issues and troubleshooting",
    slug: "property-analyzer",
  },
  {
    id: "2",
    name: "Tenancy FAQ",
    nameIntials: "TF",
    description: "Legal guidance and rental questions",
    slug: "tenancy-faq",
  },
];

export default agents;