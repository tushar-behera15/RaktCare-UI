/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


import { Appointment } from "@/lib/validators/Appointment";
import AppointmentOverviewCard from "./AppointmentOverviewCard";
import DonorInformationCard from "./DonorInformationCard";
import AppointmentInformationCard from "./AppointmentInformationCard";
import StatusUpdateCard from "./status/StatusUpdateCard";
import { Loader2 } from "lucide-react";


export default function AppointmentDetailsPage() {
    const { id } = useParams();

    const [appointment, setAppointment] =
        useState<Appointment | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAppointment();
    }, [id]);

    async function fetchAppointment() {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:5000/hospital/appointment/${id}`,
                {
                    withCredentials: true,
                }
            );

            setAppointment(res.data.data);

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ??
                "Failed to fetch appointment."
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!appointment) {
        return null;
    }

    return (

        <div className="space-y-6 p-3">

            <AppointmentOverviewCard
                appointment={appointment}
            />

            <div className="grid gap-6 lg:grid-cols-2">

                <DonorInformationCard
                    appointment={appointment}
                />

                <AppointmentInformationCard
                    appointment={appointment}
                />

            </div>

            <StatusUpdateCard
                appointment={appointment}
                onSuccess={fetchAppointment}
            />

        </div>

    );

}