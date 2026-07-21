/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    AlertCircle,
    CheckCircle2,
    Info,
    XCircle,
} from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { AppointmentStatus } from "@/lib/validators/Appointment";


interface StatusInfoCardProps {
    status: AppointmentStatus;
}

const STATUS_INFO = {
    approved: {
        title: "Approve Appointment",
        icon: Info,
        className: "border-blue-200 bg-blue-50 dark:bg-blue-950/20",
        description:
            "The donor will be notified that the appointment has been approved.",
        points: [
            "Appointment will become active.",
            "Donor can visit the hospital on the scheduled date.",
            "Hospital can later mark the appointment as completed.",
        ],
    },

    completed: {
        title: "Complete Appointment",
        icon: CheckCircle2,
        className: "border-green-200 bg-green-50 dark:bg-green-950/20",
        description:
            "Completing this appointment will permanently record the donation.",
        points: [
            "Donor donation count will increase.",
            "Last donation date will be updated.",
            "Hospital blood stock will be updated.",
        ],
    },

    rejected: {
        title: "Reject Appointment",
        icon: XCircle,
        className: "border-red-200 bg-red-50 dark:bg-red-950/20",
        description:
            "Rejecting this appointment requires a valid reason.",
        points: [
            "Donor will receive a rejection notification.",
            "Appointment cannot be completed later.",
            "Please provide remarks before submitting.",
        ],
    },

    cancelled: {
        title: "Cancel Appointment",
        icon: AlertCircle,
        className: "border-gray-200 bg-gray-50 dark:bg-gray-900",
        description:
            "Cancelling will close this appointment.",
        points: [
            "Donor will receive a cancellation notification.",
            "Appointment will no longer be active.",
            "Please provide remarks before submitting.",
        ],
    },

    pending: {
        title: "Pending Appointment",
        icon: Info,
        className: "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20",
        description:
            "This appointment is waiting for hospital action.",
        points: [
            "Approve to confirm.",
            "Reject if donor is not eligible.",
            "Cancel if hospital is unavailable.",
        ],
    },
};

export default function StatusInfoCard({
    status,
}: StatusInfoCardProps) {

    const config = STATUS_INFO[status];

    const Icon = config.icon;

    return (
        <Alert className={config.className}>

            <Icon className="h-5 w-5" />

            <AlertTitle>
                {config.title}
            </AlertTitle>

            <AlertDescription className="mt-2 space-y-3">

                <p>
                    {config.description}
                </p>

                <ul className="space-y-2">

                    {config.points.map((point: any) => (
                        <li
                            key={point}
                            className="flex items-start gap-2 text-sm"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />

                            <span>
                                {point}
                            </span>

                        </li>
                    ))}

                </ul>

            </AlertDescription>

        </Alert>
    );
}