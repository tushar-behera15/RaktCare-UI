/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { StepIndicator } from "@/components/forms/StepIndicator";
import { PasswordInput } from "@/components/forms/PasswordInput";
import axios from "axios"

import {
  hospitalStep1Schema,
  hospitalStep2Schema,
  type HospitalStep1Data,
  type HospitalStep2Data,
} from "@/features/auth/signup/types";
import { INDIAN_STATES } from "@/features/auth/signup/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ─── Field Wrapper ─────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <Label className="text-xs font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5" aria-hidden>*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-[10px] text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-[10px] text-destructive font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Slide animation ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.97,
  }),
};

const slideTransition = { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const };

const STEPS = [
  { id: 1, label: "Admin Details", description: "Account info" },
  { id: 2, label: "Hospital Details", description: "Facility info" },
];

// ─── Component ────────────────────────────────────────────────────────────

interface HospitalSignupFormProps {
  onBack?: () => void;
}

export function HospitalSignupForm({ onBack }: HospitalSignupFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [direction, setDirection] = React.useState(1);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [step1Data, setStep1Data] = React.useState<Partial<HospitalStep1Data>>({});
  const [pendingHospitalData, setPendingHospitalData] = React.useState<Partial<HospitalStep2Data>>({})
  const router = useRouter();
  const form1 = useForm<HospitalStep1Data>({
    resolver: zodResolver(hospitalStep1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      ...step1Data,
    } as Partial<HospitalStep1Data>,
    mode: "onChange",
  });

  const form2 = useForm<HospitalStep2Data>({
    resolver: zodResolver(hospitalStep2Schema),
    defaultValues: {
      hospitalName: "",
      registrationNumber: "",
      licenseNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      emergencyContact: "",
      openingTime: "08:00",
      closingTime: "20:00",
    },
    mode: "onChange",
  });

  const goToStep = (next: number) => {
    setDirection(next > currentStep ? 1 : -1);
    setCurrentStep(next);
  };

  const handleStep1Next = form1.handleSubmit((data) => {
    setStep1Data(data);
    setCompletedSteps((prev) => [...new Set([...prev, 1])]);
    goToStep(2);
  });

  const handleStep2Submit = form2.handleSubmit(async (step2) => {
    try {
      setIsSubmitting(true);

      const finalData = {
        ...step1Data,
      };
      const hospitalData = {
        ...step2,
      }
      const signupData = {
        fullName: finalData.fullName,
        email: finalData.email,
        phone: finalData.phone,
        role: "hospital",
        password: finalData.password
      }

      console.log(hospitalData);
      await axios.post("http://localhost:5000/auth/signup", signupData, {
        withCredentials: true,
      });
      sessionStorage.setItem(
        "pendingRegistration",
        JSON.stringify({
          role: "hospital",
          profileData: hospitalData,
        })
      );
      console.log("pendingDonorData", pendingHospitalData);

      router.push(`/auth/verify-otp?email=${encodeURIComponent(finalData.email ?? "")}`);



    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  });

  const watchPassword = form1.watch("password");


  return (
    <div className="flex flex-col gap-6">
      <StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} />
      <Separator />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <HospitalStep1Form
                form={form1}
                watchPassword={watchPassword}
                onNext={handleStep1Next}
                onBack={onBack}
              />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
            >
              <HospitalStep2Form
                form={form2}
                onPrev={() => { setDirection(-1); goToStep(1); }}
                onSubmit={handleStep2Submit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Hospital Step 1 ──────────────────────────────────────────────────────

interface HospitalStep1FormProps {
  form: ReturnType<typeof useForm<HospitalStep1Data>>;
  watchPassword: string;
  onNext: () => void;
  onBack?: () => void;
}

function HospitalStep1Form({ form, watchPassword, onNext, onBack }: HospitalStep1FormProps) {
  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Admin Name */}
        <Field label="Hospital Admin Name" required error={errors.fullName?.message}>
          <Input
            {...register("fullName")}
            placeholder="Dr. Priya Sharma"
            aria-invalid={!!errors.fullName}
            className={errors.fullName ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="admin@cityhospital.com"
            aria-invalid={!!errors.email}
            className={errors.email ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Phone */}
        <Field label="Phone Number" required error={errors.phone?.message} hint="10-digit Indian mobile number">
          <Input
            {...register("phone")}
            type="tel"
            placeholder="9876543210"
            maxLength={10}
            aria-invalid={!!errors.phone}
            className={errors.phone ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Spacer on desktop */}
        <div className="hidden sm:block" />

        {/* Password */}
        <Field label="Password" required error={errors.password?.message}>
          <PasswordInput
            {...register("password")}
            placeholder="Create a strong password"
            showStrength
            value={watchPassword}
            error={!!errors.password}
          />
        </Field>

        {/* Confirm Password */}
        <Field label="Confirm Password" required error={errors.confirmPassword?.message}>
          <PasswordInput
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
            error={!!errors.confirmPassword}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2">
        {onBack ? (
          <Button type="button" variant="ghost" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeftIcon className="h-3.5 w-3.5" />
            Back
          </Button>
        ) : (
          <div />
        )}
        <Button type="submit" size="sm" className="gap-1.5 min-w-28">
          Next Step
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  );
}

// ─── Hospital Step 2 ──────────────────────────────────────────────────────

interface HospitalStep2FormProps {
  form: ReturnType<typeof useForm<HospitalStep2Data>>;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function HospitalStep2Form({ form, onPrev, onSubmit, isSubmitting }: HospitalStep2FormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Hospital Name */}
        <Field label="Hospital Name" required error={errors.hospitalName?.message} className="sm:col-span-2">
          <Input
            {...register("hospitalName")}
            placeholder="City General Hospital"
            aria-invalid={!!errors.hospitalName}
            className={errors.hospitalName ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Registration Number */}
        <Field label="Registration Number" required error={errors.registrationNumber?.message}>
          <Input
            {...register("registrationNumber")}
            placeholder="MH/2024/HOSP/1234"
            aria-invalid={!!errors.registrationNumber}
            className={errors.registrationNumber ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* License Number */}
        <Field label="License Number" required error={errors.licenseNumber?.message}>
          <Input
            {...register("licenseNumber")}
            placeholder="LIC-2024-123456"
            aria-invalid={!!errors.licenseNumber}
            className={errors.licenseNumber ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Address */}
        <Field label="Hospital Address" required error={errors.address?.message} className="sm:col-span-2">
          <Input
            {...register("address")}
            placeholder="123, Hospital Road, Andheri East"
            aria-invalid={!!errors.address}
            className={errors.address ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* City */}
        <Field label="City" required error={errors.city?.message}>
          <Input
            {...register("city")}
            placeholder="Mumbai"
            aria-invalid={!!errors.city}
            className={errors.city ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* State */}
        <Field label="State" required error={errors.state?.message}>
          <Select
            onValueChange={(v) => setValue("state", v || "", { shouldValidate: true })}
            value={watch("state")}
          >
            <SelectTrigger
              className={`w-full ${errors.state ? "border-destructive ring-2 ring-destructive/20" : ""}`}
              aria-invalid={!!errors.state}
            >
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Pincode */}
        <Field label="Pincode" required error={errors.pincode?.message}>
          <Input
            {...register("pincode")}
            placeholder="400001"
            maxLength={6}
            aria-invalid={!!errors.pincode}
            className={errors.pincode ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Emergency Contact */}
        <Field label="Emergency Contact Number" required error={errors.emergencyContact?.message} hint="24/7 emergency helpline">
          <Input
            {...register("emergencyContact")}
            type="tel"
            placeholder="9999999999"
            maxLength={10}
            aria-invalid={!!errors.emergencyContact}
            className={errors.emergencyContact ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Opening Time */}
        <Field label="Opening Time" required error={errors.openingTime?.message}>
          <Input
            {...register("openingTime")}
            type="time"
            aria-invalid={!!errors.openingTime}
            className={errors.openingTime ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Closing Time */}
        <Field label="Closing Time" required error={errors.closingTime?.message}>
          <Input
            {...register("closingTime")}
            type="time"
            aria-invalid={!!errors.closingTime}
            className={errors.closingTime ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onPrev}
          className="gap-1"
          disabled={isSubmitting}
        >
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          Previous
        </Button>
        <Button
          type="submit"
          size="sm"
          className="gap-1.5 min-w-36"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <BuildingIcon className="h-3.5 w-3.5" />
              Register Hospital
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
