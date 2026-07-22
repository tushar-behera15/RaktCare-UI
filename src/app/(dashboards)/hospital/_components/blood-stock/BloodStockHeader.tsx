"use client";

import { Plus, Droplets } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BloodStockHeaderProps {
    onCreate: () => void;
}

export default function BloodStockHeader({
    onCreate,
}: BloodStockHeaderProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            <div>

                <div className="flex items-center gap-2">

                    <Droplets className="h-6 w-6 text-primary" />

                    <h1 className="text-2xl font-bold tracking-tight">
                        Blood Inventory
                    </h1>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Monitor and manage blood stock availability across all blood groups.
                </p>

            </div>

            <Button
                onClick={onCreate}
                size="lg"
            >
                <Plus className="mr-2 h-4 w-4" />

                Add Blood Stock
            </Button>

        </div>
    );
} 