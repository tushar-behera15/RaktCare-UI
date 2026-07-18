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

import { BloodStock } from "@/types/BloodStock";
import { BloodStockFormData } from "@/lib/validators/bloodStock";

interface EditBloodStockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    stock: BloodStock | null;
    onSuccess: () => void;
}

export default function EditBloodStockDialog({
    open,
    onOpenChange,
    stock,
    onSuccess,
}: EditBloodStockDialogProps) {

    const [loading, setLoading] = useState(false);

    if (!stock) return null;

    const handleUpdate = async (
        values: BloodStockFormData
    ) => {
        try {

            setLoading(true);

            await axios.put(
                `http://localhost:5000/hospital/bloodstock/update/${stock._id}`,
                values,
                {
                    withCredentials: true,
                }
            );

            toast.success("Blood stock updated successfully.");

            onOpenChange(false);

            onSuccess();

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ??
                "Failed to update blood stock."
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
                        Edit Blood Stock
                    </DialogTitle>

                    <DialogDescription>
                        Update your blood inventory.
                    </DialogDescription>

                </DialogHeader>

                <BloodStockForm
                    defaultValues={{
                        bloodGroup: stock.bloodGroup,
                        availableUnits: stock.availableUnits,
                        reservedUnits: stock.reservedUnits,
                    }}
                    loading={loading}
                    submitText="Update Stock"
                    onSubmit={handleUpdate}
                />

            </DialogContent>
        </Dialog>
    );
}