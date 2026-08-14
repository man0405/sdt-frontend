import Link from "next/link";
import { ArrowRight, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";

const screenshots = [
  {
    title: "AI Dashboard",
    description:
      "Beautiful analytics dashboard with charts, KPIs and responsive widgets.",
    image: "/orbit-ai/images/screen-2.png",
    href: "/dashboard",
  },
  {
    title: "AI Chat",
    description:
      "ChatGPT-style conversation interface with streaming responses and attachments.",
    image: "/orbit-ai/images/screen-3.png",
    href: "/ai/chat/",
  },
  {
    title: "Knowledge Base",
    description:
      "Upload PDFs, websites and documents to power AI with your own data.",
    image: "/orbit-ai/images/screen-4.png",
    href: "/ai/knowledge",
  },
  {
    title: "Billing",
    description:
      "Manage subscriptions, invoices and usage from a modern billing dashboard.",
    image: "/orbit-ai/images/screen-5.png",
    href: "/billing/overview/",
  },
];

export function Screenshots() {
  return (
    <section id="screenshots" className="py-24 bg-muted/70">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full shadow border bg-background px-4 py-2 text-sm font-medium">
            <Monitor className="h-4 w-4 text-primary" />
            Product Preview
          </div>

          <h2 className="mt-6 text-4xl font-bold">
            Explore the Interface
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Every page is designed with modern UI, reusable components and
            production-ready architecture.
          </p>

        </div>

        <div className="space-y-24">

          {screenshots.map((item, index) => (
            <div
              key={item.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >

              <div>

                <h3 className="text-3xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {item.description}
                </p>

                <Button className="mt-8 px-5" asChild>
                  <Link href={item.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

              </div>

              <Link href={item.href}>
                <div className="overflow-hidden rounded-3xl border bg-background shadow-xl transition-shadow hover:shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}