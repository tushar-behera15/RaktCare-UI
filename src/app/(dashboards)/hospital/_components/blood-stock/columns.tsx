"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    Pencil,
} from "lucide-react";

import { BloodStock } from "@/types/BloodStock";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnProps {
    onUpdate: (stock: BloodStock) => void;
}
export const STOCK_BADGE_COLORS = {
    available:
        "border-green-200 bg-green-100 text-green-700 hover:bg-green-200 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300 dark:hover:bg-green-900/60",

    low:
        "border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-200 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300 dark:hover:bg-orange-900/60",

    critical:
        "border-red-200 bg-red-100 text-red-700 hover:bg-red-200 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60",
} as const;

export function getColumns({
    onUpdate,
}: ColumnProps): ColumnDef<BloodStock>[] {

    return [
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
        // Blood Group

        {
            accessorKey: "bloodGroup",

            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === "asc"
                        )
                    }
                >
                    Blood Group
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),

            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-semibold">
                    {row.original.bloodGroup}
                </div>
            ),
        },

        // Available

        {
            accessorKey: "availableUnits",

            header: "Available",

            cell: ({ row }) => (
                <span className="font-semibold text-green-600">
                    {row.original.availableUnits}
                </span>
            ),
        },

        // Reserved

        {
            accessorKey: "reservedUnits",

            header: "Reserved",

            cell: ({ row }) => (
                <span className="font-semibold text-yellow-600">
                    {row.original.reservedUnits}
                </span>
            ),
        },

        // Total

        {
            accessorKey: "totalUnits",

            header: "Total",

            cell: ({ row }) => (
                <span className="font-semibold">
                    {row.original.totalUnits}
                </span>
            ),
        },

        // Status

        {
            id: "status",

            header: "Status",

            cell: ({ row }) => {
                const units = row.original.availableUnits;

                if (units === 0) {
                    return (
                        <Badge variant="destructive">
                            Out of Stock
                        </Badge>
                    );
                }

                if (units <= 5) {
                    return (
                        <Badge
                            className={STOCK_BADGE_COLORS.low}
                        >
                            Low Stock
                        </Badge>
                    );
                }

                return (
                    <Badge className={STOCK_BADGE_COLORS.available}>
                        Available
                    </Badge>
                );
            },
        },

        // Updated

        {
            accessorKey: "lastUpdated",

            header: "Last Updated",

            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {new Date(
                        row.original.lastUpdated
                    ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            ),
        },

        // Actions

        {
            id: "actions",

            header: "Actions",

            enableSorting: false,

            cell: ({ row }) => (
                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdate(row.original)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>


                </div>
            ),
        },
    ];
}