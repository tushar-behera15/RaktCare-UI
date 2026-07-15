/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import RecipientHeader from "../../_components/recipient/RecipientHeader";
import RecipientStats from "../../_components/recipient/RecipientStats";
import RecipientFilters from "../../_components/recipient/RecipientFilters";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/column";

// import RecipientFilters from "@/components/hospital/recipients/RecipientFilters";
// import RecipientTable from "@/components/hospital/recipients/RecipientTable";
// import CreateRecipientDialog from "@/components/hospital/recipients/CreateRecipientDialog";

export interface Recipient {
    _id: string;
    patientName: string;
    age: number;
    gender: "male" | "female" | "other";
    contactNo: string;
    bloodGroup: string;
    unitNeeded: number;
    urgency: "high" | "medium" | "low";
    diseases: string[];
    status: "pending" | "completed";

    assignedDonorId?: {
        _id: string;
        userId: {
            fullName: string;
            email: string;
            phone: string;
            bloodGroup: string;
        };
    } | null;
}

export default function RecipientPage() {
    const [loading, setLoading] = useState(true);

    const [recipients, setRecipients] = useState<Recipient[]>([]);

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [search, setSearch] = useState("");

    const [bloodGroup, setBloodGroup] = useState<string | null>(null);

    const [urgency, setUrgency] = useState<string | null>(null);

    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRecipients() {
            try {
                const res = await axios.get(
                    "http://localhost:5000/hospital/recipient/all",
                    {
                        withCredentials: true,
                    }
                );

                setRecipients(res.data.recipients);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch recipients."
                );
            } finally {
                setLoading(false);
            }
        }
        fetchRecipients();
    }, []);
    const handleReset = () => {
        setSearch("");
        setBloodGroup("all");
        setUrgency("all");
        setStatus("all");
    };


    const total = recipients?.length;

    const pending = recipients?.filter(
        (r) => r.status === "pending"
    ).length;

    const completed = recipients?.filter(
        (r) => r.status === "completed"
    ).length;

    const highUrgency = recipients?.filter(
        (r) => r.urgency === "high"
    ).length;

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">

            <RecipientHeader
                onCreate={() => setOpenCreateDialog(true)}
            />

            <RecipientStats
                total={total}
                pending={pending}
                completed={completed}
                highUrgency={highUrgency}
            />

            {/* <RecipientFilters /> */}
            <RecipientFilters
                search={search}
                bloodGroup={bloodGroup as string}
                urgency={urgency as string}
                status={status as string}
                onSearchChange={setSearch}
                onBloodGroupChange={setBloodGroup}
                onUrgencyChange={setUrgency}
                onStatusChange={setStatus}
                onReset={handleReset}
            />

            {/* Next Component */}
            {/* <RecipientTable recipients={recipients} /> */}

            <DataTable
                columns={columns}
                data={recipients}
            />


            {/* Next Component */}
            {/* <CreateRecipientDialog
                open={openCreateDialog}
                onOpenChange={setOpenCreateDialog}
                onSuccess={fetchRecipients}
            /> */}

        </div>
    );
}