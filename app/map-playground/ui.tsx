"use client";

import { Check, Copy, Plus, X } from "lucide-react";
import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/providers/ToastProvider";
import { pointColor } from "./colors";
import { formatPoint, parsePoint } from "./request";
import type { LatLng } from "./types";

export function Field({
  label,
  hint,
  action,
  children,
}: {
  label: string;
  hint?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        {action}
      </div>
      {children}
      {hint && <p className="text-[13px] text-subtle">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex w-full rounded-full bg-raised p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-power3-out outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            value === option.value
              ? "bg-ink text-ink-foreground"
              : "text-soft hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3">
      <span className="flex flex-col">
        <span className="text-[14px] text-foreground">{label}</span>
        {hint && <span className="text-[13px] text-subtle">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ease-power3-out outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          checked ? "bg-ink" : "bg-line-strong"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-4 rounded-full bg-card transition-transform duration-150 ease-power3-out",
            checked && "translate-x-4"
          )}
        />
      </button>
    </label>
  );
}

export function TextButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex items-center gap-1 rounded-full text-[13px] text-soft outline-none transition-colors duration-150 ease-power3-out hover:text-foreground focus-visible:underline disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    />
  );
}

export function CoordinateInput({
  value,
  onChange,
  placeholder = "9.0360, 38.7524",
  "aria-label": ariaLabel,
}: {
  value: LatLng | null;
  onChange: (point: LatLng | null) => void;
  placeholder?: string;
  "aria-label"?: string;
}) {
  const [text, setText] = useState(formatPoint(value));
  const invalid = text.trim() !== "" && parsePoint(text) === null;

  useEffect(() => {
    const typed = parsePoint(text);
    if (typed?.lat !== value?.lat || typed?.lng !== value?.lng) setText(formatPoint(value));
    // Only follow changes made outside this field, such as a click on the map.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      value={text}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-invalid={invalid}
      inputMode="decimal"
      className="font-mono text-[13px]"
      onChange={(event) => {
        const next = event.target.value;
        setText(next);
        if (next.trim() === "") onChange(null);
        else {
          const point = parsePoint(next);
          if (point) onChange(point);
        }
      }}
    />
  );
}

export function PointList({
  points,
  onChange,
  max,
}: {
  points: LatLng[];
  onChange: (points: LatLng[]) => void;
  max: number;
}) {
  const [draft, setDraft] = useState("");
  const parsed = parsePoint(draft);
  const full = points.length >= max;

  const add = () => {
    if (!parsed || full) return;
    onChange([...points, parsed]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-2">
      {points.length > 0 && (
        <ol className="overflow-hidden rounded-lg border border-border bg-card">
          {points.map((point, index) => (
            <li
              key={index}
              className="flex items-center gap-3 border-b border-border px-3 py-2 last:border-b-0"
            >
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: pointColor(index) }}
              />
              <span className="flex-1 truncate font-mono text-[13px] text-foreground">
                {formatPoint(point)}
              </span>
              <button
                type="button"
                aria-label={`Remove point ${index + 1}`}
                onClick={() => onChange(points.filter((_, i) => i !== index))}
                className="rounded-full p-1 text-subtle transition-colors duration-150 ease-power3-out hover:bg-hover hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ol>
      )}
      {!full && (
        <div className="flex gap-2">
          <Input
            value={draft}
            placeholder="9.0360, 38.7524"
            aria-label="New point"
            inputMode="decimal"
            className="font-mono text-[13px]"
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                add();
              }
            }}
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={add}
            disabled={!parsed}
            aria-label="Add point"
          >
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  return (
    <TextButton
      aria-label={label}
      onClick={() => {
        navigator.clipboard.writeText(text).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          },
          () => addToast("Couldn't copy to the clipboard.", "error")
        );
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : label}
    </TextButton>
  );
}

export function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <pre
      className={cn(
        "max-h-80 overflow-auto rounded-lg border border-border bg-raised p-3 font-mono text-[12px] leading-[1.6] break-all whitespace-pre-wrap text-foreground",
        className
      )}
    >
      {children}
    </pre>
  );
}
