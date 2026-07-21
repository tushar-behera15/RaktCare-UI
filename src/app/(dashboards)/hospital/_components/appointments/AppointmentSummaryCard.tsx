"use client";

import { format } from "date-fns";
import {
    Calendar,
    Clock3,
    Droplets,
    Mail,
    Phone,
    User2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./status/StatusBadge";
import { Appointment, AppointmentStatus } from "@/lib/validators/Appointment";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS_TRANSITIONS } from "@/lib/helpers/StatusTransition";
import { useState } from "react";

interface AppointmentSummaryCardProps {
    appointment: Appointment;
}

export default function AppointmentSummaryCard({
    appointment,
}: AppointmentSummaryCardProps) {
    const [status, setStatus] = useState<AppointmentStatus>();
    const donor = appointment.donorId.userId;

    return (
        <>
            <Card>
                <CardContent className="space-y-6 p-6">

                    {/* Donor Details */}

                    <div>

                        <h3 className="mb-4 font-semibold">
                            Donor Information
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">

                            <div className="flex items-center gap-3">
                                <User2 className="h-5 w-5 text-muted-foreground" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Full Name
                                    </p>

                                    <p className="font-medium">
                                        {donor.fullName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Droplets className="h-5 w-5 text-red-500" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Blood Group
                                    </p>

                                    <p className="font-medium">
                                        {donor.bloodGroup}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Email
                                    </p>

                                    <p className="font-medium">
                                        {donor.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Phone
                                    </p>

                                    <p className="font-medium">
                                        {donor.phone}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Appointment Details */}

                    <div>

                        <h3 className="mb-4 font-semibold">
                            Appointment Information
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">

                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Date
                                    </p>

                                    <p className="font-medium">
                                        {format(
                                            new Date(
                                                appointment.appointmentDate
                                            ),
                                            "dd MMM yyyy"
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock3 className="h-5 w-5 text-muted-foreground" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Time
                                    </p>

                                    <p className="font-medium">
                                        {format(
                                            new Date(
                                                appointment.appointmentDate
                                            ),
                                            "hh:mm a"
                                        )}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Current Status */}

                    <div>

                        <h3 className="mb-3 font-semibold">
                            Current Status
                        </h3>

                        <StatusBadge
                            status={appointment.status}
                        />

                    </div>

                </CardContent>
            </Card>
            <div className="space-y-2">

                <Label>Change Status</Label>

                <Select
                    value={status}
                    onValueChange={(value) =>
                        setStatus(value as AppointmentStatus)
                    }
                    disabled={
                        STATUS_TRANSITIONS[
                            appointment.status
                        ].length === 0
                    }
                >

                    <SelectTrigger>

                        <SelectValue />

                    </SelectTrigger>

                    <SelectContent>

                        {STATUS_TRANSITIONS[
                            appointment.status
                        ].map((item) => (

                            <SelectItem
                                key={item}
                                value={item}
                            >
                                {item.charAt(0).toUpperCase() +
                                    item.slice(1)}
                            </SelectItem>

                        ))}

                    </SelectContent>

                </Select>


            </div>
        </>

    );
}