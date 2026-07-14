"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full px-2">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <motion.div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                )}
                animate={
                  isActive
                    ? { scale: [1, 1.08, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
                    : { scale: 1 }
                }
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <span>{step.id}</span>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.6 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>

              {/* Labels */}
              <div className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    "text-[11px] font-medium leading-tight whitespace-nowrap transition-colors",
                    isActive
                      ? "text-primary"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-muted-foreground hidden sm:block">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div className="relative flex-1 mx-3 mb-5">
                <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
