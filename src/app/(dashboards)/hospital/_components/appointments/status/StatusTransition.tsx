import { AppointmentStatus } from "@/lib/validators/Appointment";

export const STATUS_TRANSITIONS: Record<
    AppointmentStatus,
    AppointmentStatus[]
> = {
    pending: ["approved", "rejected", "cancelled"],
    approved: ["completed", "cancelled"],
    completed: [],
    rejected: [],
    cancelled: [],
};

export interface StatusInfoItem {
    title: string;
    description: string;
    requiresRemarks: boolean;
    color: string;
    icon: string;
    points: string[];
}

export const STATUS_INFO: Record<AppointmentStatus, StatusInfoItem> = {
    pending: {
        title: "Pending Appointment",
        description:
            "This appointment is awaiting hospital action.",
        requiresRemarks: false,
        color: "yellow",
        icon: "⏳",
        points: [
            "Approve to confirm appointment.",
            "Reject if donor is not eligible.",
            "Cancel if hospital is unavailable.",
        ],
    },

    approved: {
        title: "Approve Appointment",
        description:
            "The donor will receive a confirmation notification.",
        requiresRemarks: false,
        color: "blue",
        icon: "✅",
        points: [
            "Donor is notified.",
            "Appointment becomes active.",
            "Can later be marked completed.",
        ],
    },

    rejected: {
        title: "Reject Appointment",
        description:
            "Reject this appointment with a valid reason.",
        requiresRemarks: true,
        color: "red",
        icon: "❌",
        points: [
            "Donor receives rejection notification.",
            "Appointment cannot be completed.",
            "Reason is saved.",
        ],
    },

    cancelled: {
        title: "Cancel Appointment",
        description:
            "Cancel this appointment.",
        requiresRemarks: true,
        color: "gray",
        icon: "🚫",
        points: [
            "Appointment becomes inactive.",
            "Donor is notified.",
            "Hospital can create another appointment later.",
        ],
    },

    completed: {
        title: "Complete Donation",
        description:
            "Complete the donation process.",
        requiresRemarks: false,
        color: "green",
        icon: "🩸",
        points: [
            "Donation count increases.",
            "Last donation date updates.",
            "Blood stock updates.",
        ],
    },
};