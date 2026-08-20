"use client";

import { ProjectCard } from "./project-card";
import type { Project, ProjectView } from "./project";

interface ProjectListProps {
  projects: Project[];
  view: ProjectView;
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectList({
  projects,
  view,
  onOpen,
  onEdit,
  onArchive,
  onDelete,
}: ProjectListProps) {
  if (view === "grid") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
            onEdit={onEdit}
            onArchive={onArchive}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y rounded-xl border">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          className="flex items-center gap-3 p-4 text-left hover:bg-accent/50"
          onClick={() => onOpen(project.id)}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.name.charAt(0)}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block truncate text-sm font-medium">{project.name}</span>
            <span className="block truncate text-xs text-muted-foreground">
              {project.description}
            </span>
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">{project.updatedAt}</span>
        </button>
      ))}
    </div>
  );
}
