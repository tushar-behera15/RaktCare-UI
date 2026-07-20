'use client'
import React, { useEffect, useState } from 'react'
import AppointmentHeader from '../../_components/appointments/AppointmentHeader'
import axios from 'axios';
import AppointmentStats from '../../_components/appointments/AppointmentStats';
import { Appointment } from '@/lib/validators/Appointment';
import AppointmentFilters from '../../_components/appointments/AppointmentFilters';
import { getColumns } from '../../_components/appointments/columns';
import AppointmentTable from '../../_components/appointments/data-table';

const AppointmentPage = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("all");

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

            <AppointmentTable
                columns={getColumns({
                    onStatusUpdate: (appointment: Appointment) => {
                        console.log(appointment);

                    },
                })}
                data={appointments}
            />
        </div>

    )
}

export default AppointmentPage