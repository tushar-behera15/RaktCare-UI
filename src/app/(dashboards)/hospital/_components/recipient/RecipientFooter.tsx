import { CalendarDays, Clock3 } from "lucide-react";

import { Recipient } from "@/types/Recipient";

interface Props {
    recipient: Recipient;
}

export default function RecipientFooter({
    recipient,
}: Props) {
    const createdAt = new Date(recipient.createdAt);
    const updatedAt = new Date(recipient.updatedAt);

    return (
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-dashed bg-muted/30 p-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

                <div className="rounded-lg bg-background p-2">

                    <CalendarDays className="h-5 w-5 text-primary" />

                </div>

                <div>

                    <p className="text-sm text-muted-foreground">
                        Created On
                    </p>

                    <p className="font-medium">
                        {createdAt.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3">

                <div className="rounded-lg bg-background p-2">

                    <Clock3 className="h-5 w-5 text-primary" />

                </div>

                <div>

                    <p className="text-sm text-muted-foreground">
                        Last Updated
                    </p>

                    <p className="font-medium">
                        {updatedAt.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                </div>

            </div>

        </div>
    );
}