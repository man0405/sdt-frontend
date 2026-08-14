import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const productLinks = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Modules",
    href: "#modules",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

const resourceLinks = [
  {
    title: "Documentation",
    href: "#",
  },
  {
    title: "Changelog",
    href: "#",
  },
  {
    title: "Support",
    href: "#",
  },
  {
    title: "License",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="py-16">

        <div className="mx-auto px-6 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">

          <div className="md:col-span-2">

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  AI SaaS Starter Kit
                </h3>

                <p className="text-sm text-muted-foreground">
                  Production-ready Next.js starter template.
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              Launch your next AI SaaS using a modern stack powered by
              Next.js 16, React 19, Tailwind CSS v4 and shadcn/ui.
            </p>

            <div className="mt-6 flex items-center gap-4">

                <Link
                    href="#"
                    className="rounded-lg border p-2 hover:bg-muted"
                >
                    <FaGithub className="h-5 w-5" />
                </Link>

                <Link
                    href="#"
                    className="rounded-lg border p-2 hover:bg-muted"
                >
                    <FaTwitter className="h-5 w-5" />
                </Link>

            </div>

          </div>

          <div>

            <h4 className="font-semibold">
              Product
            </h4>

            <div className="mt-4 flex flex-col gap-3">

              {productLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}

            </div>

          </div>

          <div>

            <h4 className="font-semibold">
              Resources
            </h4>

            <div className="mt-4 flex flex-col gap-3">

              {resourceLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}

            </div>

          </div>

         </div>
        </div>

         <div className="max-w-7xl mx-auto px-6">
 
            <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">

          <p>
            © {new Date().getFullYear()} AI SaaS Starter Kit. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#">
              Privacy Policy
            </Link>

            <Link href="#">
              Terms of Service
            </Link>
          </div>

        </div>

         </div>

       

      </div>
    </footer>
  );
}