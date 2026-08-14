"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProjectCard, type Project } from "@/components/workspace/project-card";
import { CreateProjectDialog } from "@/components/workspace/create-project-dialog";
import { WorkspaceEmptyState } from "@/components/workspace/workspace-empty-state";
import { WorkspaceFilterBar } from "@/components/workspace/workspace-filter-bar";

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Marketing Campaign Q3",
    description: "Ad copy generation, campaign brainstorming, and content calendar.",
    color: "#6366f1",
    chatCount: 24,
    agentCount: 2,
    fileCount: 12,
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
    members: [
      { id: "1", name: "Alex Martin" },
      { id: "3", name: "James Wilson" },
    ],
    updatedAt: "2w ago",
  }
];

export default function WorkspacePage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (data: { name: string; description: string; color: string }) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      color: data.color,
      chatCount: 0,
      agentCount: 0,
      fileCount: 0,
      members: [{ id: "current-user", name: "Virendra" }],
      updatedAt: "Just now",
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleArchive = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // In a real app: move to an "archived" list instead of deleting
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Workspace</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your chats, agents, and files into projects.
          </p>
        </div>

        {projects.length > 0 && <CreateProjectDialog onCreate={handleCreate} />}
      </div>

      {projects.length > 0 && (
        <WorkspaceFilterBar
          search={search}
          onSearchChange={setSearch}
          view={view}
          onViewChange={setView}
        />
      )}

      {projects.length === 0 ? (
        <WorkspaceEmptyState onCreate={handleCreate} />
      ) : filteredProjects.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          No projects match your search.
        </p>
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => router.push("/workspace/details")}
              onEdit={(id) => console.log("edit", id)}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col divide-y rounded-xl border">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-3 p-4 hover:bg-accent/50 cursor-pointer"
              onClick={() => router.push("/workspace/details")}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: project.color }}
              >
                {project.name.charAt(0)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{project.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {project.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {project.updatedAt}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}