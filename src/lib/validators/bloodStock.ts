import { z } from "zod";

export const bloodStockSchema = z
    .object({
        bloodGroup: z.enum([
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
        ]),

        availableUnits: z.coerce
            .number()
            .min(0, "Available units cannot be negative"),

        reservedUnits: z.coerce
            .number()
            .min(0, "Reserved units cannot be negative"),
    })
    .transform((data) => ({
        ...data,
        totalUnits:
            data.availableUnits +
            data.reservedUnits,
    }));

export type BloodStockFormData =
    z.input<typeof bloodStockSchema>;