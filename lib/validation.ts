/** Shared contact-field validation for UK-focused bookings */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

/** UK postcode (allows optional space), e.g. SW1A 1AA, M1 1AE, B33 8TH */
const UK_POSTCODE_RE =
  /^(GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i;

export function normalizePostcode(value: string): string {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  if (compact.length < 5) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Accepts UK numbers (+44 / 07...) and common international digits.
 * Strips spaces, dashes, brackets.
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return /^\+\d{8,15}$/.test(digits);
  }
  const only = digits.replace(/\D/g, "");
  // UK mobile/landline without country code: 10–11 digits, often starting 0
  if (/^0\d{9,10}$/.test(only)) return true;
  // bare international without +
  if (/^\d{8,15}$/.test(only)) return true;
  return false;
}

export function isValidUkPostcode(value: string): boolean {
  return UK_POSTCODE_RE.test(value.trim());
}

export function emailError(value: string): string | null {
  if (!value.trim()) return "Email address is required.";
  if (!isValidEmail(value)) return "Enter a valid email address (e.g. name@domain.com).";
  return null;
}

export function phoneError(value: string): string | null {
  if (!value.trim()) return "Phone number is required.";
  if (!isValidPhone(value)) {
    return "Enter a valid phone number (e.g. 07123456789 or +447123456789).";
  }
  return null;
}

export function postcodeError(value: string, required = true): string | null {
  if (!value.trim()) return required ? "Postcode is required." : null;
  if (!isValidUkPostcode(value)) {
    return "Enter a valid UK postcode (e.g. SW1A 1AA).";
  }
  return null;
}
