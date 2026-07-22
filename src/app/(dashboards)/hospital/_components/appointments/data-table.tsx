"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export default function AppointmentTable<TData>({
    columns,
    data,
}: Props<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">

            <Table>

                <TableHeader>

                    {table
                        .getHeaderGroups()
                        .map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map(
                                    (header) => (
                                        <TableHead
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                )}
                            </TableRow>
                        ))}

                </TableHeader>

                <TableBody>

                    {table.getRowModel().rows.length ? (
                        table
                            .getRowModel()
                            .rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row
                                        .getVisibleCells()
                                        .map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>

                            <TableCell
                                colSpan={
                                    columns.length
                                }
                                className="text-center h-24"
                            >
                                No appointments found.
                            </TableCell>

                        </TableRow>
                    )}

                </TableBody>

            </Table>
            {/* Pagination */}
            <div className="flex flex-col gap-4 border-t px-4 py-3 lg:flex-row lg:items-center lg:justify-between">

                {/* Selected rows */}

                <div className="text-sm text-muted-foreground">

                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected

                </div>

                <div className="flex items-center gap-6">

                    {/* Rows */}

                    <div className="flex items-center gap-2">

                        <p className="text-sm whitespace-nowrap">
                            Rows
                        </p>

                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) =>
                                table.setPageSize(Number(value))
                            }
                        >
                            <SelectTrigger className="h-8 w-17.5">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                {[5, 10, 20, 50].map((size) => (

                                    <SelectItem
                                        key={size}
                                        value={`${size}`}
                                    >
                                        {size}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Page */}

                    <div className="text-sm whitespace-nowrap">

                        Page{" "}
                        <span className="font-semibold">
                            {table.getState().pagination.pageIndex + 1}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                            {table.getPageCount()}
                        </span>

                    </div>

                    {/* Navigation */}

                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
}