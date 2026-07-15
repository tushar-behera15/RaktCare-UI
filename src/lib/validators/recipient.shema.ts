import { z } from "zod";

export const recipientSchema = z.object({
  patientName: z
    .string({ required_error: "Patient name is required" })
    .min(2, "Patient name must be at least 2 characters")
    .max(100),
  
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(1, "Age must be at least 1")
    .max(120, "Age must be at most 120"),
  
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  
  contactNo: z
    .string({ required_error: "Contact number is required" })
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Please select a blood group",
  }),
  
  unitNeeded: z.coerce
    .number({
      required_error: "Units needed is required",
      invalid_type_error: "Units must be a number",
    })
    .min(1, "Units must be at least 1"),
  
  urgency: z.enum(["high", "medium", "low"], {
    required_error: "Please select urgency level",
  }),
  
  diseases: z.array(z.string()).default([]),
  
  status: z.enum(["pending", "completed"]).default("pending"),
});

export type RecipientFormData = z.infer<typeof recipientSchema>;
