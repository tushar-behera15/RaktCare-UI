"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiSelectFieldProps {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: boolean;
  maxItems?: number;
}

export function MultiSelectField({
  options,
  value,
  onChange,
  placeholder = "Select options",
  error,
  maxItems,
}: MultiSelectFieldProps) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else if (!maxItems || value.length < maxItems) {
      onChange([...value, option]);
    }
  };

  const remove = (option: string) => {
    onChange(value.filter((v) => v !== option));
  };

  return (
    <div className={cn("flex flex-col gap-2", error && "")}>
      {/* Selected Badges */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((item) => (
            <Badge key={item} variant="default" className="gap-1 pr-1 h-5 text-[10px]">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="h-3.5 w-3.5 ml-0.5 rounded-full hover:bg-primary-foreground/20 text-primary-foreground"
                onClick={() => remove(item)}
                aria-label={`Remove ${item}`}
              >
                <XIcon className="h-2.5 w-2.5" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Options grid */}
      <div
        className={cn(
          "flex flex-wrap gap-1.5 rounded-md border p-2 bg-input/10 dark:bg-input/20 transition-colors",
          error ? "border-destructive" : "border-border"
        )}
        role="group"
        aria-label={placeholder}
      >
        {value.length === 0 && (
          <p className="text-[11px] text-muted-foreground w-full py-0.5">{placeholder}</p>
        )}
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                isSelected
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-foreground hover:bg-muted hover:border-muted-foreground/50"
              )}
              aria-pressed={isSelected}
              aria-label={option}
            >
              {option}
            </button>
          );
        })}
      </div>

      {maxItems && (
        <p className="text-[10px] text-muted-foreground text-right">
          {value.length}/{maxItems} selected
        </p>
      )}
    </div>
  );
}
