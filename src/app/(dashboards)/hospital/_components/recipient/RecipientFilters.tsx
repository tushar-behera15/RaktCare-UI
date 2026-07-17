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

interface RecipientFiltersProps {
    search: string;
    bloodGroup: string;
    urgency: string;
    status: string;

    onSearchChange: (value: string) => void;
    onBloodGroupChange: (value: string | null) => void;
    onUrgencyChange: (value: string | null) => void;
    onStatusChange: (value: string | null) => void;

    onReset: () => void;
}

export default function RecipientFilters({
    search,
    bloodGroup,
    urgency,
    status,

    onSearchChange,
    onBloodGroupChange,
    onUrgencyChange,
    onStatusChange,

    onReset,
}: RecipientFiltersProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Left Section */}
            <div className="flex flex-1 flex-wrap items-center gap-3">

                {/* Search */}
                <div className="relative min-w-65 flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search patient..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 h-7"
                    />
                </div>

                {/* Blood Group */}
                <Select
                    value={bloodGroup}
                    onValueChange={onBloodGroupChange}
                >
                    <SelectTrigger className="w-42.5">
                        <SelectValue placeholder="Blood Group" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Blood Groups</SelectItem>

                        {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                        ].map((group) => (
                            <SelectItem key={group} value={group}>
                                {group}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Urgency */}
                <Select
                    value={urgency}
                    onValueChange={onUrgencyChange}
                >
                    <SelectTrigger className="w-37.5">
                        <SelectValue placeholder="Urgency" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Urgencies</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger className="w-37.5">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>

            </div>

            {/* Right Section */}
            <Button
                variant="outline"
                onClick={onReset}
                className="shrink-0"
            >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Filters
            </Button>

        </div>
    );
}