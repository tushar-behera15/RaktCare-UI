/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { DropletIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            setIsSubmitting(true);

            const res = await axios.post(
                "http://localhost:5000/auth/login",
                formData,
                {
                    withCredentials: true,
                }
            );

            toast.success(res.data.message || "Login successful!");

            router.push("/");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Invalid email or password."
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

                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            <DropletIcon className="h-5 w-5 fill-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl text-foreground leading-none">Rakt Care</h1>
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-bold">
                            Welcome Back
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Login to continue to your account
                        </p>
                    </div>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Email */}

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-primary hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                autoComplete="current-password"
                                className="pr-10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}

                    <Button
                        type="submit"
                        className="w-full h-7"
                        disabled={
                            isSubmitting ||
                            !formData.email ||
                            !formData.password
                        }
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {isSubmitting
                            ? "Signing In..."
                            : "Sign In"}
                    </Button>
                </form>

                {/* Footer */}

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="font-medium text-primary hover:underline"
                    >
                        SignUp
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}