"use client";

import { Check, Minus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ComparisonRow = [
  feature: string,
  starter: string | boolean,
  pro: string | boolean,
  enterprise: string | boolean
];

const rows: ComparisonRow[] = [
  ["Workspaces", "1", "Unlimited", "Unlimited"],
  ["Monthly Tokens", "2M", "20M", "Unlimited"],
  ["Storage", "5 GB", "100 GB", "Unlimited"],
  ["API Access", false, true, true],
  ["Priority Support", false, true, true],
  ["SSO", false, false, true],
];

export default function ComparisonTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Plans</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Feature</th>
              <th>Starter</th>
              <th>Pro</th>
              <th>Enterprise</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(([feature, starter, pro, enterprise]) => (
              <tr
                key={feature}
                className="border-b"
              >
                <td className="py-4 font-medium">
                  {feature}
                </td>

                {[starter, pro, enterprise].map((value, index) => (
                  <td
                    key={index}
                    className="text-center"
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="mx-auto size-5 text-emerald-500" />
                      ) : (
                        <Minus className="mx-auto size-5 text-muted-foreground" />
                      )
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}