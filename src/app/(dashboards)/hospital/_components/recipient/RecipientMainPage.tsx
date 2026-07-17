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
import CreateRecipientDialog from "../../_components/recipient/CreateRecipientDialog";
import EditRecipientDialog from "../../_components/recipient/EditRecipient";
import { getColumns } from "@/components/tables/column";
import { Recipient } from "@/types/Recipient";
import DeleteRecipientDialog from "../../_components/recipient/DeleteRecipientDialog";


export default function RecipientPage() {
    const [loading, setLoading] = useState(true);

    const [recipients, setRecipients] = useState<Recipient[]>([]);

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [search, setSearch] = useState("");

    const [bloodGroup, setBloodGroup] = useState<string | null>(null);

    const [urgency, setUrgency] = useState<string | null>(null);

    const [status, setStatus] = useState<string | null>(null);
    const [selectedRecipient, setSelectedRecipient] =
        useState<Recipient | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);



    useEffect(() => {
        fetchRecipients();
    }, []);
    async function fetchRecipients() {
        try {
            const res = await axios.get(
                "http://localhost:5000/hospital/recipient/all",
                {
                    withCredentials: true,
                }
            );

            setRecipients(res.data.data);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch recipients."
            );
        } finally {
            setLoading(false);
        }
    }

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
            <div className="rounded-xl border bg-card">

                <div className="border-b p-3">
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
                </div>

                <DataTable
                    columns={getColumns({
                        onUpdate: (recipient) => {
                            setSelectedRecipient(recipient);
                            setEditOpen(true);
                        },

                        onDelete: (recipient) => {
                            setSelectedRecipient(recipient);
                            setDeleteOpen(true);
                        },
                    })}
                    data={recipients}
                />

            </div>


            {/* Next Component */}
            <CreateRecipientDialog
                open={openCreateDialog}
                onOpenChange={setOpenCreateDialog}
                onSuccess={fetchRecipients}
            />

            <EditRecipientDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                recipient={selectedRecipient as Recipient}
                onSuccess={fetchRecipients}
            />

            <DeleteRecipientDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                recipient={selectedRecipient as Recipient}
                onSuccess={fetchRecipients}
            />

        </div>
    );
}