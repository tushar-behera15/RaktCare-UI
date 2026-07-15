"use client";

import {
    MapPin,
    MapPinned,
    Building,
    LocateFixed,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Hospital {
    address: string;
    city: string;
    state: string;
    pincode: string;
}

interface Props {
    hospital: Hospital;
}

export default function AddressCard({
    hospital,
}: Props) {
    return (
        <Card className="h-full">

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <MapPinned className="h-5 w-5 text-primary" />

                    Address

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

                <div className="flex gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                        <MapPin className="h-5 w-5 text-primary" />

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Street Address
                        </p>

                        <p className="font-medium">
                            {hospital?.address}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-lg border p-4">

                        <div className="flex items-center gap-2 mb-2">

                            <Building className="h-4 w-4 text-primary" />

                            <span className="text-sm text-muted-foreground">
                                City
                            </span>

                        </div>

                        <p className="font-semibold">
                            {hospital?.city}
                        </p>

                    </div>

                    <div className="rounded-lg border p-4">

                        <div className="flex items-center gap-2 mb-2">

                            <LocateFixed className="h-4 w-4 text-primary" />

                            <span className="text-sm text-muted-foreground">
                                State
                            </span>

                        </div>

                        <p className="font-semibold">
                            {hospital?.state}
                        </p>

                    </div>

                </div>

                <div className="rounded-lg border p-4">

                    <p className="text-sm text-muted-foreground">
                        Pincode
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                        {hospital?.pincode}
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}