import { CTA } from "@/components/marketing/cta";
import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { Modules } from "@/components/marketing/modules";
import { Pricing } from "@/components/marketing/pricing";
import { Screenshots } from "@/components/marketing/screenshots";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Modules />
      <Screenshots />
      <Pricing />
      <Faq />
      <CTA />
    </>
  );
}