"use client";

import {
    Clock3,
    Sunrise,
    Sunset,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Hospital {
    openingTime: string;
    closingTime: string;
}

interface Props {
    hospital: Hospital;
}

export default function WorkingHoursCard({
    hospital,
}: Props) {
    return (
        <Card className="h-full bg-card shadow-sm">

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <Clock3 className="h-5 w-5 text-primary" />

                    Working Hours

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                <div className="rounded-xl bg-background/40 p-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-primary/10 p-3">

                            <Sunrise className="h-5 w-5 text-primary" />

                        </div>

                        <div>

                            <p className="text-sm text-muted-foreground">
                                Opening Time
                            </p>

                            <p className="text-sm font-semibold">
                                {hospital?.openingTime}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="rounded-xl bg-background/40 p-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-lg bg-primary/10 p-3">

                            <Sunset className="h-5 w-5 text-primary" />

                        </div>

                        <div>

                            <p className="text-sm text-muted-foreground">
                                Closing Time
                            </p>

                            <p className="text-sm font-semibold">
                                {hospital?.closingTime}
                            </p>

                        </div>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}