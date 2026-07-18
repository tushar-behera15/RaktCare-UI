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

interface BloodStockFiltersProps {
    search: string;
    status: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;

    onReset: () => void;
}

export default function BloodStockFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
    onReset,
}: BloodStockFiltersProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div className="flex flex-1 flex-col gap-3 md:flex-row">

                <div className="relative flex-1">

                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search blood group..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="pl-9"
                    />

                </div>

                <Select
                    value={status}
                    onValueChange={() => onStatusChange}
                >
                    <SelectTrigger className="w-full md:w-55">
                        <SelectValue placeholder="Stock Status" />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All
                        </SelectItem>

                        <SelectItem value="available">
                            Available
                        </SelectItem>

                        <SelectItem value="low">
                            Low Stock
                        </SelectItem>

                        <SelectItem value="out">
                            Out of Stock
                        </SelectItem>

                    </SelectContent>

                </Select>

            </div>

            {/* Right */}

            <Button
                variant="outline"
                onClick={onReset}
            >
                <RotateCcw className="mr-2 h-4 w-4" />

                Reset Filters

            </Button>

        </div>
    );
}