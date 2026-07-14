import { z } from "zod";

// ─── Shared ────────────────────────────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

const pincodeSchema = z
  .string()
  .regex(/^\d{6}$/, "Enter a valid 6-digit pincode");

// ─── Donor Step 1 ──────────────────────────────────────────────────────────

export const donorStep1Schema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
    email: z.string().email("Enter a valid email address"),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
      required_error: "Please select a gender",
    }),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      required_error: "Please select a blood group",
    }),
    address: z.string().min(5, "Address must be at least 5 characters").max(300),
    city: z.string().min(2, "City must be at least 2 characters").max(100),
    state: z.string().min(2, "Please select a state"),
    pincode: pincodeSchema,
    profileImage: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type DonorStep1Data = z.infer<typeof donorStep1Schema>;

// ─── Donor Step 2 ──────────────────────────────────────────────────────────

export const donorStep2Schema = z.object({
  weight: z
    .number()
    .min(45, "Weight must be at least 45 kg")
    .max(200, "Weight must be at most 200 kg")
    .optional(),

  hemoglobin: z
    .number()
    .min(5, "Hemoglobin must be at least 5 g/dL")
    .max(20, "Hemoglobin must be at most 20 g/dL")
    .optional(),
  diseases: z.array(z.string()),
  lastDonationDate: z.date().optional(),
  availableForDonation: z.boolean(),
  donationCount: z.number(),
});

export type DonorStep2Data = z.infer<typeof donorStep2Schema>;

export type DonorFormData = DonorStep1Data & DonorStep2Data;

// ─── Hospital Step 1 ───────────────────────────────────────────────────────

export const hospitalStep1Schema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Enter a valid email address"),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type HospitalStep1Data = z.infer<typeof hospitalStep1Schema>;

// ─── Hospital Step 2 ───────────────────────────────────────────────────────

export const hospitalStep2Schema = z.object({
  hospitalName: z.string().min(2, "Hospital name must be at least 2 characters").max(200),
  registrationNumber: z.string().min(3, "Enter a valid registration number"),
  licenseNumber: z.string().min(3, "Enter a valid license number"),
  address: z.string().min(5, "Address must be at least 5 characters").max(300),
  city: z.string().min(2, "City must be at least 2 characters").max(100),
  state: z.string().min(2, "Please select a state"),
  pincode: pincodeSchema,
  emergencyContact: phoneSchema,
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
});

export type HospitalStep2Data = z.infer<typeof hospitalStep2Schema>;

export type HospitalFormData = HospitalStep1Data & HospitalStep2Data;
