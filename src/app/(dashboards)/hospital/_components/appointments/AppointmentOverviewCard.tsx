"use client";

import { format } from "date-fns";
import {
    Calendar,
    Clock3,
    Hash,
    CalendarPlus,
    Droplets,
} from "lucide-react";

import { Appointment } from "@/lib/validators/Appointment";

import { Badge } from "@/components/ui/badge";

interface AppointmentOverviewCardProps {
    appointment: Appointment;
}

const STATUS_COLORS = {
    pending:
        "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved:
        "bg-blue-100 text-blue-800 border-blue-200",
    completed:
        "bg-green-100 text-green-800 border-green-200",
    rejected:
        "bg-red-100 text-red-800 border-red-200",
    cancelled:
        "bg-gray-100 text-gray-800 border-gray-200",
};

export default function AppointmentOverviewCard({
    appointment,
}: AppointmentOverviewCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            <div className="flex flex-col gap-4 w-full">

                <div className="flex items-center gap-2">

                    <Droplets className="h-6 w-6 text-red-500" />

                    <h1 className="text-2xl font-bold tracking-tight">
                        Appointment Overview
                    </h1>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Monitor and manage Appointment Overview
                </p>
                <div className="flex justify-between">

                    {/* Appointment ID */}

                    <div className="space-y-1">

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">

                            <Hash className="h-4 w-4" />

                            Appointment ID

                        </div>

                        <p className="font-semibold">
                            {appointment._id.slice(-8).toUpperCase()}
                        </p>

                    </div>

                    {/* Status */}

                    <div className="space-y-1">

                        <p className="text-sm text-muted-foreground">
                            Current Status
                        </p>

                        <Badge
                            variant="outline"
                            className={
                                STATUS_COLORS[appointment.status]
                            }
                        >
                            {appointment.status}
                        </Badge>

                    </div>

                    {/* Appointment Date */}

                    <div className="space-y-1">

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">

                            <Calendar className="h-4 w-4" />

                            Appointment Date

                        </div>

                        <p className="font-semibold">
                            {format(
                                new Date(appointment.appointmentDate),
                                "dd MMM yyyy"
                            )}
                        </p>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">

                            <Clock3 className="h-4 w-4" />

                            {format(
                                new Date(appointment.appointmentDate),
                                "hh:mm a"
                            )}

                        </div>

                    </div>

                    {/* Created */}

                    <div className="space-y-1">

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">

                            <CalendarPlus className="h-4 w-4" />

                            Created At

                        </div>

                        <p className="font-semibold">
                            {format(
                                new Date(appointment.createdAt),
                                "dd MMM yyyy"
                            )}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}