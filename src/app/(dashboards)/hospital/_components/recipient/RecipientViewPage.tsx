"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { Recipient } from "@/types/Recipient";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {

    Droplets,
    ArrowLeft,
    Pencil,
    Package2,
    TriangleAlert,
    Activity,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AssignedDonorCard from "./AssignedDonorCard";
import MedicalInformationCard from "./MedicalInformartionCard";
import RecipientFooter from "./RecipientFooter";
import EditRecipientDialog from "./EditRecipient";
export default function RecipientViewPage() {
    const { id } = useParams<{ id: string }>();
    const [editOpen, setEditOpen] = useState(false);
    const [recipient, setRecipient] = useState<Recipient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipient() {
            try {
                const res = await axios.get(
                    `http://localhost:5000/hospital/recipient/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                setRecipient(res.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipient();
    }, [id]);

    const refreshRecipient = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/hospital/recipient/${id}`,
                {
                    withCredentials: true,
                }
            );

            setRecipient(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };



    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipient) {
        return <p>Recipient not found.</p>;
    }

    return (
        <>
            <div className="space-y-6 p-3">

                {/* Header */}
                <div className="rounded-xl border bg-card p-4 shadow-sm">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="space-y-3">

                            <Link
                                href="/hospital/dashboard/patients"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Patients
                            </Link>

                            <div>

                                <h1 className="text-3xl font-bold">
                                    {recipient.patientName}
                                </h1>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Recipient ID:
                                    <span className="ml-1 font-medium">
                                        #{recipient._id.slice(-6).toUpperCase()}
                                    </span>
                                </p>

                            </div>

                            <p className="text-muted-foreground">
                                View recipient information and donation status.
                            </p>

                        </div>

                        <Button onClick={() => setEditOpen(true)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Recipient
                        </Button>

                    </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Blood Group */}

                    <Card>

                        <CardContent className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Blood Group
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    {recipient.bloodGroup}
                                </h3>

                            </div>

                            <div className="rounded-full bg-red-100 p-3 text-red-600">

                                <Droplets className="h-6 w-6" />

                            </div>

                        </CardContent>

                    </Card>

                    {/* Units */}

                    <Card>

                        <CardContent className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Units Needed
                                </p>

                                <h3 className="mt-2 text-xl font-bold">
                                    {recipient.unitNeeded}
                                </h3>

                            </div>

                            <div className="rounded-full bg-blue-100 p-3 text-blue-600">

                                <Package2 className="h-6 w-6" />

                            </div>

                        </CardContent>

                    </Card>

                    {/* Urgency */}

                    <Card>

                        <CardContent className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Urgency
                                </p>

                                <Badge
                                    className="mt-2 capitalize"
                                    variant={
                                        recipient.urgency === "high"
                                            ? "destructive"
                                            : recipient.urgency === "medium"
                                                ? "secondary"
                                                : "default"
                                    }
                                >
                                    {recipient.urgency}
                                </Badge>

                            </div>

                            <div className="rounded-full bg-orange-100 p-3 text-orange-600">

                                <TriangleAlert className="h-6 w-6" />

                            </div>

                        </CardContent>

                    </Card>

                    {/* Status */}

                    <Card>

                        <CardContent className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Status
                                </p>

                                <Badge
                                    className="mt-2 capitalize"
                                    variant={
                                        recipient.status === "completed"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {recipient.status}
                                </Badge>

                            </div>

                            <div className="rounded-full bg-green-100 p-3 text-green-600">

                                <Activity className="h-6 w-6" />

                            </div>

                        </CardContent>

                    </Card>

                </div>

                {/* Grid */}
                <div className="space-y-6">

                    <div className="grid gap-6 xl:grid-cols-3">

                        {/* Patient */}

                        <div className="xl:col-span-2">

                            <div className="space-y-5">

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Patient Name
                                    </span>

                                    <span className="font-medium">
                                        {recipient.patientName}
                                    </span>

                                </div>

                                <Separator />

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Age
                                    </span>

                                    <span className="font-medium">
                                        {recipient.age} Years
                                    </span>

                                </div>

                                <Separator />

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Gender
                                    </span>

                                    <span className="font-medium capitalize">
                                        {recipient.gender}
                                    </span>

                                </div>

                                <Separator />

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Blood Group
                                    </span>

                                    <Badge>
                                        {recipient.bloodGroup}
                                    </Badge>

                                </div>

                                <Separator />

                                <div className="flex justify-between">

                                    <span className="text-muted-foreground">
                                        Contact
                                    </span>

                                    <span className="font-medium">
                                        {recipient.contactNo}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Assigned Donor */}

                        <AssignedDonorCard recipient={recipient} />

                    </div>

                    <MedicalInformationCard recipient={recipient} />

                    <RecipientFooter recipient={recipient} />

                </div>


            </div>
            <EditRecipientDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                recipient={recipient}
                onSuccess={refreshRecipient}
            />

        </>

    );
}