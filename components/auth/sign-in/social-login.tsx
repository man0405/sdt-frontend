"use client";

import { Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

type Provider = "google" | "github";

interface SocialLoginProps {
  loading?: Provider | null;
  onProviderClick?: (provider: Provider) => void;
}

const providers = [
  {
    id: "google" as const,
    label: "Google",
    icon: FaGoogle,
  },
  {
    id: "github" as const,
    label: "GitHub",
    icon: FaGithub,
  },
];

export function SocialLogin({
  loading = null,
  onProviderClick,
}: SocialLoginProps) {
  return (
    <div className="grid gap-3">
      {providers.map((provider) => {
        const Icon = provider.icon;
        const isLoading = loading === provider.id;

        return (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onProviderClick?.(provider.id)}
            className="h-11"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon className="mr-2 h-4 w-4" />
            )}

            Continue with {provider.label}
          </Button>
        );
      })}
    </div>
  );
}