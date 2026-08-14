"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade or downgrade your subscription at any time.",
  },
  {
    question: "Do unused tokens roll over?",
    answer:
      "No. Monthly token limits reset at the beginning of each billing cycle.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Your subscription remains active until the current billing period ends.",
  },
  {
    question: "Do you offer Enterprise support?",
    answer:
      "Yes. Enterprise plans include dedicated support, SSO and custom infrastructure.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="single"
        collapsible
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.question}
            value={faq.question}
          >
            <AccordionTrigger>
              {faq.question}
            </AccordionTrigger>

            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}