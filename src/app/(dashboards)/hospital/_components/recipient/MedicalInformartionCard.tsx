import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { HeartPulse, CircleAlert } from "lucide-react";

import { Recipient } from "@/types/Recipient";

interface Props {
    recipient: Recipient;
}
export default function MedicalInformationCard({
    recipient,
}: Props) {
    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <HeartPulse className="h-5 w-5 text-primary" />

                    Medical Information

                </CardTitle>

                <CardDescription>
                    Recipient&apos;s medical details and blood requirement.
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-8">

                {/* Blood Requirement */}

                <div>

                    <h4 className="mb-4 font-semibold">
                        Blood Requirement
                    </h4>

                    <div className="grid gap-5 sm:grid-cols-2">

                        <div className="rounded-lg border p-4">

                            <p className="text-sm text-muted-foreground">
                                Units Required
                            </p>

                            <p className="mt-2 text-2xl font-bold">
                                {recipient.unitNeeded}
                            </p>

                        </div>

                        <div className="rounded-lg border p-4">

                            <p className="text-sm text-muted-foreground">
                                Urgency
                            </p>

                            <Badge
                                className="mt-3 capitalize"
                                variant={
                                    recipient.urgency === "high"
                                        ? "destructive"
                                        : recipient.urgency === "medium"
                                            ? "secondary"
                                            : "default"
                                }
                            >
                                {recipient.urgency}
                            </Badge>

                        </div>

                    </div>

                </div>

                {/* Diseases */}

                <div>

                    <h4 className="mb-4 font-semibold">
                        Medical History
                    </h4>

                    {recipient.diseases.length ? (

                        <div className="flex flex-wrap gap-2">

                            {recipient.diseases.map((disease) => (

                                <Badge
                                    key={disease}
                                    variant="outline"
                                >
                                    {disease}
                                </Badge>

                            ))}

                        </div>

                    ) : (

                        <div className="flex items-center gap-2 rounded-lg border border-dashed p-4 text-muted-foreground">

                            <CircleAlert className="h-4 w-4" />

                            No diseases or medical history recorded.

                        </div>

                    )}

                </div>

            </CardContent>

        </Card>
    );
}