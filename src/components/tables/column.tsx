"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    ArrowUpDown,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Recipient } from "@/types/Recipient";
import Link from "next/link";

export const getColumns = ({
    onUpdate,
    onDelete
}: {
    onUpdate: (recipient: Recipient) => void;
    onDelete: (recipient: Recipient) => void;
}): ColumnDef<Recipient>[] => [

        // Checkbox

        {
            id: "select",

            header: ({ table }) => (

                <Checkbox

                    checked={table.getIsAllPageRowsSelected()}

                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }

                />

            ),

            cell: ({ row }) => (

                <Checkbox

                    checked={row.getIsSelected()}

                    onCheckedChange={(value) =>
                        row.toggleSelected(!!value)
                    }

                />

            ),

            enableSorting: false,
        },

        // Patient

        {
            accessorKey: "patientName",

            header: ({ column }) => (

                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === "asc"
                        )
                    }
                >
                    Patient

                    <ArrowUpDown className="ml-2 h-4 w-4" />

                </Button>

            ),

            cell: ({ row }) => (

                <div className="font-medium">

                    {row.original.patientName}

                </div>

            ),
        },

        // Blood Group

        {
            accessorKey: "bloodGroup",

            header: "Blood",

            cell: ({ row }) => (

                <Badge>

                    🩸 {row.original.bloodGroup}

                </Badge>

            ),
        },

        // Units

        {
            accessorKey: "unitNeeded",

            header: "Units",

            cell: ({ row }) => row.original.unitNeeded,
        },

        // Urgency

        {
            accessorKey: "urgency",

            header: "Urgency",

            cell: ({ row }) => {

                const urgency = row.original.urgency;

                return (

                    <Badge

                        variant={
                            urgency === "high"
                                ? "destructive"
                                : urgency === "medium"
                                    ? "secondary"
                                    : "default"
                        }

                    >

                        {urgency}

                    </Badge>

                );

            },
        },

        // Status

        {
            accessorKey: "status",

            header: "Status",

            cell: ({ row }) => (

                <Badge
                    variant={
                        row.original.status === "completed"
                            ? "default"
                            : "secondary"
                    }
                >

                    {row.original.status}

                </Badge>

            ),
        },

        // Assigned Donor

        {
            accessorKey: "assignedDonorId",

            header: "Assigned Donor",

            cell: ({ row }) => {
                const donor = row.original.assignedDonorId;

                return donor ? (
                    donor.userId.fullName
                ) : (
                    <span className="text-muted-foreground">
                        Not Assigned
                    </span>
                );
            }
        },

        // Actions

        {

            header: "Actions",
            id: "actions",

            cell: ({ row }) => {

                return (
                    <div className="flex gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdate(row.original)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"

                        >
                            <Link href={`/hospital/dashboard/patients/${row.original._id}`}>
                                <Eye className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>


                );

            },
        },

    ];