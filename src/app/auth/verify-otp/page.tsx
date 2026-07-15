/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2Icon, ShieldCheckIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

function VerifyOtpContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get("email");

    const [otp, setOtp] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter the 6-digit OTP");
            return;
        }

        try {
            setIsSubmitting(true);

            const res = await axios.post(
                "http://localhost:5000/auth/verify-otp",
                {
                    email,
                    otp,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success(
                res.data?.message || "OTP verified successfully!"
            );

            const registration = JSON.parse(
                sessionStorage.getItem("pendingRegistration") || "{}"
            );

            console.log(registration);

            if (registration.role === "hospital") {
                await axios.post("http://localhost:5000/hospital/create-profile", registration.profileData, {
                    withCredentials: true,
                });
            }

            sessionStorage.removeItem("pendingRegistration");

            router.push("/auth/login");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Invalid OTP. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-md rounded-2xl border bg-card shadow-xl p-8"
            >
                {/* Header */}

                <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <ShieldCheckIcon className="h-7 w-7 text-primary" />
                    </div>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold">
                            Verify OTP
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            We&apos;ve sent a verification code to
                        </p>

                        <p className="font-medium break-all">
                            {email || "your@email.com"}
                        </p>
                    </div>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup className="gap-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                        className="h-14 w-12 rounded-xl border text-xl font-semibold transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting || otp.length !== 6
                        }
                        className="w-full h-12 text-base"
                    >
                        {isSubmitting && (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {isSubmitting
                            ? "Verifying..."
                            : "Verify & Continue"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Didn&apos;t receive the code?
                    <button
                        type="button"
                        className="ml-1 font-medium text-primary hover:underline"
                    >
                        Resend OTP
                    </button>
                </p>
            </motion.div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <React.Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                </div>
            }
        >
            <VerifyOtpContent />
        </React.Suspense>
    );
}