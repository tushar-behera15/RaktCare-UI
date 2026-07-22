"use client";

import {
    CalendarClock,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Appointment } from "@/lib/validators/Appointment";

interface AppointmentStatsProps {
    appointments: Appointment[];
}

export default function AppointmentStats({
    appointments,
}: AppointmentStatsProps) {

    const stats = [
        {
            title: "Pending",
            value: appointments.filter((app) => app.status === "pending").length,
            icon: Clock3,
            color: "text-yellow-500",
            bg: "bg-yellow-100 dark:bg-yellow-950",
        },
        {
            title: "Approved",
            value: appointments.filter((app) => app.status === "approved").length,
            icon: CalendarClock,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-950",
        },
        {
            title: "Completed",
            value: appointments.filter((app) => app.status === "completed").length,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-950",
        },
        {
            title: "Rejected",
            value: appointments.filter((app) => app.status === "rejected").length,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-950",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 ">
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