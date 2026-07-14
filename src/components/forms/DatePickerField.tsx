"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  fromDate?: Date;
  toDate?: Date;
  captionLayout?: "label" | "dropdown";
}

export function DatePickerField({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  error,
  fromDate,
  toDate,
  captionLayout = "dropdown",
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex w-full h-7 items-center justify-start gap-2 rounded-md border bg-input/20 dark:bg-input/30 px-2 py-1.5 text-xs/relaxed whitespace-nowrap transition-colors outline-none",
          !value ? "text-muted-foreground" : "text-foreground",
          error
            ? "border-destructive ring-2 ring-destructive/20"
            : "border-input hover:bg-input/50"
        )}
        aria-invalid={error}
        aria-label={placeholder}
      >
        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        {value ? format(value, "PPP") : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          captionLayout={captionLayout}
          startMonth={fromDate}
          endMonth={toDate}
          disabled={[
            ...(fromDate ? [{ before: fromDate }] : []),
            ...(toDate ? [{ after: toDate }] : [])
          ]}
          defaultMonth={value ?? new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
