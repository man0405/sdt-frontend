"use client";

import { useState } from "react";
import { Image as ImageIcon, Globe, Check } from "lucide-react";

import { SettingsSection } from "@/components/settings/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const colorPresets = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#ec4899" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Sky", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Teal", value: "#14b8a6" },
];

export default function BrandingSettingsPage() {
  const [primaryColor, setPrimaryColor] = useState(colorPresets[0].value);
  const [customDomain, setCustomDomain] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const domainVerified = false; // simulate pending verification state

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Branding</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize how your workspace looks to your team and customers.
        </p>
      </div>

      <SettingsSection
        title="Logo"
        description="Displayed in the sidebar, emails, and shared pages."
        footer={
          <>
            <Button variant="outline" size="sm">
              Remove
            </Button>
            <Button size="sm">Upload logo</Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
            <ImageIcon className="size-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            Square image recommended. PNG or SVG, max 2MB, transparent
            background preferred.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Favicon"
        description="Shown in browser tabs."
        footer={
          <>
            <Button variant="outline" size="sm">
              Remove
            </Button>
            <Button size="sm">Upload favicon</Button>
          </>
        }
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/30">
            <ImageIcon className="size-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">
            .ico or 32x32 PNG recommended.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Primary color"
        description="Used for buttons, links, and accents throughout your workspace."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        }
      >
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {colorPresets.map((color) => (
            <button
              key={color.value}
              onClick={() => setPrimaryColor(color.value)}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform hover:scale-105"
                style={{ backgroundColor: color.value }}
              >
                {primaryColor === color.value && (
                  <Check className="size-4 text-white" />
                )}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {color.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Label htmlFor="custom-color" className="text-xs shrink-0">
            Custom hex
          </Label>
          <Input
            id="custom-color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-32 font-mono text-xs h-8"
          />
          <span
            className="h-8 w-8 rounded-md border shrink-0"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Custom domain"
        description="Use your own domain instead of orbit.app."
        footer={
          <Button size="sm" onClick={handleSave} disabled={saving || !customDomain.trim()}>
            {saving ? "Verifying..." : "Verify domain"}
          </Button>
        }
      >
        <div className="space-y-2">
          <Label htmlFor="custom-domain">Domain</Label>
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground shrink-0" />
            <Input
              id="custom-domain"
              placeholder="app.yourcompany.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
            />
            {customDomain.trim() && (
              <Badge
                variant="secondary"
                className={
                  domainVerified
                    ? "bg-emerald-500/10 text-emerald-600 border-0 shrink-0"
                    : "bg-amber-500/10 text-amber-600 border-0 shrink-0"
                }
              >
                {domainVerified ? "Verified" : "Pending"}
              </Badge>
            )}
          </div>
        </div>

        {customDomain.trim() && !domainVerified && (
          <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
            <p className="text-xs font-medium">Add this DNS record to verify:</p>
            <div className="grid grid-cols-[60px_1fr] gap-x-4 gap-y-1 text-xs font-mono">
              <span className="text-muted-foreground">Type</span>
              <span>CNAME</span>
              <span className="text-muted-foreground">Name</span>
              <span>{customDomain.split(".")[0] || "app"}</span>
              <span className="text-muted-foreground">Value</span>
              <span>cname.orbit.app</span>
            </div>
          </div>
        )}
      </SettingsSection>
    </div>
  );
}