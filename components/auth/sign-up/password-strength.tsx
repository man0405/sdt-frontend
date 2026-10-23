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
      ? "Rất mạnh"
      : score >= 80
      ? "Mạnh"
      : score >= 60
      ? "Tốt"
      : score >= 40
      ? "Yếu"
      : "Rất yếu";

  return (
    <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Độ mạnh mật khẩu</span>

          <span className="font-medium">
            {strength}
          </span>
        </div>

        <Progress value={score} />
      </div>

      <div className="space-y-2 text-sm">
        <Requirement
          passed={checks.length}
          label="Ít nhất 8 ký tự"
        />

        <Requirement
          passed={checks.uppercase}
          label="Một chữ hoa"
        />

        <Requirement
          passed={checks.lowercase}
          label="Một chữ thường"
        />

        <Requirement
          passed={checks.number}
          label="Một chữ số"
        />

        <Requirement
          passed={checks.special}
          label="Một ký tự đặc biệt"
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