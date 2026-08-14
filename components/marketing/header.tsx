"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
    { title: "Home", href: "#hero" },
    { title: "Features", href: "#features" },
    { title: "Modules", href: "#modules" },
    { title: "Pricing", href: "#pricing" },
    { title: "FAQ", href: "#faq" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 px-6 py-4">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-6 shadow-lg backdrop-blur-xl">

                {/* Logo */}

                <Link href="/marketing" className="flex items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-blue-500 to-violet-500 text-white shadow-lg">
                        <Sparkles className="h-5 w-5" />
                    </div>

                    <div className="hidden sm:block">
                        <h2 className="text-base font-bold tracking-tight">
                            Orbit
                        </h2>

                        <p className="text-xs font-medium text-muted-foreground">
                            AI SaaS Starter Kit
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}

                <nav className="hidden items-center rounded-full border border-border bg-muted/40 p-1 md:flex">
                    {navigation.map((item) => (
                        <Button
                            key={item.title}
                            variant="ghost"
                            size="sm"
                            className="rounded-full px-5 text-sm font-medium transition-all hover:bg-background hover:shadow-sm"
                            asChild
                        >
                            <Link href={item.href}>
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {/* Right Side */}

                <div className="hidden items-center gap-2 md:flex">
                    <div className="rounded-full border bg-background/60 backdrop-blur">
                        <ThemeToggle />
                    </div>

                    <Button
                        className="rounded-full px-6 shadow-lg shadow-primary/20"
                        asChild
                    >
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu */}

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-72 p-6">

                        <div className="mt-8 flex flex-col gap-2">

                            {navigation.map((item) => (
                                <Button
                                    key={item.title}
                                    variant="ghost"
                                    className="justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                className="mt-4"
                                asChild
                            >
                                <Link href="/docs">
                                    Documentation
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/pricing">
                                    Buy Now
                                </Link>
                            </Button>

                        </div>

                    </SheetContent>
                </Sheet>

            </div>
        </header>
    );
}