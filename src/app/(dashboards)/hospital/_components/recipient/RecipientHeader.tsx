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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            {/* Left */}

            <div className="space-y-1">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                        <UserRoundPlus className="h-6 w-6 text-primary" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Recipients
                        </h1>

                        <p className="text-muted-foreground">
                            Manage blood recipients and monitor blood requests.
                        </p>

                    </div>

                </div>

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