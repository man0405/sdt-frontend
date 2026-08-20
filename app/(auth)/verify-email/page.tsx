"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/shared/auth-card";
import { AuthLogo } from "@/components/auth/shared/auth-logo";
import { VerificationCard } from "@/components/auth/verify-email/verification-card";

const RESEND_DELAY = 60;

export default function VerifyEmailPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(RESEND_DELAY);

    // Demo email
    const email = "virendra@example.com";

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    async function handleResend() {
        try {
            setLoading(true);

            console.log("Resend verification email");

            // TODO:
            // Clerk
            // Supabase
            // Firebase
            // Auth.js

            await new Promise((resolve) => setTimeout(resolve, 1500));

            setCountdown(RESEND_DELAY);
        } finally {
            setLoading(false);
        }
    }

    function handleChangeEmail() {
        router.push("/sign-up");
    }

    return (
        <AuthLayout>
            <div className="space-y-8">
                <AuthLogo />

                <AuthCard className="p-8">
                    <VerificationCard
                        email={email}
                        countdown={countdown}
                        isLoading={loading}
                        onResend={handleResend}
                        onChangeEmail={handleChangeEmail}
                    />
                </AuthCard>
            </div>
        </AuthLayout>
    );
}