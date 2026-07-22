"use client";

import {
    Activity,
    PackageOpen,
    ShieldAlert,
    Droplets,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface BloodStockStatsProps {
    totalAvailable: number;
    totalReserved: number;
    bloodGroups: number;
    lowStock: number;
}

export default function BloodStockStats({
    totalAvailable,
    totalReserved,
    bloodGroups,
    lowStock,
}: BloodStockStatsProps) {
    const stats = [
        {
            title: "Available Units",
            value: totalAvailable,
            icon: Droplets,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-950",
        },
        {
            title: "Reserved Units",
            value: totalReserved,
            icon: PackageOpen,
            color: "text-yellow-600",
            bg: "bg-yellow-100 dark:bg-yellow-950",
        },
        {
            title: "Blood Groups",
            value: bloodGroups,
            icon: Activity,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-950",
        },
        {
            title: "Low Stock",
            value: lowStock,
            icon: ShieldAlert,
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-950",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <Card key={stat.title} className="bg-card shadow-sm">
                        <CardContent className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stat.value}
                                </h2>

                            </div>

                            <div
                                className={`rounded-full p-3 ${stat.bg}`}
                            >
                                <Icon
                                    className={`h-6 w-6 ${stat.color}`}
                                />
                            </div>

                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}