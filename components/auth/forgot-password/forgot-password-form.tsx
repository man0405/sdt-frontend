"use client";

import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ."),
});

export type ForgotPasswordValues = z.infer<
  typeof forgotPasswordSchema
>;

interface ForgotPasswordFormProps {
  isLoading?: boolean;
  onSubmit?: (
    values: ForgotPasswordValues
  ) => Promise<void> | void;
}

export function ForgotPasswordForm({
  isLoading = false,
  onSubmit,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function submit(values: ForgotPasswordValues) {
    await onSubmit?.(values);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="email">
          Địa chỉ email
        </Label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="an@example.com"
            className="pl-10"
            disabled={isLoading}
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        Gửi liên kết đặt lại
      </Button>
    </form>
  );
}