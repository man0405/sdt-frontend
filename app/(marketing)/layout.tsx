import type { ReactNode } from "react";

import { Announcement } from "@/components/marketing/announcement";
import { Footer } from "@/components/marketing/footer";
import { Header } from "@/components/marketing/header";
import { BackToTop } from "@/components/marketing/back-to-top";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Announcement />
      <Header />

      <main>{children}</main>

      <Footer />
      <BackToTop />
    </>
  );
}