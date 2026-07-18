"use client";

import { Search, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AppointmentFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;

    status: string;
    onStatusChange: (value: string) => void;

    onReset: () => void;
}

export default function AppointmentFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    onReset,
}: AppointmentFiltersProps) {
    const [value, setValue] = useState("all");
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center">

            <div className="relative flex-1">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Search donor..."
                    className="pl-10"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                />

            </div>


            <Select
                value={status}
                onValueChange={(value) => {
                    console.log("Selected:", value);
                    setValue(value ?? "");
                }}
            >

                <SelectTrigger className="w-full md:w-45">

                    <SelectValue placeholder="Status" />

                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="all">
                        All
                    </SelectItem>

                    <SelectItem value="pending">
                        Pending
                    </SelectItem>

                    <SelectItem value="approved">
                        Approved
                    </SelectItem>

                    <SelectItem value="completed">
                        Completed
                    </SelectItem>

                    <SelectItem value="rejected">
                        Rejected
                    </SelectItem>

                    <SelectItem value="cancelled">
                        Cancelled
                    </SelectItem>

                </SelectContent>

            </Select>

            <Button
                variant="outline"
                onClick={onReset}
            >
                <RotateCcw className="mr-2 h-4 w-4" />

                Reset
            </Button>

        </div>
    );
}