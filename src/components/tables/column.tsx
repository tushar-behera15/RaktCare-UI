"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
    ArrowUpDown,
    MoreHorizontal,
    Eye,
    Pencil,
    UserSearch,
    CheckCircle2,
    Trash2,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Recipient } from "@/types/Recipient";

export const columns: ColumnDef<Recipient>[] = [

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
        id: "actions",

        cell: ({ row }) => {


            return (

                <DropdownMenu>

                    <DropdownMenuTrigger>

                        <Button
                            variant="ghost"
                            size="icon"
                        >

                            <MoreHorizontal className="h-4 w-4" />

                        </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                        <DropdownMenuItem>

                            <Eye className="mr-2 h-4 w-4" />

                            View Details

                        </DropdownMenuItem>

                        <DropdownMenuItem>

                            <Pencil className="mr-2 h-4 w-4" />

                            Edit Recipient

                        </DropdownMenuItem>

                        <DropdownMenuItem>

                            <UserSearch className="mr-2 h-4 w-4" />

                            Find Matching Donors

                        </DropdownMenuItem>

                        <DropdownMenuItem>

                            <CheckCircle2 className="mr-2 h-4 w-4" />

                            Confirm Donation

                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                        >

                            <Trash2 className="mr-2 h-4 w-4" />

                            Delete

                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            );

        },
    },

];