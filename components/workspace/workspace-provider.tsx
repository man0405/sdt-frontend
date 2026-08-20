"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import {
  initialProjects,
  type Project,
  type ProjectDraft,
} from "./project";

interface WorkspaceContextValue {
  projects: Project[];
  createProject: (project: ProjectDraft) => void;
  removeProject: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState(initialProjects);

  const createProject = (project: ProjectDraft) => {
    setProjects((currentProjects) => [
      {
        id: crypto.randomUUID(),
        ...project,
        chatCount: 0,
        agentCount: 0,
        fileCount: 0,
        creditsUsed: 0,
        members: [{ id: "current-user", name: "Virendra" }],
        updatedAt: "Just now",
      },
      ...currentProjects,
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
  };

  // ponytail: project data is in-memory; replace this state with persisted data when reload-safe mutations are needed.
  return (
    <WorkspaceContext.Provider value={{ projects, createProject, removeProject }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);

  if (!workspace) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }

  return workspace;
}
