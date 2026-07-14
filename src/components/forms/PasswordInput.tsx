"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Very Weak", color: "bg-destructive" };
  if (score === 2) return { score, label: "Weak", color: "bg-orange-500" };
  if (score === 3) return { score, label: "Fair", color: "bg-yellow-500" };
  if (score === 4) return { score, label: "Strong", color: "bg-green-500" };
  return { score, label: "Very Strong", color: "bg-emerald-500" };
}

interface PasswordInputProps extends React.ComponentProps<"input"> {
  showStrength?: boolean;
  error?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength = false, error, className, value, onChange, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const [localValue, setLocalValue] = React.useState("");

    const currentValue = value !== undefined ? String(value) : localValue;
    const strength = showStrength ? getPasswordStrength(currentValue) : null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className="relative flex flex-col gap-1.5">
        <div className="relative">
          <Input
            ref={ref}
            type={show ? "text" : "password"}
            className={cn("pr-9", error && "border-destructive ring-destructive/20 ring-2", className)}
            value={value}
            onChange={handleChange}
            aria-invalid={error}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {show ? <EyeOffIcon className="h-3.5 w-3.5" /> : <EyeIcon className="h-3.5 w-3.5" />}
          </Button>
        </div>

        {showStrength && currentValue && strength && (
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-300",
                    i < strength.score ? strength.color : "bg-border"
                  )}
                />
              ))}
            </div>
            <p
              className={cn(
                "text-[10px] font-medium",
                strength.score <= 1
                  ? "text-destructive"
                  : strength.score === 2
                    ? "text-orange-500"
                    : strength.score === 3
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-green-600 dark:text-green-400"
              )}
            >
              {strength.label}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
