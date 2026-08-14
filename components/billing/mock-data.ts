export type PlanType = "Starter" | "Pro" | "Enterprise";

export type InvoiceStatus = "paid" | "pending" | "failed";

export interface BillingStats {
  monthlySpend: string;
  apiCalls: number;
  totalTokens: string;
  vectorStorage: string;
}

export interface Subscription {
  plan: PlanType;
  price: string;
  billingCycle: "Monthly" | "Yearly";
  renewDate: string;
  status: "Active" | "Cancelled" | "Trial";
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  permissions: string;
}

export interface Usage {
  model: string;
  inputTokens: string;
  outputTokens: string;
  requests: number;
  cost: string;
}

export interface PricingPlan {
  id: string;
  name: PlanType;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  current?: boolean;
  features: string[];
}

export const billingStats: BillingStats = {
  monthlySpend: "$148.32",
  apiCalls: 128456,
  totalTokens: "48.6M",
  vectorStorage: "8.4 GB",
};

export const subscription: Subscription = {
  plan: "Pro",
  price: "$49",
  billingCycle: "Monthly",
  renewDate: "Aug 18, 2026",
  status: "Active",
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceYearly: 190,
    description: "Perfect for individuals and side projects.",
    features: [
      "1 Workspace",
      "2M Tokens / month",
      "5 GB Storage",
      "Email Support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49,
    priceYearly: 490,
    current: true,
    description: "Ideal for startups and growing AI products.",
    features: [
      "Unlimited Workspaces",
      "20M Tokens / month",
      "100 GB Storage",
      "Priority Support",
      "API Access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 199,
    priceYearly: 1990,
    description: "Advanced security and unlimited scaling.",
    features: [
      "Unlimited Tokens",
      "Unlimited Storage",
      "Dedicated Infrastructure",
      "SSO",
      "Custom Models",
      "24/7 Support",
    ],
  },
];

export const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-1001",
    date: "Jul 02, 2026",
    amount: "$49.00",
    status: "paid",
  },
  {
    id: "2",
    invoiceNo: "INV-1000",
    date: "Jun 02, 2026",
    amount: "$49.00",
    status: "paid",
  },
  {
    id: "3",
    invoiceNo: "INV-999",
    date: "May 02, 2026",
    amount: "$49.00",
    status: "paid",
  },
  {
    id: "4",
    invoiceNo: "INV-998",
    date: "Apr 02, 2026",
    amount: "$49.00",
    status: "pending",
  },
];

export const apiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production",
    key: "sk_live_xxxxxxxxxxxxxx",
    createdAt: "Jan 12, 2026",
    lastUsed: "5 minutes ago",
    permissions: "Full Access",
  },
  {
    id: "2",
    name: "Development",
    key: "sk_test_xxxxxxxxxxxxxx",
    createdAt: "Mar 03, 2026",
    lastUsed: "Yesterday",
    permissions: "Read / Write",
  },
  {
    id: "3",
    name: "Analytics",
    key: "sk_live_xxxxxxxxxxxxxx",
    createdAt: "Apr 18, 2026",
    lastUsed: "3 days ago",
    permissions: "Read Only",
  },
];

export const usage: Usage[] = [
  {
    model: "GPT-5",
    inputTokens: "18.4M",
    outputTokens: "7.3M",
    requests: 42567,
    cost: "$82.41",
  },
  {
    model: "Claude 4",
    inputTokens: "12.8M",
    outputTokens: "5.1M",
    requests: 31240,
    cost: "$39.60",
  },
  {
    model: "Gemini 2.5",
    inputTokens: "10.2M",
    outputTokens: "2.7M",
    requests: 21893,
    cost: "$26.31",
  },
];

export const monthlyUsage = [
  { month: "Jan", cost: 38 },
  { month: "Feb", cost: 46 },
  { month: "Mar", cost: 54 },
  { month: "Apr", cost: 69 },
  { month: "May", cost: 88 },
  { month: "Jun", cost: 121 },
  { month: "Jul", cost: 148 },
];