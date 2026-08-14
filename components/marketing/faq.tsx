import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the AI SaaS Starter Kit?",
    answer:
      "The starter kit includes a complete Next.js 16 application with authentication, AI chat, knowledge base, AI agents, workflows, prompt library, dashboard, billing, team management, settings, responsive layouts, and reusable UI components.",
  },
  {
    question: "Which technologies are used?",
    answer:
      "The project is built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, Lucide Icons, and follows modern production-ready architecture.",
  },
  {
    question: "Do I get the complete source code?",
    answer:
      "Yes. You'll receive the complete source code with a clean folder structure, reusable components, and well-organized project architecture.",
  },
  {
    question: "Can I use it for commercial projects?",
    answer:
      "Yes. You can use the starter kit to build commercial SaaS applications according to the license included with your purchase.",
  },
  {
    question: "Is authentication included?",
    answer:
      "Yes. Authentication pages and the required application structure are included and can be connected to your preferred authentication provider.",
  },
  {
    question: "Can I connect my own AI provider?",
    answer:
      "Absolutely. The starter kit is designed so you can integrate providers such as OpenAI, Anthropic, Google Gemini, Groq, Ollama, or your own backend.",
  },
  {
    question: "Will I receive future updates?",
    answer:
      "Yes. Lifetime updates are included, so you'll receive new features, improvements, bug fixes, and compatibility updates.",
  },
  {
    question: "Do you provide documentation?",
    answer:
      "Yes. The starter kit includes documentation to help you install, configure, customize, and deploy your application.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="bg-muted/30 py-24"
    >
      <div className="container mx-auto max-w-4xl px-4">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
            <HelpCircle className="h-4 w-4 text-primary" />
            Frequently Asked Questions
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            Have Questions?
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know before purchasing the AI SaaS Starter Kit.
          </p>

        </div>

        <div className="mt-14">

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>

      </div>
    </section>
  );
}