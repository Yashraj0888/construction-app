export type EnquiryType =
  | "cscs_card"
  | "citb_test"
  | "course_book"
  | "group_booking"
  | "nvq"
  | "health_safety_easy_apply"
  | "contact";

export type EnquiryStatus = "new" | "in_progress" | "contacted" | "booked" | "closed";

export interface EnquiryPayload {
  id?: string;
  enquiry_type: EnquiryType;
  product?: string | null;
  source_path?: string | null;
  title?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  company_name?: string | null;
  message?: string | null;
  status?: EnquiryStatus;
  agreed_to_terms?: boolean;
  payload?: Record<string, unknown>;
}

const ENQUIRY_ID_KEY = "cca_enquiry_id";

export function getStoredEnquiryId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ENQUIRY_ID_KEY);
}

export function setStoredEnquiryId(id: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ENQUIRY_ID_KEY, id);
}

export function clearStoredEnquiryId() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ENQUIRY_ID_KEY);
}

/** Create a new enquiry row. Stores id in sessionStorage. */
export async function createEnquiry(
  data: Omit<EnquiryPayload, "id">
): Promise<{ id: string } | { error: string }> {
  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        source_path: data.source_path ?? (typeof window !== "undefined" ? window.location.pathname : null),
      }),
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || "Failed to create enquiry" };
    if (json.id) setStoredEnquiryId(json.id);
    return { id: json.id as string };
  } catch {
    return { error: "Network error creating enquiry" };
  }
}

/** Update an existing enquiry by id. */
export async function updateEnquiry(
  id: string,
  data: Partial<Omit<EnquiryPayload, "id" | "enquiry_type">> & {
    enquiry_type?: EnquiryType;
    payload?: Record<string, unknown>;
  }
): Promise<{ id: string } | { error: string }> {
  try {
    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || "Failed to update enquiry" };
    return { id: json.id as string };
  } catch {
    return { error: "Network error updating enquiry" };
  }
}

/**
 * Create if no stored id, otherwise update the same row.
 * Use this on T&C check and as the user progresses through a form.
 */
export async function syncEnquiry(
  data: Omit<EnquiryPayload, "id"> & { id?: string | null }
): Promise<{ id: string } | { error: string }> {
  const existingId = data.id || getStoredEnquiryId();
  if (existingId) {
    const { id: _ignored, ...rest } = data;
    return updateEnquiry(existingId, rest);
  }
  return createEnquiry(data);
}
