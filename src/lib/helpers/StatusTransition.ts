import { AppointmentStatus } from "../validators/Appointment";


export const STATUS_TRANSITIONS: Record<
    AppointmentStatus,
    AppointmentStatus[]
> = {
    pending: [
        "approved",
        "rejected",
        "cancelled",
    ],

    approved: [
        "completed",
        "cancelled",
    ],

    completed: [],

    rejected: [],

    cancelled: [],
};