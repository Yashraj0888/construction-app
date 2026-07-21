export type EnquiryType =
  | "cscs_card"
  | "citb_test"
  | "course_book"
  | "group_booking"
  | "nvq"
  | "health_safety_easy_apply"
  | "contact";

export type EnquiryStatus = "open" | "sale" | "pending" | "contact_us" | "disputed";

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
const PENDING_KEY = "cca_pending_enquiries";

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

function readPending(): Omit<EnquiryPayload, "id">[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePending(items: Omit<EnquiryPayload, "id">[]) {
  if (typeof window === "undefined") return;
  if (items.length === 0) {
    sessionStorage.removeItem(PENDING_KEY);
    return;
  }
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(items));
}

function queuePending(data: Omit<EnquiryPayload, "id">) {
  const items = readPending();
  items.push({
    ...data,
    source_path:
      data.source_path ??
      (typeof window !== "undefined" ? window.location.pathname : null),
  });
  writePending(items);
}

/** Retry any writes that failed earlier in this browser session. */
export async function flushPendingEnquiries(): Promise<void> {
  const items = readPending();
  if (items.length === 0) return;

  const remaining: Omit<EnquiryPayload, "id">[] = [];
  for (const item of items) {
    const result = await createEnquiry(item, { queueOnFail: false });
    if ("error" in result) remaining.push(item);
  }
  writePending(remaining);
}

/** Create a new enquiry row. Stores id in sessionStorage. */
export async function createEnquiry(
  data: Omit<EnquiryPayload, "id">,
  opts?: { queueOnFail?: boolean }
): Promise<{ id: string } | { error: string }> {
  const queueOnFail = opts?.queueOnFail !== false;
  const body = {
    ...data,
    source_path:
      data.source_path ??
      (typeof window !== "undefined" ? window.location.pathname : null),
  };

  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (queueOnFail) queuePending(body);
      return { error: json.error || "Failed to create enquiry" };
    }
    if (json.id) setStoredEnquiryId(json.id);
    return { id: json.id as string };
  } catch {
    if (queueOnFail) queuePending(body);
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
): Promise<{ id: string } | { error: string; notFound?: boolean }> {
  try {
    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        error: json.error || "Failed to update enquiry",
        notFound: res.status === 404,
      };
    }
    return { id: json.id as string };
  } catch {
    return { error: "Network error updating enquiry" };
  }
}

/**
 * Always persist to the DB.
 * - Create on first write (T&C accept)
 * - Update the same row as the user progresses
 * - If update fails for any reason → create a new row (never lose the lead)
 * - If create fails → queue in sessionStorage and retry on the next sync
 */
export async function syncEnquiry(
  data: Omit<EnquiryPayload, "id"> & { id?: string | null }
): Promise<{ id: string } | { error: string }> {
  // First drain anything that failed earlier
  await flushPendingEnquiries();

  const existingId = data.id || getStoredEnquiryId();
  if (existingId) {
    const { id: _ignored, ...rest } = data;
    const updated = await updateEnquiry(existingId, rest);
    if ("id" in updated) return updated;

    // Stale id, missing row, or network — clear and append a fresh row
    clearStoredEnquiryId();
    return createEnquiry(data);
  }

  return createEnquiry(data);
}
