"use client";

import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatISODate(date: Date | null): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  hasError?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  showIcon?: boolean;
}

export default function DatePickerField({
  value,
  onChange,
  placeholder = "Select a date",
  minDate,
  maxDate,
  hasError = false,
  disabled = false,
  id,
  className = "",
  showIcon = true,
}: DatePickerFieldProps) {
  return (
    <div className={`app-datepicker-wrap ${hasError ? "has-error" : ""} ${className}`}>
      <style>{`
        .app-datepicker-wrap {
          position: relative;
          width: 100%;
        }
        .app-datepicker-wrap .react-datepicker-wrapper {
          width: 100%;
          display: block;
        }
        .app-datepicker-wrap .react-datepicker__input-container {
          width: 100%;
          display: block;
        }
        .app-datepicker-wrap .app-datepicker-input {
          width: 100%;
          height: 48px;
          padding: 12px 16px;
          padding-left: ${showIcon ? "44px" : "16px"};
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          color: #0f172a;
          background-color: #ffffff;
          transition: all 0.2s ease;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .app-datepicker-wrap .app-datepicker-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .app-datepicker-wrap .app-datepicker-input:disabled {
          background: #f8fafc;
          color: #94a3b8;
          cursor: not-allowed;
        }
        .app-datepicker-wrap.has-error .app-datepicker-input {
          border-color: #ef4444 !important;
        }
        .app-datepicker-wrap.has-error .app-datepicker-input:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        .app-datepicker-wrap .app-datepicker-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
          z-index: 1;
          display: flex;
          align-items: center;
        }
        .react-datepicker-popper {
          z-index: 60 !important;
        }
        .react-datepicker {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
          overflow: hidden;
        }
        .react-datepicker__header {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding-top: 12px;
        }
        .react-datepicker__current-month,
        .react-datepicker-time__header,
        .react-datepicker-year-header {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          color: #0f172a;
          font-size: 14px;
        }
        .react-datepicker__day-name {
          color: #64748b;
          font-weight: 600;
          font-size: 12px;
        }
        .react-datepicker__day {
          border-radius: 8px;
          color: #334155;
          font-weight: 500;
        }
        .react-datepicker__day:hover {
          background: #eff6ff;
          border-radius: 8px;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background: #2563eb !important;
          color: #ffffff !important;
          border-radius: 8px;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          font-weight: 800;
          color: #2563eb;
        }
        .react-datepicker__day--disabled {
          color: #cbd5e1 !important;
        }
        .react-datepicker__navigation-icon::before {
          border-color: #64748b;
        }
        .react-datepicker__triangle {
          display: none;
        }
      `}</style>

      {showIcon && (
        <span className="app-datepicker-icon" aria-hidden="true">
          <Calendar className="w-5 h-5" />
        </span>
      )}

      <DatePicker
        id={id}
        selected={parseISODate(value)}
        onChange={(date: Date | null) => onChange(formatISODate(date))}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarStartDay={1}
        className="app-datepicker-input"
        autoComplete="off"
      />
    </div>
  );
}
