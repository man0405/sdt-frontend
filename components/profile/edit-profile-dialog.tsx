"use client";

import { useState } from "react";
import { Camera, User, Briefcase, Globe2, FileText, X, Plus } from "lucide-react";

import { profile } from "./mock-data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </span>
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
}

export function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    company: profile.company,
    jobTitle: profile.jobTitle,
    country: profile.country,
    timezone: profile.timezone,
    language: profile.language,
    bio: profile.bio,
  });

  const [skills, setSkills] = useState<string[]>(
    typeof profile.skills === "string"
      ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : profile.skills
  );
  const [skillInput, setSkillInput] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSave = () => {
    // In real app: send { ...form, skills } to your update-profile API
    console.log("saving profile:", { ...form, skills });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your personal information and public profile.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div className="group relative shrink-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.initials}</AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-xs">
                  First name
                </Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-xs">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <SectionHeader icon={User} title="Contact" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Work */}
          <div className="space-y-4">
            <SectionHeader icon={Briefcase} title="Work" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs">
                  Company
                </Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jobTitle" className="text-xs">
                  Job title
                </Label>
                <Input
                  id="jobTitle"
                  value={form.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Region */}
          <div className="space-y-4">
            <SectionHeader icon={Globe2} title="Region" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-xs">
                  Country
                </Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="timezone" className="text-xs">
                  Timezone
                </Label>
                <Input
                  id="timezone"
                  value={form.timezone}
                  onChange={(e) => updateField("timezone", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="language" className="text-xs">
                  Language
                </Label>
                <Input
                  id="language"
                  value={form.language}
                  onChange={(e) => updateField("language", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <SectionHeader icon={FileText} title="About" />

            <div className="space-y-1.5">
              <Label htmlFor="bio" className="text-xs">
                Bio
              </Label>
              <Textarea
                id="bio"
                rows={4}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Skills</Label>
              <div className="flex flex-wrap gap-1.5 rounded-lg border p-2.5">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-1 pr-1 text-xs"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="rounded-full p-0.5 hover:bg-foreground/10"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </Badge>
                ))}

                <div className="flex items-center gap-1">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Add a skill..."
                    className="min-w-[100px] flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                  />
                  {skillInput.trim() && (
                    <button
                      onClick={addSkill}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Press Enter to add a skill.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}