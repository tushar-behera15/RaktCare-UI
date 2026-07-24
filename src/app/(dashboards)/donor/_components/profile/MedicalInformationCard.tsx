"use client";

import {
    Droplets,
    Weight,
    HeartPulse,
    VenusAndMars,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { DonorProfile } from "@/types/Donor";

interface Props {
    profile: DonorProfile;
}

const BLOOD_GROUP_COLORS: Record<string, string> = {
    "A+": "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    "A-": "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    "B+": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    "B-": "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    "AB+": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    "AB-": "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    "O+": "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
    "O-": "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
};

export default function MedicalInformationCard({ profile }: Props) {
    const { user, donor } = profile;

    return (
        <Card className="bg-card shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-primary" />
                    Medical Information
                </CardTitle>

                <CardDescription>
                    Blood and health related information.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <InfoRow
                    icon={<Droplets className="h-4 w-4" />}
                    label="Blood Group"
                    value={
                        <Badge
                            variant="secondary"
                            className={
                                BLOOD_GROUP_COLORS[user.bloodGroup] ??
                                "bg-muted"
                            }
                        >
                            {user.bloodGroup}
                        </Badge>
                    }
                />

                <Separator />

                <InfoRow
                    icon={<Weight className="h-4 w-4" />}
                    label="Weight"
                    value={`${donor.weight} kg`}
                />

                <Separator />

                <InfoRow
                    icon={<HeartPulse className="h-4 w-4" />}
                    label="Hemoglobin"
                    value={`${donor.hemoglobin} g/dL`}
                />

                <Separator />

                <InfoRow
                    icon={<VenusAndMars className="h-4 w-4" />}
                    label="Gender"
                    value={user.gender}
                />
            </CardContent>
        </Card>
    );
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

function InfoRow({
    icon,
    label,
    value,
}: InfoRowProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>

            <div className="font-medium">{value}</div>
        </div>
    );
}