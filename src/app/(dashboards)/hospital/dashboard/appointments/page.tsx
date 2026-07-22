'use client'
import React, { useEffect, useState } from 'react'
import AppointmentHeader from '../../_components/appointments/AppointmentHeader'
import axios from 'axios';
import AppointmentStats from '../../_components/appointments/AppointmentStats';
import { Appointment } from '@/lib/validators/Appointment';
import AppointmentFilters from '../../_components/appointments/AppointmentFilters';
import { getColumns } from '../../_components/appointments/columns';
import AppointmentTable from '../../_components/appointments/data-table';
import UpdateAppointmentStatusDialog from '../../_components/appointments/AppointmentUpdateStatus';
import { Loader2 } from 'lucide-react';

const AppointmentPage = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("all");
    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null);

    const [statusDialogOpen, setStatusDialogOpen] =
        useState(false);

    const [nextStatus, setNextStatus] =
        useState<Appointment["status"]>("pending");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/hospital/appointments/all", {
                withCredentials: true,
            })

            if (res.data) {
                setAppointments(res.data.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearch("");
        setStatus("all");
    };

    useEffect(() => {
        fetchAppointments();
    }, [])

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    return (
        <div className='p-3 space-y-6'>

            <AppointmentHeader
                onRefresh={fetchAppointments}
                loading={loading}
            />

            <AppointmentStats
                appointments={appointments}
            />

            <AppointmentFilters
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
                onReset={handleReset}
            />

            <div className='bg-card rounded-md shadow-sm'>

                <AppointmentTable
                    columns={getColumns({

                        onStatusUpdate: (appointment, status) => {
                            setSelectedAppointment(appointment);
                            setNextStatus(status);
                            setStatusDialogOpen(true);
                        },
                    })}
                    data={appointments}
                />

                <UpdateAppointmentStatusDialog
                    open={statusDialogOpen}
                    onOpenChange={setStatusDialogOpen}
                    appointment={selectedAppointment}
                    nextStatus={nextStatus}
                    onSuccess={fetchAppointments}
                />
            </div>
        </div>

    )
}

export default AppointmentPage