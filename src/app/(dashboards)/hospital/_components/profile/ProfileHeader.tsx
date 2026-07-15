"use client";

import { Building2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
    onEdit?: () => void;
}

export default function ProfileHeader({
    onEdit,
}: ProfileHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="space-y-1">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Hospital Profile
                        </h1>

                        <p className="text-muted-foreground">
                            Manage your hospital information and settings.
                        </p>

                    </div>

                </div>

            </div>

            <Button
                onClick={onEdit}
                className="w-full md:w-auto"
            >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
            </Button>

        </div>
    );
}