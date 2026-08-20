export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  chatCount: number;
  agentCount: number;
  fileCount: number;
  creditsUsed: number;
  members: ProjectMember[];
  updatedAt: string;
}

export interface ProjectDraft {
  name: string;
  description: string;
  color: string;
}

export type ProjectView = "grid" | "list";

export const initialProjects: Project[] = [
  {
    id: "1",
    name: "Marketing Campaign Q3",
    description: "Ad copy generation, campaign brainstorming, and content calendar.",
    color: "#6366f1",
    chatCount: 24,
    agentCount: 2,
    fileCount: 12,
    creditsUsed: 1840,
    members: [
      { id: "1", name: "Alex Martin" },
      { id: "2", name: "Sarah Chen" },
    ],
    updatedAt: "2h ago",
  },
  {
    id: "2",
    name: "Product Launch",
    description: "Feature docs, launch messaging, and press kit generation.",
    color: "#ec4899",
    chatCount: 41,
    agentCount: 3,
    fileCount: 28,
    creditsUsed: 3200,
    members: [
      { id: "1", name: "Alex Martin" },
      { id: "3", name: "James Wilson" },
      { id: "4", name: "Priya Patel" },
    ],
    updatedAt: "5h ago",
  },
  {
    id: "3",
    name: "Customer Research",
    description: "Interview transcripts, survey analysis, and persona building.",
    color: "#10b981",
    chatCount: 8,
    agentCount: 1,
    fileCount: 34,
    creditsUsed: 960,
    members: [{ id: "2", name: "Sarah Chen" }],
    updatedAt: "1d ago",
  },
  {
    id: "4",
    name: "Product Development",
    description: "Feature planning, development sprints, and technical documentation.",
    color: "#f59e0b",
    chatCount: 15,
    agentCount: 2,
    fileCount: 22,
    creditsUsed: 1420,
    members: [
      { id: "1", name: "Alex Martin" },
      { id: "3", name: "James Wilson" },
    ],
    updatedAt: "3d ago",
  },
  {
    id: "5",
    name: "Sales Enablement",
    description: "Sales scripts, presentation decks, and customer success stories.",
    color: "#8b5cf6",
    chatCount: 12,
    agentCount: 1,
    fileCount: 18,
    creditsUsed: 1180,
    members: [
      { id: "2", name: "Sarah Chen" },
      { id: "4", name: "Priya Patel" },
    ],
    updatedAt: "1w ago",
  },
  {
    id: "6",
    name: "Content Strategy",
    description: "Blog post planning, social media content, and SEO optimization.",
    color: "#06b6d4",
    chatCount: 9,
    agentCount: 1,
    fileCount: 15,
    creditsUsed: 780,
    members: [
      { id: "1", name: "Alex Martin" },
      { id: "3", name: "James Wilson" },
    ],
    updatedAt: "2w ago",
  },
];
