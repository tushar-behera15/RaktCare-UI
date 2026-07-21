"use client";

import { format } from "date-fns";
import {
    Building2,
    Calendar,
    Clock3,
    FileText,
    MapPin,
} from "lucide-react";

import { Appointment } from "@/lib/validators/Appointment";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AppointmentInformationCardProps {
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

export default function AppointmentInformationCard({
    appointment,
}: AppointmentInformationCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appointment Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Hospital */}

                <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Hospital
                        </p>

                        <h3 className="font-semibold text-lg">
                            {appointment.hospitalId.name}
                        </h3>
                    </div>

                </div>

                <Separator />

                {/* Appointment Date */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-muted-foreground">

                        <Calendar className="h-4 w-4" />

                        Appointment Date

                    </div>

                    <span className="font-medium">
                        {format(
                            new Date(appointment.appointmentDate),
                            "dd MMM yyyy"
                        )}
                    </span>

                </div>

                {/* Appointment Time */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-muted-foreground">

                        <Clock3 className="h-4 w-4" />

                        Appointment Time

                    </div>

                    <span className="font-medium">
                        {format(
                            new Date(appointment.appointmentDate),
                            "hh:mm a"
                        )}
                    </span>

                </div>

                {/* Status */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-muted-foreground">

                        <MapPin className="h-4 w-4" />

                        Status

                    </div>

                    <Badge
                        variant="outline"
                        className={
                            STATUS_COLORS[appointment.status]
                        }
                    >
                        {appointment.status}
                    </Badge>

                </div>

                {/* Remarks */}

                <div className="space-y-2">

                    <div className="flex items-center gap-2 text-muted-foreground">

                        <FileText className="h-4 w-4" />

                        Remarks

                    </div>

                    <div className="rounded-md border bg-muted/40 p-4 text-sm leading-6">

                        {appointment.remarks
                            ? appointment.remarks
                            : "No remarks provided."}

                    </div>

                </div>

            </CardContent>
        </Card>
    );
}