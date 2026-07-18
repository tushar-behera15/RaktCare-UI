/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import BloodStockForm from "./BloodStockForm";
import { BloodStockFormData } from "@/lib/validators/bloodStock";

interface CreateBloodStockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function CreateBloodStockDialog({
    open,
    onOpenChange,
    onSuccess,
}: CreateBloodStockDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (
        values: BloodStockFormData
    ) => {
        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/hospital/bloodstock/create",
                values,
                {
                    withCredentials: true,
                }
            );

            toast.success(
                "Blood stock added successfully."
            );

            onOpenChange(false);

            onSuccess();

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                "Failed to add blood stock."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        Add Blood Stock
                    </DialogTitle>

                    <DialogDescription>
                        Add available blood units for your hospital.
                    </DialogDescription>

                </DialogHeader>

                <BloodStockForm
                    loading={loading}
                    submitText="Add Stock"
                    onSubmit={handleCreate}
                />

            </DialogContent>
        </Dialog>
    );
}