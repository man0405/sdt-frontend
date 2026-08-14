"use client";

import PricingFeature from "./pricing-feature";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular,
  current,
}: Props) {
  return (
    <Card
      className={`relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
        popular ? "border-2 border-primary" : ""
      }`}
    >
      {popular && (
        <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}

      <CardContent className="flex h-full flex-col p-8">
        <div>
          <h3 className="text-2xl font-bold">
            {name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex items-end gap-1">
            <span className="text-5xl font-bold tracking-tight">
              ${price}
            </span>

            <span className="mb-1 text-muted-foreground">
              /month
            </span>
          </div>
        </div>

        <Button
          className="mt-8 w-full"
          variant={current ? "secondary" : "default"}
        >
          {current ? "Current Plan" : "Choose Plan"}
        </Button>

        <div className="my-8 border-t" />

        <div className="space-y-4">
          {features.map((feature) => (
            <PricingFeature key={feature}>
              {feature}
            </PricingFeature>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}