"use client";

import {
    ShieldCheck,
    Stethoscope,
    HeartHandshake,
} from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { DonorProfile } from "@/types/Donor";

interface Props {
    profile: DonorProfile;
}

export default function HealthInformationCard({
    profile,
}: Props) {
    const { donor } = profile;

    return (
        <Card className="bg-card shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Health Information
                </CardTitle>

                <CardDescription>
                    Medical conditions and donation availability.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Diseases */}

                <div className="space-y-3">
                    <div className="flex items-center gap-2 font-medium">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        Diseases
                    </div>

                    {donor.diseases.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {donor.diseases.map((disease) => (
                                <Badge
                                    key={disease}
                                    variant="secondary"
                                >
                                    {disease}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No medical conditions reported.
                        </p>
                    )}
                </div>

                <Separator />

                {/* Availability */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 font-medium">
                        <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                        Donation Availability
                    </div>

                    <Badge
                        className={
                            donor.isAvailableForDonation
                                ? "border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
                                : "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                        }
                    >
                        {donor.isAvailableForDonation
                            ? "Available"
                            : "Not Available"}
                    </Badge>

                </div>

                <Separator />

                {/* Eligibility */}

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="font-medium">
                        Eligibility Status
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {donor.isAvailableForDonation
                            ? "You are currently eligible to receive donation requests."
                            : "You are currently not eligible for blood donation."}
                    </p>

                </div>

            </CardContent>
        </Card>
    );
}