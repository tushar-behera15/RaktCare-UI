"use client";

import { Pencil, UserPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
    onEdit?: () => void;
}

export default function ProfileHeader({
    onEdit,
}: ProfileHeaderProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            <div className="space-y-1">

                <div className="flex items-center gap-3">

                    <UserPlusIcon className="h-10 w-10 text-primary" />

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Donor Profile
                        </h1>

                        <p className="text-muted-foreground">
                            Manage your donor information and settings.
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