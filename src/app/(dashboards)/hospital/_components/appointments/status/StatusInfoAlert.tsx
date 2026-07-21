"use client";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import { AppointmentStatus } from "@/lib/validators/Appointment";
import { STATUS_INFO } from "./StatusTransition";

interface Props {
    status: AppointmentStatus;
}

export default function StatusInfoAlert({
    status,
}: Props) {
    const info = STATUS_INFO[status];

    return (
        <Alert>
            <AlertTitle>
                {info.title}
            </AlertTitle>

            <AlertDescription className="space-y-3">
                <p>{info.description}</p>

                <ul className="list-disc pl-5 space-y-1">
                    {info.points.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}