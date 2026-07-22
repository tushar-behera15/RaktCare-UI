"use client";

import { UserRoundPlus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RecipientHeaderProps {
    onCreate?: () => void;
}

export default function RecipientHeader({
    onCreate,
}: RecipientHeaderProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            {/* Left */}

            <div>

                <div className="flex items-center gap-2">

                    <UserRoundPlus className="h-6 w-6 text-primary" />

                    <h1 className="text-2xl font-bold tracking-tight">
                        Recipients
                    </h1>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Monitor and manage blood recipients and monitor blood requests.
                </p>

            </div>

            {/* Button */}

            <Button
                onClick={onCreate}
                className="w-full md:w-auto"
            >
                <Plus className="mr-2 h-4 w-4" />

                Add Recipient

            </Button>

        </div>
    );
}