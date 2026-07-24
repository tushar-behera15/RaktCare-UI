"use client";

import { Mail, Phone, Cake, User } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import { DonorProfile } from "@/types/Donor";
import { calculateAge } from "@/lib/helpers/ageCalculator";

interface Props {
    profile: DonorProfile;
}

export default function PersonalInformationCard({
    profile,
}: Props) {
    const { user } = profile;
    const age = calculateAge(user.dateOfBirth)

    const initials =
        user.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "D";

    return (
        <Card className="bg-card shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                </CardTitle>

                <CardDescription>
                    View your personal details.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-col items-center">

                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-lg font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <h3 className="mt-3 text-lg font-semibold">
                        {user.fullName}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Blood Donor
                    </p>

                </div>

                <Separator />

                <div className="space-y-4">

                    <InfoRow
                        icon={<Mail className="h-4 w-4" />}
                        label="Email"
                        value={user.email}
                    />

                    <InfoRow
                        icon={<Phone className="h-4 w-4" />}
                        label="Phone"
                        value={user.phone}
                    />

                    <InfoRow
                        icon={<Cake className="h-4 w-4" />}
                        label="Age"
                        value={`${age} Years`}
                    />

                </div>

            </CardContent>
        </Card>
    );
}

interface RowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({
    icon,
    label,
    value,
}: RowProps) {
    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 text-muted-foreground">

                {icon}

                <span>{label}</span>

            </div>

            <span className="font-medium">{value}</span>

        </div>
    );
}