"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, BuildingIcon, ArrowLeftIcon, DropletIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { BloodDonationIllustration } from "@/components/forms/BloodDonationIllustration";
import { DonorSignupForm } from "@/features/auth/signup/DonorSignupForm";
import { HospitalSignupForm } from "@/features/auth/signup/HospitalSignupForm";
import Link from "next/link";

type UserRole = "donor" | "hospital" | null;

// ─── Role Selector Card ────────────────────────────────────────────────────

interface RoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    badge?: string;
    onClick: () => void;
    id: string;
}

function RoleCard({ icon, title, description, badge, onClick, id }: RoleCardProps) {
    return (
        <motion.button
            id={id}
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 text-left shadow-sm ring-1 ring-foreground/5 transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full sm:w-auto sm:flex-1"
            aria-label={`Register as ${title}`}
        >
            {badge && (
                <Badge variant="default" className="absolute right-3 top-3 text-[9px]">
                    {badge}
                </Badge>
            )}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">{title}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
            </div>
            <div className="mt-auto flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Get Started →
            </div>
        </motion.button>
    );
}

// ─── Left Panel ────────────────────────────────────────────────────────────

interface LeftPanelProps {
    role: UserRole;
}

function LeftPanel({ role }: LeftPanelProps) {
    const content = {
        donor: {
            heading: "Become a Life Saver",
            subheading: "Join thousands of heroes who donate blood and save lives every day.",
            bullets: [
                "Create your donor profile",
                "Get matched with nearby blood banks",
                "Track your donation history",
                "Receive alerts when your blood type is needed",
            ],
        },
        hospital: {
            heading: "Manage Blood Resources",
            subheading: "Streamline your blood bank operations and connect with donors instantly.",
            bullets: [
                "Register your hospital facility",
                "Post urgent blood requirements",
                "Access donor network in real-time",
                "Manage inventory and requests",
            ],
        },
        null: {
            heading: "Save Lives Today",
            subheading: "Whether you're a donor or a hospital, Rakt Care connects you to those who need help most.",
            bullets: [
                "Real-time donor matching",
                "Emergency blood alerts",
                "Verified donor profiles",
                "Hospital network integration",
            ],
        },
    };

    const current = content[role ?? "null"];

    return (
        <div className="flex flex-col justify-between gap-6 text-primary">
            {/* Logo + Tagline */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <DropletIcon className="h-5 w-5 fill-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-foreground leading-none">Rakt Care</h1>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Connecting Donors. Saving Lives.</p>
                    </div>
                </div>

                <Separator />

                {/* Dynamic Heading */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-2"
                    >
                        <h2 className="text-lg font-bold text-foreground leading-snug">
                            {current.heading}
                        </h2>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {current.subheading}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Feature Bullets */}
                <ul className="flex flex-col gap-2 mt-1">
                    {current.bullets.map((bullet, i) => (
                        <motion.li
                            key={`${role}-${i}`}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.2 }}
                            className="flex items-start gap-2 text-[11px] text-muted-foreground"
                        >
                            <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                                <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none">
                                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            {bullet}
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Illustration */}
            <div className="mt-auto">
                <BloodDonationIllustration className="w-full max-w-[260px] mx-auto text-primary opacity-80" />
            </div>

            {/* Footer note */}
            <p className="text-[10px] text-muted-foreground text-center">
                🔒 Your data is encrypted and secure
            </p>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function SignUpPage() {
    const [role, setRole] = React.useState<UserRole>(null);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-8 md:py-12">
            {/* Main landscape card */}
            <motion.div
                className="w-full max-w-[1080px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl ring-1 ring-foreground/5"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                layout
            >
                <div className="flex flex-col lg:flex-row min-h-[560px]">

                    {/* ── Left Panel ── */}
                    <div className="flex flex-col bg-muted/30 dark:bg-card border-b lg:border-b-0 lg:border-r border-border p-6 lg:p-8 lg:w-[340px] xl:w-[380px] shrink-0">
                        <LeftPanel role={role} />
                    </div>

                    {/* ── Right Panel (Form Area) ── */}
                    <div className="flex flex-1 flex-col p-6 lg:p-8 overflow-y-auto">

                        {/* Header */}
                        <div className="flex flex-col gap-1 mb-6">
                            <div className="flex items-center gap-2">
                                {role && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setRole(null)}
                                        className="h-6 w-6 text-muted-foreground"
                                        aria-label="Go back to role selection"
                                    >
                                        <ArrowLeftIcon className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                                <h2 className="text-base font-semibold text-foreground">
                                    {role === "donor"
                                        ? "Donor Registration"
                                        : role === "hospital"
                                            ? "Hospital Registration"
                                            : "Create Account"}
                                </h2>
                            </div>
                            <p className="text-xs text-muted-foreground pl-px">
                                {role === "donor"
                                    ? "Fill in your personal and medical details to join as a blood donor."
                                    : role === "hospital"
                                        ? "Register your hospital to manage blood supply and donor connections."
                                        : "Choose your account type to get started."}
                            </p>
                        </div>

                        {/* Role Selector or Form */}
                        <AnimatePresence mode="wait">
                            {!role ? (
                                <motion.div
                                    key="role-select"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex flex-col gap-6 flex-1 justify-center"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <RoleCard
                                            id="role-donor"
                                            icon={<HeartIcon className="h-5 w-5" />}
                                            title="Blood Donor"
                                            description="Register as a donor to save lives. Set your availability and get matched with those in need."
                                            badge="Most Common"
                                            onClick={() => setRole("donor")}
                                        />
                                        <RoleCard
                                            id="role-hospital"
                                            icon={<BuildingIcon className="h-5 w-5" />}
                                            title="Hospital / Blood Bank"
                                            description="Register your facility to manage blood inventory and connect with verified donors."
                                            onClick={() => setRole("hospital")}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Separator className="flex-1" />
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">Already registered?</span>
                                        <Separator className="flex-1" />
                                    </div>

                                    <div className="text-center">
                                        <Link
                                            href="/auth/login"
                                            className="text-xs text-primary font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                                        >
                                            Sign in to your account →
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`form-${role}`}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                                    className="flex-1"
                                >
                                    {role === "donor" ? (
                                        <DonorSignupForm onBack={() => setRole(null)} />
                                    ) : (
                                        <HospitalSignupForm onBack={() => setRole(null)} />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom notice */}
                        <p className="mt-6 text-center text-[10px] text-muted-foreground">
                            By registering, you agree to our{" "}
                            <Link href="#" className="text-primary hover:underline underline-offset-2">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-primary hover:underline underline-offset-2">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}