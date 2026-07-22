"use client";

import { format } from "date-fns";
import {
    CalendarDays,
    Droplets,
    HeartHandshake,
    Mail,
    Phone,
    User,
} from "lucide-react";

import { Appointment } from "@/lib/validators/Appointment";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DonorInformationCardProps {
    appointment: Appointment;
}

export default function DonorInformationCard({
    appointment,
}: DonorInformationCardProps) {
    const donor = appointment?.donorId;
    const user = donor?.userId;

    const fullName = user?.fullName || "Donor";

    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .join("")
        .toUpperCase() || "D";

    return (
        <Card className="bg-card shadow-sm">
            <CardHeader>
                <CardTitle>Donor Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-lg font-semibold">
                            {fullName}
                        </h2>

                        <Badge className="mt-1">
                            <Droplets className="mr-1 h-3 w-3" />
                            {user?.bloodGroup}
                        </Badge>
                    </div>
                </div>

                <Separator />

                {/* Email */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                    </div>

                    <span className="font-medium">
                        {user?.email || "N/A"}
                    </span>
                </div>

                {/* Phone */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>Phone</span>
                    </div>

                    <span className="font-medium">
                        {user?.phone || "N/A"}
                    </span>
                </div>

                {/* Donation Count */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <HeartHandshake className="h-4 w-4" />
                        <span>Total Donations</span>
                    </div>

                    <Badge variant="secondary">
                        {donor?.donationCount ?? 0}
                    </Badge>
                </div>

                {/* Last Donation */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>Last Donation</span>
                    </div>

                    <span className="font-medium">
                        {donor?.lastDonationDate
                            ? format(
                                new Date(donor.lastDonationDate),
                                "dd MMM yyyy"
                            )
                            : "Never"}
                    </span>
                </div>

                {/* Availability */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Availability</span>
                    </div>

                    <Badge
                        variant={
                            donor?.isAvailableForDonation
                                ? "default"
                                : "destructive"
                        }
                    >
                        {donor?.isAvailableForDonation
                            ? "Available"
                            : "Unavailable"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}