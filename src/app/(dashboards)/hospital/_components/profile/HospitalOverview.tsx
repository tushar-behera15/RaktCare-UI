"use client";

import {
    BadgeCheck,
    Building2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HospitalOverviewProps {
    hospital: {
        hospitalName: string;
        emergencyContact: string;
        city: string;
        state: string;
        registrationNumber: string;
        isVerified: boolean;
    };

    user: {
        email: string;
    };
}

export default function HospitalOverview({
    hospital,
    user,
}: HospitalOverviewProps) {

    return (
        <Card>
            <CardContent className="p-6">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-start gap-5">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                            <Building2 className="h-10 w-10 text-primary" />
                        </div>

                        <div className="space-y-3">

                            <div className="flex flex-wrap items-center gap-3">

                                <h2 className="text-2xl font-bold">
                                    {hospital?.hospitalName}
                                </h2>

                                {hospital?.isVerified ? (
                                    <Badge>
                                        <BadgeCheck className="mr-1 h-4 w-4" />
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        Pending Verification
                                    </Badge>
                                )}

                            </div>

                            <div className="grid gap-2 text-sm text-muted-foreground">

                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user?.email}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {hospital?.emergencyContact}
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {hospital?.city}, {hospital?.state}
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-xl border bg-muted/30 p-5">

                        <p className="text-sm text-muted-foreground">
                            Registration Number
                        </p>

                        <h3 className="mt-2 text-lg font-semibold">
                            {hospital?.registrationNumber}
                        </h3>

                    </div>

                </div>

            </CardContent>
        </Card>
    );
}