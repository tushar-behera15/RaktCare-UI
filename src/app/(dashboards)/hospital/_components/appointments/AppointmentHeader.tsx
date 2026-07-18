"use client";

import { CalendarDays, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AppointmentHeaderProps {
    onRefresh: () => void;
    loading?: boolean;
}

export default function AppointmentHeader({
    onRefresh,
    loading = false,
}: AppointmentHeaderProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            <div>

                <div className="flex items-center gap-2">

                    <CalendarDays className="h-6 w-6 text-red-600" />

                    <h1 className="text-2xl font-bold tracking-tight">
                        Appointments
                    </h1>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Manage donor appointments and monitor donation schedules.
                </p>

            </div>

            <Button
                variant="outline"
                onClick={onRefresh}
                disabled={loading}
            >
                <RefreshCw
                    className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""
                        }`}
                />

                Refresh
            </Button>

        </div>
    );
}