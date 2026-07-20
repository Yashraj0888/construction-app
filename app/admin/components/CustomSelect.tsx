"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  tone?: { bg: string; color: string };
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  /** Pill-style trigger (for status badges) */
  variant?: "default" | "pill";
  minWidth?: number | string;
};

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select",
  ariaLabel,
  className = "",
  variant = "default",
  minWidth,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerStyle =
    variant === "pill" && selected?.tone
      ? {
          background: selected.tone.bg,
          color: selected.tone.color,
          borderColor: "transparent",
        }
      : undefined;

  return (
    <div
      className={`admin-select ${variant === "pill" ? "is-pill" : ""} ${open ? "is-open" : ""} ${className}`}
      ref={rootRef}
      style={minWidth ? { minWidth } : undefined}
    >
      <button
        type="button"
        className="admin-select-trigger"
        style={triggerStyle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel || placeholder}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="admin-select-label">{selected?.label || placeholder}</span>
        <ChevronDown size={16} className="admin-select-caret" />
      </button>

      {open && (
        <ul id={listId} className="admin-select-menu" role="listbox">
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={`admin-select-option ${active ? "is-active" : ""}`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span
                    className="admin-select-option-text"
                    style={
                      opt.tone
                        ? {
                            background: opt.tone.bg,
                            color: opt.tone.color,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 700,
                          }
                        : undefined
                    }
                  >
                    {opt.label}
                  </span>
                  {active && <Check size={15} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
