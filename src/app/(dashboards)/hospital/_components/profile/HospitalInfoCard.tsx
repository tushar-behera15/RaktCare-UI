"use client";

import {
    Building2,
    ClipboardList,
    ShieldCheck,
    Phone,
} from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

interface Hospital {
    hospitalName: string;
    registrationNumber: string;
    licenseNumber: string;
    emergencyContact: string;
}

interface Props {
    hospital: Hospital;
}

export default function HospitalInfoCard({
    hospital,
}: Props) {
    const info = [
        {
            icon: Building2,
            label: "Hospital Name",
            value: hospital?.hospitalName,
        },
        {
            icon: ClipboardList,
            label: "Registration Number",
            value: hospital?.registrationNumber,
        },
        {
            icon: ShieldCheck,
            label: "License Number",
            value: hospital?.licenseNumber,
        },
        {
            icon: Phone,
            label: "Emergency Contact",
            value: hospital?.emergencyContact,
        },
    ];

    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <Building2 className="h-5 w-5 text-primary" />

                    Hospital Information

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="grid gap-5 md:grid-cols-2">

                    {info.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="rounded-xl border bg-muted/20 p-4"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

                                        <Icon className="h-5 w-5 text-primary" />

                                    </div>

                                    <div className="space-y-1">

                                        <p className="text-sm text-muted-foreground">
                                            {item.label}
                                        </p>

                                        <p className="font-semibold break-all">
                                            {item?.value}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </CardContent>

        </Card>
    );
}