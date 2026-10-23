"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordStrength } from "./password-strength";
import { TermsCheckbox } from "./terms-checkbox";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tên phải có ít nhất 2 ký tự."),

    email: z
      .string()
      .email("Vui lòng nhập địa chỉ email hợp lệ."),

    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự."),

    confirmPassword: z.string(),

    terms: z.boolean().refine((value) => value === true, {
      message: "Bạn phải chấp nhận Điều khoản dịch vụ.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp.",
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  isLoading?: boolean;
  onSubmit?: (values: SignUpValues) => Promise<void> | void;
}

export function SignUpForm({
  isLoading = false,
  onSubmit,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");
  const terms = watch("terms");

  async function submit(values: SignUpValues) {
    await onSubmit?.(values);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Họ và tên</Label>

        <Input
          id="name"
          placeholder="Nguyễn Văn An"
          disabled={isLoading}
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Địa chỉ email</Label>

        <Input
          id="email"
          type="email"
          placeholder="an@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Tạo mật khẩu"
            disabled={isLoading}
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <PasswordStrength password={password} />

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Xác nhận mật khẩu
        </Label>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            disabled={isLoading}
            {...register("confirmPassword")}
          />

          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
          >
            {showConfirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="space-y-2">
        <TermsCheckbox
          checked={terms}
          disabled={isLoading}
          onCheckedChange={(checked) =>
            setValue("terms", checked, {
              shouldValidate: true,
            })
          }
        />

        {errors.terms && (
          <p className="text-sm text-destructive">
            {errors.terms.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        Tạo tài khoản
      </Button>
    </form>
  );
}
