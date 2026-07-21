"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
    Calendar,
    Clock3,
    Droplets,
    Info,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Appointment,
    AppointmentStatus,
} from "@/lib/validators/Appointment";
import { AlertDialogContent } from "@/components/ui/alert-dialog";

interface UpdateAppointmentStatusDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    appointment: Appointment | null;

    nextStatus: AppointmentStatus;

    onSuccess: () => void;
}

const STATUS_CONFIG: Record<
    AppointmentStatus,
    {
        title: string;
        description: string;
        remarksRequired: boolean;
        badgeClass: string;
        points: string[];
    }
> = {
    pending: {
        title: "Pending Appointment",
        description:
            "This appointment is waiting for hospital action.",
        remarksRequired: false,
        badgeClass:
            "bg-yellow-100 text-yellow-800 border-yellow-200",
        points: [
            "Approve to confirm appointment.",
            "Reject if donor is not eligible.",
            "Cancel if hospital is unavailable.",
        ],
    },

    approved: {
        title: "Approve Appointment",
        description:
            "The donor will receive an approval notification.",
        remarksRequired: false,
        badgeClass:
            "bg-blue-100 text-blue-800 border-blue-200",
        points: [
            "Appointment becomes active.",
            "Donor can visit hospital.",
            "Hospital can later mark it completed.",
        ],
    },

    completed: {
        title: "Complete Appointment",
        description:
            "Completing will permanently record the donation.",
        remarksRequired: false,
        badgeClass:
            "bg-green-100 text-green-800 border-green-200",
        points: [
            "Donation count updated.",
            "Last donation date updated.",
            "Blood stock updated.",
        ],
    },

    rejected: {
        title: "Reject Appointment",
        description:
            "Rejecting requires a valid reason.",
        remarksRequired: true,
        badgeClass:
            "bg-red-100 text-red-800 border-red-200",
        points: [
            "Donor will be notified.",
            "Appointment cannot be completed.",
            "Reason will be saved.",
        ],
    },

    cancelled: {
        title: "Cancel Appointment",
        description:
            "Cancelling requires a valid reason.",
        remarksRequired: true,
        badgeClass:
            "bg-gray-100 text-gray-800 border-gray-200",
        points: [
            "Appointment will be closed.",
            "Donor will be notified.",
            "Reason will be saved.",
        ],
    },
};

export default function UpdateAppointmentStatusDialog({
    open,
    onOpenChange,
    appointment,
    nextStatus,
    onSuccess,
}: UpdateAppointmentStatusDialogProps) {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState("");

    if (!appointment) return null;

    const config = useMemo(
        () => STATUS_CONFIG[nextStatus],
        [nextStatus]
    );

    const donor = appointment.donorId.userId;

    const remarksError =
        config.remarksRequired &&
        remarks.trim().length === 0;

    const handleUpdate = async () => {
        if (!appointment) return;

        if (remarksError) {
            toast.error("Please provide remarks.");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.patch(
                `http://localhost:5000/hospital/appointment/status/${appointment._id}`,
                {
                    status: nextStatus,
                    remarks,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success(
                res.data?.message ??
                "Appointment updated successfully."
            );

            setRemarks("");

            onSuccess();

            onOpenChange(false);

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ??
                "Failed to update appointment."
            );

        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    setRemarks("");
                }

                onOpenChange(value);
            }}
        >
            <AlertDialogContent className="sm:max-w-2xl">

                <div className="border-b bg-muted/40 px-6 py-5">

                    <DialogHeader>

                        <DialogTitle className="text-xl">

                            {config.title}

                        </DialogTitle>

                        <DialogDescription>

                            Review the appointment before updating its status.

                        </DialogDescription>

                    </DialogHeader>

                </div>

                {/* Appointment Summary */}

                <div className="rounded-lg border p-5 space-y-4">

                    <div className="flex items-start justify-between">

                        <div>

                            <h3 className="font-semibold text-lg">
                                {donor.fullName}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {donor.email}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {donor.phone}
                            </p>

                        </div>

                        <div className="space-y-2 text-right">

                            <Badge variant="secondary">
                                <Droplets className="mr-1 h-3 w-3" />
                                {donor.bloodGroup}
                            </Badge>

                            <Badge
                                variant="outline"
                                className={config.badgeClass}
                            >
                                {appointment.status}
                            </Badge>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">

                        <div className="flex items-center gap-2 text-sm">

                            <Calendar className="h-4 w-4 text-muted-foreground" />

                            {format(
                                new Date(
                                    appointment.appointmentDate
                                ),
                                "dd MMM yyyy"
                            )}

                        </div>

                        <div className="flex items-center gap-2 text-sm">

                            <Clock3 className="h-4 w-4 text-muted-foreground" />

                            {format(
                                new Date(
                                    appointment.appointmentDate
                                ),
                                "hh:mm a"
                            )}

                        </div>

                    </div>

                </div>

                {/* Information */}

                <Alert>

                    <Info className="h-4 w-4" />

                    <AlertTitle>
                        {config.title}
                    </AlertTitle>

                    <AlertDescription className="space-y-3">

                        <p>{config.description}</p>

                        <ul className="list-disc pl-5 space-y-1">

                            {config.points.map((point) => (
                                <li key={point}>
                                    {point}
                                </li>
                            ))}

                        </ul>

                    </AlertDescription>

                </Alert>

                {/* Remarks */}

                <div className="space-y-2">

                    <Label>
                        Remarks
                        {config.remarksRequired && (
                            <span className="text-red-500 ml-1">
                                *
                            </span>
                        )}
                    </Label>

                    <Textarea
                        rows={4}
                        placeholder="Enter remarks..."
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                    />

                    {remarksError && (
                        <p className="text-sm text-red-500">
                            Remarks are required.
                        </p>
                    )}

                </div>
                <DialogFooter className="gap-2">

                    <Button
                        variant="outline"
                        disabled={loading}
                        onClick={() => {
                            setRemarks("");
                            onOpenChange(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={
                            loading ||
                            remarksError
                        }
                        onClick={handleUpdate}
                    >
                        {
                            loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Status"
                            )
                        }
                    </Button>

                </DialogFooter>
            </AlertDialogContent>
        </Dialog>
    )
}