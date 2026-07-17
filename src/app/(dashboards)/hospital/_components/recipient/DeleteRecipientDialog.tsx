/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Recipient } from "@/types/Recipient";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteRecipientDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    recipient: Recipient | null;
    onSuccess: () => void;
}

export default function DeleteRecipientDialog({
    open,
    onOpenChange,
    recipient,
    onSuccess,
}: DeleteRecipientDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!recipient) return;

        try {
            setLoading(true);

            await axios.delete(
                `http://localhost:5000/hospital/recipient/delete/${recipient._id}`,
                {
                    withCredentials: true,
                }
            );

            toast.success("Recipient deleted successfully.");

            onOpenChange(false);

            onSuccess();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete recipient."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-5 w-5" />
                        Delete Recipient
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <strong>{recipient?.patientName}</strong>?

                        <br />
                        <br />

                        This action cannot be undone.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel disabled={loading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Recipient"
                        )}
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}