import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { controlClass } from "./control";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(controlClass, "py-2 leading-[1.6]", className)} />;
}
