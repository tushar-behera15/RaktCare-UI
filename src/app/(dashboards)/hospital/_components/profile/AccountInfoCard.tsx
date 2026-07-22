"use client";

import {
    Mail,
    User,
    CalendarDays,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


interface User {
    email: string;
    role: string;
    createdAt: string;
}

interface Props {
    user: User;
}

export default function AccountInfoCard({
    user,
}: Props) {
    return (
        <Card className="bg-card shadow-sm">

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <User className="h-5 w-5 text-primary" />

                    Account Information

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="grid gap-2 md:grid-cols-1">

                    {/* Email */}

                    <div className="rounded-xl bg-background/40 p-3 md:col-span-2">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email Address
                                </p>

                                <p className="font-semibold break-all">
                                    {user?.email}
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* Created Date */}

                    <div className="rounded-xl bg-background/40  p-3 md:col-span-2">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

                                <CalendarDays className="h-5 w-5 text-primary" />

                            </div>

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Account Created
                                </p>

                                <p className="font-semibold">
                                    {user?.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                        : "Not Available"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}