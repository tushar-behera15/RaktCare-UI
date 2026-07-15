"use client";

import {
    Users,
    Clock3,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface RecipientStatsProps {
    total: number;
    pending: number;
    completed: number;
    highUrgency: number;
}

export default function RecipientStats({
    total,
    pending,
    completed,
    highUrgency,
}: RecipientStatsProps) {
    const stats = [
        {
            title: "Total Recipients",
            value: total,
            icon: Users,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600",
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock3,
            iconBg: "bg-yellow-500/10",
            iconColor: "text-yellow-600",
        },
        {
            title: "Completed",
            value: completed,
            icon: CheckCircle2,
            iconBg: "bg-green-500/10",
            iconColor: "text-green-600",
        },
        {
            title: "High Urgency",
            value: highUrgency,
            icon: AlertTriangle,
            iconBg: "bg-red-500/10",
            iconColor: "text-red-600",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <Card key={item.title}>

                        <CardContent className="flex items-center justify-between p-6">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {item.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.iconBg}`}
                            >
                                <Icon
                                    className={`h-7 w-7 ${item.iconColor}`}
                                />
                            </div>

                        </CardContent>

                    </Card>
                );
            })}

        </div>
    );
}