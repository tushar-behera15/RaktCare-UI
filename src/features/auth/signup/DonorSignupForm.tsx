/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2Icon, ChevronLeftIcon, ChevronRightIcon, HeartHandshakeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { StepIndicator } from "@/components/forms/StepIndicator";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { DatePickerField } from "@/components/forms/DatePickerField";
import { MultiSelectField } from "@/components/forms/MultiSelectField";
import { ImageUploadField } from "@/components/forms/ImageUploadField";
import axios from "axios"

import {
  donorStep1Schema,
  donorStep2Schema,
  type DonorStep1Data,
  type DonorStep2Data,
} from "@/features/auth/signup/types";
import {
  BLOOD_GROUPS,
  DISEASES_LIST,
  INDIAN_STATES,
  GENDER_OPTIONS,
} from "@/features/auth/signup/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

// ─── Steps config ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Personal Details", description: "Basic info" },
  { id: 2, label: "Medical Details", description: "Health info" },
];

// ─── Component ────────────────────────────────────────────────────────────

interface DonorSignupFormProps {
  onBack?: () => void;
}

export function DonorSignupForm({ onBack }: DonorSignupFormProps) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(1);
  const [direction, setDirection] = React.useState(1);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [pendingDonorData, setPendingDonorData] = React.useState<DonorStep2Data | null>(null);
  // Persist data across steps
  const [step1Data, setStep1Data] = React.useState<Partial<DonorStep1Data>>({});

  const form1 = useForm<DonorStep1Data>({
    resolver: zodResolver(donorStep1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      pincode: "",
      ...step1Data,
    } as Partial<DonorStep1Data>,
    mode: "onChange",
  });

  const form2 = useForm<DonorStep2Data>({
    resolver: zodResolver(donorStep2Schema),
    defaultValues: {
      weight: 0,
      hemoglobin: 0,
      diseases: [],
      availableForDonation: true,
      donationCount: 0,
    } as Partial<DonorStep2Data>,
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
      const donorData = {
        ...step2,
      }
      const signupData = {
        fullName: finalData.fullName,
        email: finalData.email,
        phone: finalData.phone,
        password: finalData.password,
        role: "donor",
        bloodGroup: finalData.bloodGroup,
        gender: finalData.gender,
        dateOfBirth: finalData.dateOfBirth,
        address: finalData.address,
        city: finalData.city,
        state: finalData.state,
        pincode: finalData.pincode,
        profileImage: finalData.profileImage,
        isVerified: false,
      };

      await axios.post("http://localhost:5000/auth/signup", signupData, {
        withCredentials: true,
      });
      setPendingDonorData(donorData);
      console.log("pendingDonorData", pendingDonorData);

      router.push(`/auth/verify-otp?email=${encodeURIComponent(finalData.email ?? "")}`);

      await axios.post("http://localhost:5000/donor/create-profile", donorData, {
        withCredentials: true,
      });

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  });

  const watchPassword = form1.watch("password");



  return (
    <div className="flex flex-col gap-6">
      {/* Stepper */}
      <StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} />
      <Separator />

      {/* Form Content */}
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
              <Step1Form
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
              <Step2Form
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

// ─── Step 1 ───────────────────────────────────────────────────────────────

interface Step1FormProps {
  form: ReturnType<typeof useForm<DonorStep1Data>>;
  watchPassword: string;
  onNext: () => void;
  onBack?: () => void;
}

function Step1Form({ form, watchPassword, onNext, onBack }: Step1FormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="flex flex-col gap-5">
      {/* Profile Image - centered */}
      <div className="flex justify-center">
        <Field label="Profile Photo" className="items-center">
          <ImageUploadField
            value={watch("profileImage")}
            onChange={(v) => setValue("profileImage", v, { shouldValidate: true })}
            size="lg"
          />
        </Field>
      </div>

      <Separator />

      {/* 2-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <Field label="Full Name" required error={errors.fullName?.message}>
          <Input
            {...register("fullName")}
            placeholder="Rajesh Kumar"
            aria-invalid={!!errors.fullName}
            className={errors.fullName ? "border-destructive ring-2 ring-destructive/20" : ""}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="rajesh@example.com"
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

        {/* Blood Group */}
        <Field label="Blood Group" required error={errors.bloodGroup?.message}>
          <Select
            onValueChange={(v) => setValue("bloodGroup", v as DonorStep1Data["bloodGroup"], { shouldValidate: true })}
            value={watch("bloodGroup")}
          >
            <SelectTrigger
              className={`w-full ${errors.bloodGroup ? "border-destructive ring-2 ring-destructive/20" : ""}`}
              aria-invalid={!!errors.bloodGroup}
            >
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((bg) => (
                <SelectItem key={bg} value={bg}>{bg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Gender */}
        <Field label="Gender" required error={errors.gender?.message}>
          <Select
            onValueChange={(v) => setValue("gender", v as DonorStep1Data["gender"], { shouldValidate: true })}
            value={watch("gender")}
          >
            <SelectTrigger
              className={`w-full ${errors.gender ? "border-destructive ring-2 ring-destructive/20" : ""}`}
              aria-invalid={!!errors.gender}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((g) => (
                <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Date of Birth */}
        <Field label="Date of Birth" required error={errors.dateOfBirth?.message}>
          <DatePickerField
            value={watch("dateOfBirth")}
            onChange={(d) => setValue("dateOfBirth", d as Date, { shouldValidate: true })}
            placeholder="Select date of birth"
            toDate={new Date()}
            fromDate={new Date("1900-01-01")}
            error={!!errors.dateOfBirth}
          />
        </Field>

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

        {/* Address - full width */}
        <Field label="Address" required error={errors.address?.message} className="sm:col-span-2">
          <Input
            {...register("address")}
            placeholder="Flat 12, Green Park Apartments, MG Road"
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
      </div>

      {/* Footer Buttons */}
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

// ─── Step 2 ───────────────────────────────────────────────────────────────

interface Step2FormProps {
  form: ReturnType<typeof useForm<DonorStep2Data>>;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function Step2Form({ form, onPrev, onSubmit, isSubmitting }: Step2FormProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weight */}
        <Field label="Weight (kg)" hint="Minimum 45 kg required to donate">
          <Input
            {...register("weight", {
              setValueAs: (v) => v === "" ? null : Number(v),
            })}
            type="number"
            placeholder="65"
            min={45}
            max={200}
            step={0.1}
          />
        </Field>

        {/* Hemoglobin */}
        <Field label="Hemoglobin (g/dL)" hint="Normal: 12.5 to 17.5 g/dL">
          <Input
            {...register("hemoglobin", {
              setValueAs: (v) => v === "" ? null : Number(v),
            })}
            type="number"
            placeholder="13.5"
            min={5}
            max={20}
            step={0.1}
          />
        </Field>

        {/* Last Donation Date */}
        <Field label="Last Donation Date" error={errors.lastDonationDate?.message} hint="Leave blank if you've never donated">
          <DatePickerField
            value={watch("lastDonationDate")}
            onChange={(d) => setValue("lastDonationDate", d, { shouldValidate: true })}
            placeholder="Select last donation date"
            toDate={new Date()}
            fromDate={new Date("2000-01-01")}
            error={!!errors.lastDonationDate}
          />
        </Field>

        {/* Donation Count */}
        <Field label="Total Donation Count" hint="Auto-set to 0 for new donors">
          <Input
            {...register("donationCount", { valueAsNumber: true })}
            type="number"
            value={0}
            readOnly
            className="bg-muted/50 cursor-not-allowed opacity-75 select-none"
            aria-readonly="true"
          />
        </Field>

        {/* Available for Donation - full row */}
        <div className="sm:col-span-2 flex items-center justify-between rounded-lg border border-border bg-card p-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground">Available for Donation</span>
            <span className="text-[11px] text-muted-foreground">
              Toggle off if you are currently unavailable to donate
            </span>
          </div>
          <Switch
            checked={watch("availableForDonation")}
            onCheckedChange={(v) => setValue("availableForDonation", v)}
            aria-label="Available for donation"
          />
        </div>

        {/* Diseases - full width */}
        <Field
          label="Medical Conditions / Diseases"
          error={errors.diseases?.message}
          hint="Select all that apply. Select 'None' if you have no medical conditions."
          className="sm:col-span-2"
        >
          <MultiSelectField
            options={DISEASES_LIST}
            value={watch("diseases") ?? []}
            onChange={(v) => setValue("diseases", v, { shouldValidate: true })}
            placeholder="Click to select your medical conditions"
          />
        </Field>
      </div>

      {/* Footer Buttons */}
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
              <HeartHandshakeIcon className="h-3.5 w-3.5" />
              Complete Registration
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
