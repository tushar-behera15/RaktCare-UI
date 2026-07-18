"use client";

import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    bloodStockSchema,
    BloodStockFormData,
} from "@/lib/validators/bloodStock";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
interface BloodStockFormProps {
    defaultValues?: BloodStockFormData;
    loading: boolean;
    submitText: string;
    onSubmit: (values: BloodStockFormData) => void;
}
export default function BloodStockForm({
    defaultValues,
    loading,
    submitText,
    onSubmit,
}: BloodStockFormProps) {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<BloodStockFormData>({
        resolver: zodResolver(bloodStockSchema),

        defaultValues:
            defaultValues ?? {
                bloodGroup: "A+",
                availableUnits: 0,
                reservedUnits: 0,
            },
    });

    useEffect(() => {

        if (defaultValues) {
            reset(defaultValues);
        }

    }, [defaultValues, reset]);

    const total =
        Number(watch("availableUnits") ?? 0) +
        Number(watch("reservedUnits") ?? 0);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="space-y-2">

                <Label>Blood Group</Label>

                <Controller
                    control={control}
                    name="bloodGroup"
                    render={({ field }) => (

                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >

                            <SelectTrigger>

                                <SelectValue />

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

                    )}
                />

                <p className="text-sm text-red-500">

                    {errors.bloodGroup?.message}

                </p>

            </div>
            <div className="space-y-2">

                <Label>Available Units</Label>

                <Controller
                    control={control}
                    name="availableUnits"
                    render={({ field }) => (

                        <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={field.onChange}
                        />

                    )}
                />

                <p className="text-sm text-red-500">

                    {errors.availableUnits?.message}

                </p>

            </div>
            <div className="space-y-2">

                <Label>Reserved Units</Label>

                <Controller
                    control={control}
                    name="reservedUnits"
                    render={({ field }) => (

                        <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={field.onChange}
                        />

                    )}
                />

                <p className="text-sm text-red-500">

                    {errors.reservedUnits?.message}

                </p>

            </div>
            <div className="rounded-lg border bg-muted p-5">

                <p className="text-sm text-muted-foreground">

                    Total Units

                </p>

                <h2 className="text-3xl font-bold">

                    {total}

                </h2>

            </div>

            <div className="flex justify-end">

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {loading ? (

                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            Saving...

                        </>

                    ) : (

                        submitText

                    )}

                </Button>

            </div>
        </form>

    );
}