"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, Pencil } from "lucide-react";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/validators/Appointment";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnProps {
    onStatusUpdate: (
        appointment: Appointment,
        status: Appointment["status"]
    ) => void;
}

export const getColumns = ({
    onStatusUpdate,
}: ColumnProps): ColumnDef<Appointment>[] => [
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
        {
            accessorKey: "donor",
            header: "Donor",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">
                        {row.original.donorId.userId.fullName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {row.original.donorId.userId.email}
                    </p>
                </div>
            ),
        },

        {
            accessorKey: "bloodGroup",
            header: "Blood Group",
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {row.original.donorId.userId.bloodGroup}
                </Badge>
            ),
        },

        {
            accessorKey: "appointmentDate",
            header: "Appointment Date",
            cell: ({ row }) =>
                format(
                    new Date(row.original.appointmentDate),
                    "dd MMM yyyy"
                ),
        },

        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge>
                    {row.original.status}
                </Badge>
            ),
        },

        {
            accessorKey: "remarks",
            header: "Remarks",
            cell: ({ row }) =>
                row.original.remarks || "-",
        },

        {
            id: "actions",

            header: "Actions",

            enableSorting: false,

            cell: ({ row }) => (
                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            onStatusUpdate(row.original, row.original.status);
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"

                    >
                        <Link href={`/hospital/dashboard/appointments/${row.original._id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>


                </div>
            ),
        },
    ];