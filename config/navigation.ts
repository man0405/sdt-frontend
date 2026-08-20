import { NavItem } from "@/types/navigation";
import {
  LayoutDashboard,
  MessagesSquare,
  Settings
} from "lucide-react";

export const navigation: NavItem[] = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Phản hồi",
    href: "/feedback",
    icon: MessagesSquare,
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: Settings,
  },
  // {
  //   title: "Tài khoản",
  //   href: "/profile",
  //   icon: UserRoundPen,
  // },
  // {
  // title: "Pages",
  // href: "/pages",
  // icon: FileText,
  // children: [
  //   {
  //     title: "Sign In",
  //     href: "/sign-in",
  //   },
  //   {
  //     title: "Sign Up",
  //     href: "/sign-up",
  //   },
  //   {
  //     title: "Forgot Password",
  //     href: "/forgot-password",
  //   },
  //   {
  //     title: "Reset Password",
  //     href: "/reset-password",
  //   },
  //   {
  //     title: "Verify Email",
  //     href: "/verify-email",
  //   },
  //   {
  //     title: "Two Factor",
  //     href: "/two-factor",
  //   },
  //   {
  //     title: "Onboarding",
  //     href: "/onboarding",
  //   },
  // ],
  // },
];
