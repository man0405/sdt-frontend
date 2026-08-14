import type { Conversation } from "@/components/ai/chat/types";

export const conversations: Conversation[] = [
  {
    id: "1",
    title: "AI SaaS Starter Kit Planning",
    createdAt: new Date("2026-07-10T09:00:00"),
    updatedAt: new Date("2026-07-10T10:15:00"),
    model: "Claude Sonnet 4",
    messages: [
      {
        id: "1",
        role: "user",
        content: "Help me build an AI SaaS Starter Kit.",
        createdAt: new Date("2026-07-10T09:00:00"),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Absolutely! We can build a production-ready starter kit including Authentication, AI Chat, Billing, Team Management, Profile, Settings and Marketing pages.",
        createdAt: new Date("2026-07-10T09:01:00"),
        model: "Claude Sonnet 4",
      },
      {
        id: "3",
        role: "user",
        content: "Which module should I build first?",
        createdAt: new Date("2026-07-10T09:02:00"),
      },
      {
        id: "4",
        role: "assistant",
        content:
          "I recommend this order: Authentication → Onboarding → Dashboard → AI Chat → Billing → Team → Settings.",
        createdAt: new Date("2026-07-10T09:03:00"),
        model: "Claude Sonnet 4",
      },
    ],
  },

  {
    id: "2",
    title: "Scaling an AI SaaS Product",
    createdAt: new Date("2026-07-11T11:00:00"),
    updatedAt: new Date("2026-07-11T11:45:00"),
    model: "GPT-5.5",
    messages: [
      {
        id: "1",
        role: "user",
        content: "How can I scale an AI SaaS application?",
        createdAt: new Date("2026-07-11T11:00:00"),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Focus on authentication, workspace isolation, usage-based billing, background jobs, caching, queues and monitoring.",
        createdAt: new Date("2026-07-11T11:01:00"),
        model: "GPT-5.5",
      },
    ],
  },

  {
    id: "3",
    title: "Next.js Routing Issues",
    createdAt: new Date("2026-07-12T15:30:00"),
    updatedAt: new Date("2026-07-12T15:40:00"),
    model: "Claude Sonnet 4",
    messages: [
      {
        id: "1",
        role: "user",
        content: "My Next.js routes are returning 404.",
        createdAt: new Date("2026-07-12T15:30:00"),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Verify your App Router folder structure, route groups, layouts and page.tsx files.",
        createdAt: new Date("2026-07-12T15:31:00"),
        model: "Claude Sonnet 4",
      },
    ],
  },
];