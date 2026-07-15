"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Droplets,
    HeartHandshake,
    Hospital,
    Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Hero() {
    const [user, setUser] = useState<{
        role: "admin" | "hospital" | "donor";
        _id: string;
        name: string;
        email: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                setUser(res.data.user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getMe();
    }, [])
    return (
        <section className="relative overflow-hidden">
            {/* Background */}

            <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-background to-background" />

            <div className="container mx-auto px-4 py-10 lg:py-15">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .6 }}
                        className="space-y-7"
                    >

                        <Badge
                            variant="secondary"
                            className="rounded-full px-4 py-1"
                        >
                            ❤️ Saving Lives Every Day
                        </Badge>

                        <div className="space-y-4">

                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">

                                Connecting
                                <span className="text-primary"> Donors </span>

                                With Those
                                <br />

                                Who Need Blood.
                            </h1>

                            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                Rakt Care is a modern blood management platform
                                connecting blood donors, hospitals and recipients
                                to ensure timely and lifesaving blood donations
                                during emergencies.
                            </p>

                        </div>

                        {/* Buttons */}
                        {
                            user?.role === 'donor' ? (
                                <div className="flex flex-col gap-4 sm:flex-row">

                                    <Button
                                        size="lg"
                                        className="group"
                                    >
                                        <Link href="#" className="flex items-center">
                                            Donate Blood

                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                    >
                                        <Link href="/donor/dashboard">
                                            My Dashboard
                                        </Link>
                                    </Button>

                                </div>

                            ) : user?.role === 'hospital' ? (
                                <div className="flex flex-col gap-4 sm:flex-row">

                                    <Button
                                        size="lg"
                                        className="group"
                                    >
                                        <Link href="#" className="flex items-center">
                                            Request Blood

                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                    >
                                        <Link href="/hospital/dashboard">
                                            My Dashboard
                                        </Link>
                                    </Button>

                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 sm:flex-row">

                                    <Button
                                        size="lg"
                                        className="group"
                                    >
                                        <Link href="#" className="flex items-center">
                                            Donate blood

                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                    >
                                        <Link href="/auth/signup">
                                            Signup
                                        </Link>
                                    </Button>

                                </div>

                            )
                        }



                        {/* Stats */}

                        <div className="flex flex-col justify-center items-center gap-8 pt-6 md:flex-row">

                            <div className="flex flex-col items-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    1000+
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Registered Donors
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    150+
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Hospitals
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <h3 className="text-3xl font-bold text-primary">
                                    24×7
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Emergency Support
                                </p>
                            </div>

                        </div>

                    </motion.div>

                    {/* Right */}

                    <motion.div
                        initial={{ opacity: 0, scale: .9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .7 }}
                        className="relative"
                    >

                        <div className="rounded-3xl border bg-card p-3 shadow-xl">

                            <div className="grid gap-5">

                                <div className="rounded-2xl border bg-background p-5">

                                    <div className="flex items-center gap-4">

                                        <div className="rounded-full bg-primary/10 p-3">
                                            <HeartHandshake className="h-7 w-7 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                Trusted Donors
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Verified blood donors ready to help.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-2xl border bg-background p-5">

                                    <div className="flex items-center gap-4">

                                        <div className="rounded-full bg-primary/10 p-3">
                                            <Hospital className="h-7 w-7 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                Hospital Network
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Connect with hospitals across the city.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-2xl border bg-background p-5">

                                    <div className="flex items-center gap-4">

                                        <div className="rounded-full bg-primary/10 p-3">
                                            <Users className="h-7 w-7 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                Smart Matching
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Find compatible donors in seconds.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-2xl border bg-primary p-6 text-primary-foreground">

                                    <div className="flex items-center gap-4">

                                        <Droplets className="h-8 w-8" />

                                        <div>

                                            <h3 className="font-bold text-lg">
                                                Every Drop Counts
                                            </h3>

                                            <p className="text-sm opacity-90">
                                                Donate blood today and help save a life.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
}