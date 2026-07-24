"use client";

import {
    Award,
    CalendarClock,
    CalendarDays,
    HeartHandshake,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { DonorProfile } from "@/types/Donor";

interface Props {
    profile: DonorProfile;
}

export default function DonationStatisticsCard({
    profile,
}: Props) {
    const { donor } = profile;

    const lastDonation = donor.lastDonationDate
        ? new Date(donor.lastDonationDate)
        : null;

    const nextEligibleDate = lastDonation
        ? new Date(
            lastDonation.getTime() +
            90 * 24 * 60 * 60 * 1000
        )
        : null;

    return (
        <Card className="bg-card shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Donation Statistics
                </CardTitle>

                <CardDescription>
                    Your blood donation journey at a glance.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="grid gap-4 md:grid-cols-3">

                    <StatCard
                        icon={<HeartHandshake className="h-5 w-5" />}
                        title="Total Donations"
                        value={String(donor.donationCount)}
                    />

                    <StatCard
                        icon={<CalendarDays className="h-5 w-5" />}
                        title="Last Donation"
                        value={
                            lastDonation
                                ? lastDonation.toLocaleDateString("en-IN")
                                : "Never"
                        }
                    />

                    <StatCard
                        icon={<CalendarClock className="h-5 w-5" />}
                        title="Next Eligible"
                        value={
                            nextEligibleDate
                                ? nextEligibleDate.toLocaleDateString(
                                    "en-IN"
                                )
                                : "--"
                        }
                    />

                </div>

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="font-medium">
                        ❤️ Thank You!
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Every blood donation has the potential to save
                        multiple lives. Your contribution makes a real
                        difference to patients in need.
                    </p>

                </div>

            </CardContent>
        </Card>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

function StatCard({
    icon,
    title,
    value,
}: StatCardProps) {
    return (
        <div className="rounded-lg border p-5">

            <div className="mb-3 flex items-center gap-2 text-primary">
                {icon}
            </div>

            <p className="text-sm text-muted-foreground">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold">
                {value}
            </p>

        </div>
    );
}