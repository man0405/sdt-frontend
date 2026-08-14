"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Loader2 } from "lucide-react";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { WorkspaceLogoUpload } from "./workspace-logo-upload";
import { WorkspaceSlugInput } from "./workspace-slug-input";
import { WorkspaceIndustrySelect } from "./workspace-industry-select";
import { WorkspaceSizeSelect } from "./workspace-size-select";

const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 characters."),

  slug: z
    .string()
    .min(2, "Workspace URL is required.")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers and hyphens are allowed."
    ),

  industry: z.string().min(1, "Please select an industry."),

  teamSize: z.string().min(1, "Please select a team size."),
});

export type WorkspaceValues = z.infer<typeof workspaceSchema>;

interface WorkspaceFormData extends WorkspaceValues {
  logo: File | null;
}

interface WorkspaceFormProps {
  isLoading?: boolean;
  onSubmit?: (
    values: WorkspaceFormData
  ) => Promise<void> | void;
}

export function WorkspaceForm({
  isLoading = false,
  onSubmit,
}: WorkspaceFormProps) {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WorkspaceValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
      industry: "",
      teamSize: "",
    },
  });

  const workspaceName = useWatch({
    control,
    name: "name",
  });

  const slug = useWatch({
    control,
    name: "slug",
  });

  const industry = useWatch({
    control,
    name: "industry",
  });

  const teamSize = useWatch({
    control,
    name: "teamSize",
  });

  useEffect(() => {
    if (!logo) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(logo);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [logo]);

  const handleSlugChange = useCallback(
    (value: string) => {
      setValue("slug", value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleIndustryChange = useCallback(
    (value: string) => {
      setValue("industry", value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleTeamSizeChange = useCallback(
    (value: string) => {
      setValue("teamSize", value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  async function submit(values: WorkspaceValues) {
    await onSubmit?.({
      ...values,
      logo,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
    >
      <WorkspaceLogoUpload
        value={preview}
        onChange={setLogo}
      />

      <div className="space-y-2">
        <Label htmlFor="name">
          Workspace Name
        </Label>

        <Input
          id="name"
          placeholder="Acme Inc."
          disabled={isLoading}
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <WorkspaceSlugInput
        workspaceName={workspaceName ?? ""}
        slug={slug ?? ""}
        disabled={isLoading}
        onChange={handleSlugChange}
      />

      {errors.slug && (
        <p className="text-sm text-destructive">
          {errors.slug.message}
        </p>
      )}

      <WorkspaceIndustrySelect
        value={industry ?? ""}
        disabled={isLoading}
        onChange={handleIndustryChange}
      />

      {errors.industry && (
        <p className="text-sm text-destructive">
          {errors.industry.message}
        </p>
      )}

      <WorkspaceSizeSelect
        value={teamSize ?? ""}
        disabled={isLoading}
        onChange={handleTeamSizeChange}
      />

      {errors.teamSize && (
        <p className="text-sm text-destructive">
          {errors.teamSize.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        Create Workspace
      </Button>
    </form>
  );
}