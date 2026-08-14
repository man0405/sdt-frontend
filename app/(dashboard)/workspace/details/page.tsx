"use client";

import { use } from "react";

import {
  Bot,
  Database,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProjectHeader } from "@/components/workspace/detail/project-header";
import { ProjectOverviewTab } from "@/components/workspace/detail/project-overview-tab";
import { ProjectChatsTab } from "@/components/workspace/detail/project-chats-tab";
import { ProjectFilesTab } from "@/components/workspace/detail/project-files-tab";
import { ProjectMembersTab } from "@/components/workspace/detail/project-members-tab";

// Future components
import { ProjectAgentsTab } from "@/components/workspace/detail/project-agents-tab";
import { ProjectKnowledgeTab } from "@/components/workspace/detail/project-knowledge-tab";
import { ProjectPlaygroundTab } from "@/components/workspace/detail/project-playground-tab";
import { ProjectSettingsTab } from "@/components/workspace/detail/project-settings-tab";

const project = {
  id: "1",
  name: "Marketing Campaign Q3",
  description:
    "Ad copy generation, campaign brainstorming, and content calendar.",

  color: "#6366f1",

  status: "Active",
  visibility: "Private",

  model: "GPT-5",

  storageUsed: "8.2 GB",
  storageLimit: "10 GB",

  chatCount: 24,
  agentCount: 2,
  fileCount: 12,
  knowledgeCount: 18,

  creditsUsed: 1840,

  members: [
    {
      id: "1",
      name: "Alex Martin",
    },
    {
      id: "2",
      name: "Sarah Chen",
    },
  ],
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <ProjectHeader
        name={project.name}
        description={project.description}
        color={project.color}
        members={project.members}
        onEdit={() => console.log("edit", id)}
        onArchive={() => console.log("archive", id)}
        onDelete={() => console.log("delete", id)}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        {/* TabsList: horizontal scroll on mobile */}
        <TabsList className="flex flex-wrap md:flex-nowrap md:justify-start gap-2 overflow-x-auto md:overflow-visible">
          <TabsTrigger value="overview" className="flex items-center gap-1 px-3 py-2">
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>

          <TabsTrigger value="chats" className="flex items-center gap-1 px-3 py-2">
            <MessageSquare className="size-4" />
            <span className="hidden sm:inline">Chats</span>
          </TabsTrigger>

          <TabsTrigger value="agents" className="flex items-center gap-1 px-3 py-2">
            <Bot className="size-4" />
            <span className="hidden sm:inline">Agents</span>
          </TabsTrigger>

          <TabsTrigger value="knowledge" className="flex items-center gap-1 px-3 py-2">
            <Database className="size-4" />
            <span className="hidden sm:inline">Knowledge</span>
          </TabsTrigger>

          <TabsTrigger value="files" className="flex items-center gap-1 px-3 py-2">
            <FolderOpen className="size-4" />
            <span className="hidden sm:inline">Files</span>
          </TabsTrigger>

          <TabsTrigger value="members" className="flex items-center gap-1 px-3 py-2">
            <Users className="size-4" />
            <span className="hidden sm:inline">Members</span>
          </TabsTrigger>

          <TabsTrigger value="playground" className="flex items-center gap-1 px-3 py-2">
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">Playground</span>
          </TabsTrigger>

          <TabsTrigger value="settings" className="flex items-center gap-1 px-3 py-2">
            <Settings2 className="size-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* TabsContent stays the same */}
        <TabsContent value="overview">
          <ProjectOverviewTab
            chatCount={project.chatCount}
            agentCount={project.agentCount}
            fileCount={project.fileCount}
            creditsUsed={project.creditsUsed}
          />
        </TabsContent>

        <TabsContent value="chats">
          <ProjectChatsTab />
        </TabsContent>

        <TabsContent value="agents">
          <ProjectAgentsTab />
        </TabsContent>

        <TabsContent value="knowledge">
          <ProjectKnowledgeTab />
        </TabsContent>

        <TabsContent value="files">
          <ProjectFilesTab />
        </TabsContent>

        <TabsContent value="members">
          <ProjectMembersTab />
        </TabsContent>

        <TabsContent value="playground">
          <ProjectPlaygroundTab />
        </TabsContent>

        <TabsContent value="settings">
          <ProjectSettingsTab />
        </TabsContent>
      </Tabs>

    </div>
  );
}