import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { controlClass } from "./control";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(controlClass, "h-9", className)} />;
}
