"use client";

import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/lib/validators/Appointment";

interface StatusBadgeProps {
    status: AppointmentStatus;
}

const STATUS_STYLES: Record<
    AppointmentStatus,
    {
        label: string;
        className: string;
    }
> = {
    pending: {
        label: "Pending",
        className:
            "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
    },

    approved: {
        label: "Approved",
        className:
            "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    },

    completed: {
        label: "Completed",
        className:
            "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
    },

    rejected: {
        label: "Rejected",
        className:
            "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
    },

    cancelled: {
        label: "Cancelled",
        className:
            "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
    },
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    const style = STATUS_STYLES[status];

    return (
        <Badge
            variant="outline"
            className={style.className}
        >
            {style.label}
        </Badge>
    );
}