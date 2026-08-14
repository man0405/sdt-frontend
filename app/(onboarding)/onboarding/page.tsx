"use client";

import { useState } from "react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthHeader } from "@/components/auth/shared/auth-header";
import { AuthLogo } from "@/components/auth/shared/auth-logo";

import {
  WorkspaceForm,
  WorkspaceValues,
} from "@/components/onboarding/workspace-form";
import { WorkspaceSuccess } from "@/components/onboarding/workspace-success";

interface WorkspaceFormData extends WorkspaceValues {
  logo: File | null;
}

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  async function handleSubmit(values: WorkspaceFormData) {
    try {
      setLoading(true);

      console.log("Workspace:", values);

      // TODO:
      // Upload logo
      // Create workspace
      // Create organization
      // Save onboarding status

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setWorkspaceName(values.name);
      setCompleted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthLogo />

        <AuthCard className="p-8">
          {completed ? (
            <WorkspaceSuccess workspaceName={workspaceName} />
          ) : (
            <div className="space-y-6">
              <AuthHeader
                title="Create your workspace"
                description="Set up your workspace to start collaborating with your team."
              />

              <WorkspaceForm
                isLoading={loading}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </AuthCard>
      </div>
    </AuthLayout>
  );
}