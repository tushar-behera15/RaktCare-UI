/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Appointment,
    AppointmentStatus,
} from "@/lib/validators/Appointment";

import StatusActionCard from "./StatusActionCard";
import StatusInfoAlert from "./StatusInfoAlert";
import { STATUS_INFO, STATUS_TRANSITIONS } from "./StatusTransition";


interface Props {
    appointment: Appointment;
    onSuccess: () => void;
}

export default function StatusUpdateCard({
    appointment,
    onSuccess,
}: Props) {
    const actions = useMemo(
        () => STATUS_TRANSITIONS[appointment.status],
        [appointment.status]
    );

    const [selectedStatus, setSelectedStatus] =
        useState<AppointmentStatus | null>(
            actions[0] ?? null
        );

    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);

    if (!actions.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Status Management</CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground">
                        No further status updates are available for this appointment.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const info =
        selectedStatus &&
        STATUS_INFO[selectedStatus];

    const remarksRequired =
        info?.requiresRemarks ?? false;

    const handleUpdate = async () => {
        if (!selectedStatus) return;

        if (
            remarksRequired &&
            remarks.trim().length === 0
        ) {
            toast.error(
                "Remarks are required."
            );
            return;
        }

        try {
            setLoading(true);

            await axios.patch(
                `http://localhost:5000/hospital/appointment/status/${appointment._id}`,
                {
                    status: selectedStatus,
                    remarks,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success(
                "Appointment updated successfully."
            );

            setRemarks("");
            onSuccess();
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
        <Card>
            <CardHeader>
                <CardTitle>Status Management</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <Label>Current Status</Label>

                    <p className="mt-2 capitalize font-medium">
                        {appointment.status}
                    </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {actions.map((status) => (
                        <StatusActionCard
                            key={status}
                            status={status}
                            selected={
                                selectedStatus === status
                            }
                            onClick={() =>
                                setSelectedStatus(status)
                            }
                        />
                    ))}
                </div>

                {selectedStatus && (
                    <StatusInfoAlert
                        status={selectedStatus}
                    />
                )}

                <div className="space-y-2">
                    <Label>
                        Remarks
                        {remarksRequired && (
                            <span className="text-destructive">
                                {" "}
                                *
                            </span>
                        )}
                    </Label>

                    <Textarea
                        rows={4}
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                        placeholder="Enter remarks..."
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        Update Status
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}