import {
  Pencil,
  CreditCard,
  BookOpen,
  Bot,
  Download,
  Trash2,
  Cpu,
  Crown,
  Database,
  FileText,
  FolderKanban,
  Globe,
  HardDrive,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  MessageSquare,
  Monitor,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  User,
  BadgeCheck,
  Building2,
  CalendarDays,
  Shield,
  UserCircle2
} from "lucide-react";

import { FaSlack, FaGit, FaGlobe, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export const profile = {
  avatar: "/avatars/avatar-1.png",
  initials: "VK",
  firstName: "Virendra",
  lastName: "Kumar",
  email: "virendra@example.com",
  phone: "+91 98765 43210",
  country: "India",
  city: "Jaipur",
  timezone: "Asia/Kolkata (GMT +05:30)",
  language: "English",
  role: "Frontend AI Engineer",
  company: "Codervent",
  jobTitle: "UI Designer",
  bio:
    "Passionate Frontend AI Engineer building modern SaaS products with React, Next.js, Tailwind CSS and Artificial Intelligence.",
  skills:
    "React, Next.js, TypeScript, Tailwind CSS, Shadcn UI, AI",

} as const;

export type ProfileField = keyof typeof profile;

export const personalInformation: {
  id: string;
  label: string;
  field: ProfileField;
}[] = [
  {
    id: "firstName",
    label: "First Name",
    field: "firstName",
  },
  {
    id: "lastName",
    label: "Last Name",
    field: "lastName",
  },
  {
    id: "email",
    label: "Email",
    field: "email",
  },
  {
    id: "phone",
    label: "Phone",
    field: "phone",
  },
  {
    id: "country",
    label: "Country",
    field: "country",
  },
  {
    id: "city",
    label: "City",
    field: "city",
  },
  {
    id: "timezone",
    label: "Timezone",
    field: "timezone",
  },
  {
    id: "language",
    label: "Language",
    field: "language",
  },
];

export const accountInformation = [
  {
    label: "Username",
    value: "virendra",
    icon: UserCircle2,
  },
  {
    label: "User ID",
    value: "USR-102483",
    icon: BadgeCheck,
  },
  {
    label: "Workspace",
    value: "Codervent",
    icon: Building2,
  },
  {
    label: "Current Plan",
    value: "Pro",
    icon: Crown,
  },
  {
    label: "Role",
    value: "Owner",
    icon: Shield,
  },
  {
    label: "Member Since",
    value: "January 15, 2026",
    icon: CalendarDays,
  },
  {
    label: "Last Login",
    value: "Today, 09:45 AM",
    icon: CalendarDays,
  },
];

export const profileOverview = [
  {
    title: "Projects",
    value: "28",
    icon: FolderKanban,
    description: "Active projects",
  },
  {
    title: "AI Chats",
    value: "1,253",
    icon: MessageSquare,
    description: "Conversations",
  },
  {
    title: "Documents",
    value: "420",
    icon: Database,
    description: "Uploaded files",
  },
  {
    title: "Knowledge Bases",
    value: "18",
    icon: BookOpen,
    description: "Collections",
  },
  {
    title: "API Requests",
    value: "65K",
    icon: Cpu,
    description: "This month",
  },
  {
    title: "Storage",
    value: "1.2 GB",
    icon: HardDrive,
    description: "Used storage",
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Shadcn UI",
  "Node.js",
  "AI",
  "Prompt Engineering",
  "OpenAI",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Git",
  "Vercel",
];

export const accounts = [
  {
    name: "Google",
    icon: Globe,
    email: "virendra@gmail.com",
    connected: true,
    connectedAt: "Connected 3 months ago",
  },
  {
    name: "GitHub",
    icon: FaGit,
    email: "@virendra",
    connected: true,
    connectedAt: "Connected 1 month ago",
  },
  {
    name: "Microsoft",
    icon: Mail,
    email: "Not Connected",
    connected: false,
    connectedAt: "",
  },
  {
    name: "Slack",
    icon: FaSlack,
    email: "Not Connected",
    connected: false,
    connectedAt: "",
  },
];

export const recentSessions = [
  {
    device: "MacBook Pro",
    browser: "Chrome 138",
    os: "macOS",
    location: "Jaipur, India",
    ip: "103.45.21.10",
    lastActive: "Active Now",
    current: true,
    icon: Monitor,
  },
  {
    device: "Windows Laptop",
    browser: "Edge 138",
    os: "Windows 11",
    location: "Delhi, India",
    ip: "122.164.44.92",
    lastActive: "2 hours ago",
    current: false,
    icon: Monitor,
  },
  {
    device: "iPhone 16",
    browser: "Safari",
    os: "iOS 26",
    location: "Jaipur, India",
    ip: "103.45.21.10",
    lastActive: "Yesterday",
    current: false,
    icon: Smartphone,
  },
];

export const activities = [
  {
    title: "Updated profile information",
    description: "Changed profile photo and bio",
    time: "10 minutes ago",
    icon: User,
  },
  {
    title: "Generated AI response",
    description: "Chat with GPT-5 completed",
    time: "45 minutes ago",
    icon: Bot,
  },
  {
    title: "Uploaded documents",
    description: "3 PDF files added to Knowledge Base",
    time: "2 hours ago",
    icon: FileText,
  },
  {
    title: "Created API Key",
    description: "New production API key generated",
    time: "Yesterday",
    icon: KeyRound,
  },
  {
    title: "Enabled Two-Factor Authentication",
    description: "Authenticator App configured",
    time: "3 days ago",
    icon: ShieldCheck,
  },
  {
    title: "Knowledge Base Updated",
    description: "Marketing documentation synchronized",
    time: "Last week",
    icon: Database,
  },
  {
    title: "Signed in",
    description: "Chrome • Windows • India",
    time: "Last week",
    icon: LogIn,
  },
];

export const achievements = [
  {
    title: "Early Adopter",
    description: "Joined during the beta program.",
    icon: Rocket,
    earned: "Jan 2026",
    status: "Unlocked",
  },
  {
    title: "AI Explorer",
    description: "Completed 1,000 AI conversations.",
    icon: Bot,
    earned: "Mar 2026",
    status: "Unlocked",
  },
  {
    title: "Knowledge Master",
    description: "Uploaded more than 500 documents.",
    icon: FileText,
    earned: "Apr 2026",
    status: "Unlocked",
  },
  {
    title: "Power User",
    description: "Used the platform for 90 consecutive days.",
    icon: Crown,
    earned: "May 2026",
    status: "Unlocked",
  },
  {
    title: "Top Contributor",
    description: "Created 100 shared prompts.",
    icon: Sparkles,
    earned: "Locked",
    status: "In Progress",
  },
  {
    title: "Champion",
    description: "Earn every available achievement.",
    icon: Trophy,
    earned: "Locked",
    status: "Locked",
  },
];

export const profileCompletionItems = [
  {
    title: "Profile Photo",
    completed: true,
  },
  {
    title: "Personal Information",
    completed: true,
  },
  {
    title: "Bio",
    completed: true,
  },
  {
    title: "Skills",
    completed: true,
  },
  {
    title: "Connected Account",
    completed: false,
  },
  {
    title: "Two-Factor Authentication",
    completed: false,
  },
];

export const quickActions = [
  {
    title: "Edit Profile",
    description: "Update your personal information.",
    href: "#",
    icon: Pencil,
  },
  {
    title: "Security",
    description: "Manage password and 2FA.",
    href: "/security",
    icon: ShieldCheck,
  },
  {
    title: "API Keys",
    description: "Create and manage API keys.",
    href: "/api-keys",
    icon: KeyRound,
  },
  {
    title: "Billing",
    description: "Manage your subscription.",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Export Data",
    description: "Download your account data.",
    href: "#",
    icon: Download,
  },
  {
    title: "Delete Account",
    description: "Permanently remove your account.",
    href: "#",
    icon: Trash2,
    destructive: true,
  },
];


export const securityItems = [
  {
    title: "Password",
    description: "Last updated 18 days ago",
    icon: Lock,
    status: "Secure",
    action: "Change",
  },
  {
    title: "Two-Factor Authentication",
    description: "Authenticator App Enabled",
    icon: ShieldCheck,
    status: "Enabled",
    action: "Manage",
  },
  {
    title: "Recovery Codes",
    description: "Recovery codes generated",
    icon: KeyRound,
    status: "Available",
    action: "View",
  },
  {
    title: "Trusted Devices",
    description: "3 active devices",
    icon: Smartphone,
    status: "Active",
    action: "Manage",
  },
];


export const socialLinks = [
  {
    name: "Website",
    username: "codervent.com",
    href: "https://codervent.com",
    icon: FaGlobe,
  },
  {
    name: "GitHub",
    username: "@virendra",
    href: "https://github.com",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    username: "Virendra Kumar",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
  {
    name: "X",
    username: "@virendra",
    href: "https://x.com",
    icon: FaTwitter,
  },
  {
    name: "Facebook",
    username: "Virendra Kumar",
    href: "https://facebook.com",
    icon: FaFacebook, 
  },
  {
    name: "Instagram",
    username: "@virendra",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
];