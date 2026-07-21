"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppointmentStatus } from "@/lib/validators/Appointment";
import { STATUS_INFO } from "./StatusTransition";

interface Props {
    status: AppointmentStatus;
    selected: boolean;
    onClick: () => void;
}

export default function StatusActionCard({
    status,
    selected,
    onClick,
}: Props) {
    const info = STATUS_INFO[status];

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "rounded-lg border p-4 text-left transition-all hover:border-primary hover:shadow-sm",
                selected &&
                "border-primary bg-primary/5 ring-1 ring-primary"
            )}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-semibold">
                        {info.icon} {info.title}
                    </h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {info.description}
                    </p>
                </div>

                {selected && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
            </div>
        </button>
    );
}