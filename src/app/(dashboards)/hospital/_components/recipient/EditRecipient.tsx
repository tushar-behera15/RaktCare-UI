/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    recipientSchema,
    RecipientFormData,
} from "@/lib/validators/recipient.shema";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";



import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Recipient } from "@/types/Recipient";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    recipient: Recipient;
}

export default function EditRecipientDialog({
    open,
    onOpenChange,
    onSuccess,
    recipient
}: Props) {
    const [loading, setLoading] = useState(false);

    const [diseaseInput, setDiseaseInput] = useState("");

    const form = useForm({
        resolver: zodResolver(recipientSchema),

        defaultValues: {
            patientName: "",
            age: 18,
            gender: "male",
            contactNo: "",
            bloodGroup: "O+",
            unitNeeded: 1,
            urgency: "medium",
            diseases: [],
        },
    });

    const diseases = form.watch("diseases");
    useEffect(() => {
        if (!recipient) return;

        form.reset({
            patientName: recipient.patientName,
            age: recipient.age,
            gender: recipient.gender,
            contactNo: recipient.contactNo,
            bloodGroup: recipient.bloodGroup as any,
            unitNeeded: recipient.unitNeeded,
            urgency: recipient.urgency,
            diseases: recipient.diseases ?? [],
        });
    }, [recipient, form]);
    const addDisease = () => {

        if (!diseaseInput.trim()) return;

        form.setValue("diseases", [
            ...(diseases ?? []),
            diseaseInput.trim(),
        ]);

        setDiseaseInput("");
    };

    const removeDisease = (index: number) => {

        form.setValue(
            "diseases",
            diseases?.filter((_, i) => i !== index)
        );

    };
    const handleClose = () => {
        form.reset();
        onOpenChange(false);
    };

    const onSubmit = async (
        values: RecipientFormData
    ) => {

        try {

            setLoading(true);

            await axios.put(
                `http://localhost:5000/hospital/recipient/update/${recipient?._id}`,
                values,
                {
                    withCredentials: true,
                }
            );

            toast.success("Recipient updated successfully");

            form.reset();

            onSuccess();

            onOpenChange(false);

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ??
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };
    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-3xl">

                <DialogHeader>

                    <DialogTitle>

                        Edit Recipient

                    </DialogTitle>

                    <DialogDescription>

                        Update recipient information.

                    </DialogDescription>

                </DialogHeader>

                <ScrollArea className="max-h-[70vh] pr-3">


                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Controller
                                    control={form.control}
                                    name="patientName"
                                    render={({ field }) => (
                                        <div className="space-y-2">

                                            <Label>

                                                Patient Name

                                            </Label>


                                            <Input
                                                placeholder="Rahul Sharma"
                                                {...field}
                                            />



                                        </div>


                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label>Age</Label>
                                            <Input
                                                type="number"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </div>





                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label>Gender</Label>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >

                                                <SelectTrigger>

                                                    <SelectValue />

                                                </SelectTrigger>

                                                <SelectContent>

                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>

                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>

                                                    <SelectItem value="other">
                                                        Other
                                                    </SelectItem>

                                                </SelectContent>

                                            </Select>


                                        </div>
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="contactNo"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label>Contact No.</Label>
                                            <Input
                                                type="tel"
                                                placeholder="9876543210"
                                                maxLength={10}
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                <Controller
                                    control={form.control}
                                    name="bloodGroup"
                                    render={({ field, fieldState }) => (

                                        <div className="space-y-2">

                                            <Label>
                                                Blood Group
                                            </Label>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >

                                                <SelectTrigger>
                                                    <SelectValue placeholder="Blood Group" />
                                                </SelectTrigger>

                                                <SelectContent>

                                                    <SelectItem value="A+">A+</SelectItem>

                                                    <SelectItem value="A-">A-</SelectItem>

                                                    <SelectItem value="B+">B+</SelectItem>

                                                    <SelectItem value="B-">B-</SelectItem>

                                                    <SelectItem value="AB+">AB+</SelectItem>

                                                    <SelectItem value="AB-">AB-</SelectItem>

                                                    <SelectItem value="O+">O+</SelectItem>

                                                    <SelectItem value="O-">O-</SelectItem>

                                                </SelectContent>

                                            </Select>

                                            {fieldState.error && (
                                                <p className="text-sm text-destructive">
                                                    {fieldState.error.message}
                                                </p>
                                            )}

                                        </div>

                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="unitNeeded"
                                    render={({ field }) => (
                                        <div className="space-y-2">

                                            <Label>Units Needed</Label>

                                            <Input
                                                type="number"
                                                min={1}
                                                max={10}
                                                placeholder="2"
                                                value={field.value}
                                                onChange={(e) =>
                                                    field.onChange(Number(e.target.value))
                                                }
                                            />
                                        </div>



                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="urgency"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            <Label>Urgency</Label>

                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >

                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Urgency" />
                                                </SelectTrigger>

                                                <SelectContent>

                                                    <SelectItem value="high">
                                                        🔴 High
                                                    </SelectItem>

                                                    <SelectItem value="medium">
                                                        🟡 Medium
                                                    </SelectItem>

                                                    <SelectItem value="low">
                                                        🟢 Low
                                                    </SelectItem>

                                                </SelectContent>

                                            </Select>

                                        </div>

                                    )}
                                />


                            </div>
                            {/* Diseases */}
                            <div className="space-y-3">

                                <Label>

                                    Diseases

                                </Label>

                                <div className="flex gap-2">

                                    <Input
                                        placeholder="Type disease"
                                        value={diseaseInput}
                                        onChange={(e) =>
                                            setDiseaseInput(e.target.value)
                                        }
                                    />

                                    <Button
                                        type="button"
                                        onClick={addDisease}
                                    >

                                        <Plus className="h-4 w-4" />

                                    </Button>

                                </div>

                                <div className="flex flex-wrap gap-2">

                                    {diseases?.map((disease, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1"
                                        >

                                            <span>

                                                {disease}

                                            </span>

                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="ghost"
                                                className="h-5 w-5"
                                                onClick={() =>
                                                    removeDisease(index)
                                                }
                                            >

                                                <X className="h-3 w-3" />

                                            </Button>

                                        </div>

                                    ))}

                                </div>

                            </div>
                            <div className="flex justify-end gap-3">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Recipient"
                                    )}
                                </Button>

                            </div>

                        </div>


                    </form>


                </ScrollArea>

            </DialogContent>

        </Dialog>

    );
}