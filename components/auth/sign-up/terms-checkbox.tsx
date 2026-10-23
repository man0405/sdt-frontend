"use client";

import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsCheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TermsCheckbox({
  checked,
  disabled = false,
  onCheckedChange,
}: TermsCheckboxProps) {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox
        id="terms"
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) =>
          onCheckedChange(value === true)
        }
      />

      <Label
        htmlFor="terms"
        className="cursor-pointer text-sm leading-6 font-normal text-muted-foreground"
      >
        Tôi đồng ý với{" "}
        <Link
          href="/terms"
          className="font-medium text-primary hover:underline"
        >
          Điều khoản dịch vụ
        </Link>{" "}

        và{" "}
        <Link
          href="/privacy"
          className="font-medium text-primary hover:underline"
        >
          Chính sách quyền riêng tư
        </Link>
        .
      </Label>
    </div>
  );
}