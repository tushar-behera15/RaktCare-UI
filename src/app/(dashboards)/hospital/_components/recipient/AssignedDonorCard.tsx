import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
    UserRound,
    Mail,
    Phone,
    HeartHandshake,
} from "lucide-react";

import { Recipient } from "@/types/Recipient";

interface Props {
    recipient: Recipient;
}
export default function AssignedDonorCard({
    recipient,
}: Props) {

    if (!recipient.assignedDonorId) {

        return (

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <HeartHandshake className="h-5 w-5 text-primary" />

                        Assigned Donor

                    </CardTitle>

                </CardHeader>

                <CardContent className="flex flex-col items-center text-center">

                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">

                        <UserRound className="h-10 w-10 text-muted-foreground" />

                    </div>

                    <h3 className="text-lg font-semibold">

                        No Donor Assigned

                    </h3>

                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">

                        A compatible donor has not been assigned to this recipient yet.

                    </p>

                    <Button className="mt-6 w-full">

                        Find Matching Donors

                    </Button>

                </CardContent>

            </Card>

        );

    }

    const donor = recipient.assignedDonorId;

    return (
        <Card>

            <CardHeader>

                <CardTitle className="flex items-center gap-2">

                    <HeartHandshake className="h-5 w-5 text-primary" />

                    Assigned Donor

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                {/* Avatar */}

                <div className="flex flex-col items-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">

                        {donor.userId.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}

                    </div>

                    <h3 className="mt-4 text-lg font-semibold">

                        {donor.userId.fullName}

                    </h3>

                    <Badge className="mt-2">

                        🩸 {donor.userId.bloodGroup}

                    </Badge>

                </div>

                {/* Details */}

                <div className="space-y-4">

                    <div className="flex items-center gap-3">

                        <Mail className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm break-all">

                            {donor.userId.email}

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <Phone className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm">

                            {donor.userId.phone}

                        </span>

                    </div>

                </div>

                {/* Status */}

                <div className="rounded-lg border bg-muted/30 p-4">

                    <p className="text-sm text-muted-foreground">

                        Donation Status

                    </p>

                    <Badge className="mt-2">

                        Ready to Donate

                    </Badge>

                </div>

                {/* Action */}

                <Button
                    className="w-full"
                >

                    <Link href={`/hospital/dashboard/donors/${donor._id}`}>

                        View Donor Profile

                    </Link>

                </Button>

            </CardContent>

        </Card>
    );
}