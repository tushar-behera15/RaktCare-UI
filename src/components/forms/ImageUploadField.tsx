"use client";

import * as React from "react";
import { UploadIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (base64: string | undefined) => void;
  error?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "h-14 w-14", icon: "h-5 w-5", text: false },
  md: { container: "h-20 w-20", icon: "h-7 w-7", text: false },
  lg: { container: "h-24 w-24", icon: "h-8 w-8", text: true },
};

export function ImageUploadField({
  value,
  onChange,
  error,
  size = "lg",
}: ImageUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const { container, icon } = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar Circle */}
      <div
        className={cn(
          "relative rounded-full border-2 transition-all duration-200 cursor-pointer overflow-hidden group",
          container,
          isDragging
            ? "border-primary border-dashed bg-primary/10 scale-105"
            : value
              ? "border-primary"
              : "border-dashed border-border hover:border-primary hover:bg-primary/5",
          error && !value && "border-destructive hover:border-destructive"
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload profile image"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <UploadIcon className="h-5 w-5 text-white" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground group-hover:text-primary transition-colors">
            <UserIcon className={cn(icon)} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={() => inputRef.current?.click()}
        >
          <UploadIcon className="h-3.5 w-3.5" />
          {value ? "Change" : "Upload Photo"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive h-6 w-6"
            onClick={() => { onChange(undefined); if (inputRef.current) inputRef.current.value = ""; }}
            aria-label="Remove photo"
          >
            <XIcon className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground text-center">
        JPG, PNG or WebP · Max 5MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
        aria-hidden="true"
      />
    </div>
  );
}
