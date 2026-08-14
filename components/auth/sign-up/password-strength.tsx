"use client";

import { Check, X } from "lucide-react";

import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;

  const score = (passed / 5) * 100;

  const strength =
    score === 100
      ? "Very Strong"
      : score >= 80
      ? "Strong"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Weak"
      : "Very Weak";

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Password Strength</span>

          <span className="font-medium">
            {strength}
          </span>
        </div>

        <Progress value={score} />
      </div>

      <div className="space-y-2 text-sm">
        <Requirement
          passed={checks.length}
          label="At least 8 characters"
        />

        <Requirement
          passed={checks.uppercase}
          label="One uppercase letter"
        />

        <Requirement
          passed={checks.lowercase}
          label="One lowercase letter"
        />

        <Requirement
          passed={checks.number}
          label="One number"
        />

        <Requirement
          passed={checks.special}
          label="One special character"
        />
      </div>
    </div>
  );
}

interface RequirementProps {
  passed: boolean;
  label: string;
}

function Requirement({
  passed,
  label,
}: RequirementProps) {
  return (
    <div className="flex items-center gap-2">
      {passed ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}

      <span
        className={
          passed
            ? "text-foreground"
            : "text-muted-foreground"
        }
      >
        {label}
      </span>
    </div>
  );
}