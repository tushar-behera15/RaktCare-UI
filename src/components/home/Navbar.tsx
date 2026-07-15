/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, DropletIcon, UserPlus, Home, Search, Building2, Info, Phone, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const navLinks = [
    {
        name: "Home",
        href: "/",
        icon: Home,
    },
    {
        name: "Find Blood",
        href: "/find-blood",
        icon: Search,
    },
    {
        name: "Hospitals",
        href: "/hospitals",
        icon: Building2,
    },
    {
        name: "About",
        href: "/about",
        icon: Info,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: Phone,
    },
];



export default function Navbar() {
    const [user, setUser] = useState<{ id: string, email: string, role: string }>();
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

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

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/auth/logout", {
                withCredentials: true
            });
            setUser(undefined);
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <DropletIcon className="h-5 w-5 fill-primary-foreground" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Rakt Care
                        </h1>

                        <p className="text-xs text-muted-foreground">
                            Blood Management System
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                                ? "text-primary"
                                : "text-muted-foreground"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Buttons */}
                {
                    user ? (
                        <div className="hidden items-center gap-3 lg:flex">
                            <p className="text-sm">
                                Welcome{" "} <b className="text-primary">{user.email}</b>
                            </p>

                            <Button>
                                <Link href={user.role === "hospital" ? "/hospital/dashboard" : "/donor/dashboard"}>
                                    Dashboard
                                </Link>
                            </Button>
                            <Button onClick={handleLogout}><LogOut /></Button>
                        </div >
                    ) : (
                        <div className="hidden items-center gap-3 lg:flex">
                            <Button
                                variant="ghost"
                            >
                                <Link href="/auth/login">
                                    Login
                                </Link>
                            </Button>

                            <Button>
                                <Link href="/auth/signup">
                                    Become Donor
                                </Link>
                            </Button>
                        </div >
                    )
                }


                {/* Mobile Menu */}

                <Sheet>
                    {/* Mobile Trigger */}

                    <SheetTrigger className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent transition-colors">
                        <Menu className="h-5 w-5" />
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="w-62.5 sm:w-70 p-0 flex flex-col h-dvh"
                    >
                        {/* Logo */}

                        <div className="border-b px-3 py-6">

                            <Link
                                href="/"
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                    <DropletIcon className="h-6 w-6 fill-current" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold">
                                        Rakt Care
                                    </h2>

                                    <p className="text-xs text-muted-foreground">
                                        Blood Management System
                                    </p>
                                </div>
                            </Link>

                        </div>

                        {/* Navigation */}

                        <nav className="flex-1 px-4 py-5">

                            <div className="space-y-2">

                                {navLinks.map((item) => {
                                    const Icon = item.icon;

                                    const active = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-md px-4 py-1 transition-all duration-200
              ${active
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />

                                            <span className="font-medium">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                })}

                            </div>

                        </nav>

                        {/* Bottom Section */}

                        <div className="border-t p-4 space-y-3">

                            {
                                user ? (

                                    <>
                                        <p className="text-sm">
                                            Welcome{" "} <b className="text-primary">{user.email}</b>
                                        </p>

                                        <Button className="w-full">
                                            <Link href={user.role === "hospital" ? "/dashboard/hospital" : "/dashboard/donor"}>
                                                Dashboard
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Link href="/auth/login">
                                                Login
                                            </Link>
                                        </Button>

                                        <Button
                                            className="w-full"
                                        >
                                            <Link href="/auth/register" className="flex justify-center items-center gap-2">
                                                <UserPlus className="h-4 w-4" />
                                                <p>Become Donor</p>
                                            </Link>
                                        </Button>
                                    </>

                                )
                            }


                        </div>

                    </SheetContent>
                </Sheet >

            </div >
        </header >
    );
}