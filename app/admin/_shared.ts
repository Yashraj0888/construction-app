export type Enquiry = {
  id: string;
  created_at: string;
  updated_at: string;
  enquiry_type: string;
  product: string | null;
  source_path: string | null;
  title: string | null;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  message: string | null;
  status: string;
  agreed_to_terms: boolean;
  payload?: Record<string, unknown> | null;
};

export type InfoRow = { label: string; value: string };

export const TYPE_LABELS: Record<string, string> = {
  cscs_card: "CSCS Card",
  citb_test: "CITB Test",
  course_book: "Health & Safety Course",
  group_booking: "Group Booking",
  nvq: "NVQ Level 2",
  health_safety_easy_apply: "Health & Safety (Easy Apply)",
  contact: "Contact",
};

/** Pipeline tags shown as dashboard filter tiles */
export const STATUS_OPTIONS = [
  "open",
  "sale",
  "pending",
  "contact_us",
  "disputed",
] as const;

export type PipelineStatus = (typeof STATUS_OPTIONS)[number];

export const STATUS_TILES: Array<{
  key: PipelineStatus;
  label: string;
  hint: string;
  /** Backend writes this status today */
  live: boolean;
}> = [
  {
    key: "open",
    label: "Open",
    hint: "New website applications",
    live: true,
  },
  {
    key: "sale",
    label: "Sale",
    hint: "Payment — coming soon",
    live: false,
  },
  {
    key: "pending",
    label: "Pending",
    hint: "Payment — coming soon",
    live: false,
  },
  {
    key: "contact_us",
    label: "Contact us",
    hint: "Contact form messages",
    live: true,
  },
  {
    key: "disputed",
    label: "Disputed & failed",
    hint: "Payment — coming soon",
    live: false,
  },
];

const LABEL_MAP: Record<string, string> = {
  title: "Title",
  firstName: "First name",
  first_name: "First name",
  middleName: "Middle name",
  middle_name: "Middle name",
  lastName: "Last name",
  last_name: "Last name",
  email: "Email",
  emailAddress: "Email",
  phone: "Phone",
  phoneNumber: "Phone",
  phonePrefix: "Phone country code",
  niNumber: "National Insurance number",
  companyName: "Company",
  company_name: "Company",
  message: "Message",
  occupation: "Occupation",
  cardType: "Card type",
  cardName: "Card name",
  applicationType: "Application type",
  addressLine1: "Address line 1",
  locality: "Locality / area",
  city: "Town / city",
  county: "County",
  postcode: "Postcode",
  citbId: "CITB ID",
  dobDay: "Date of birth (day)",
  dobMonth: "Date of birth (month)",
  dobYear: "Date of birth (year)",
  testType: "Test type",
  preferredLanguage: "Preferred language",
  testCentrePostcode: "Test centre postcode",
  testCentreCity: "Test centre",
  preferredDate: "Preferred date",
  alternateDate: "Alternate date",
  preferredTime: "Preferred time",
  optInRetake: "Opted in for retake",
  deliveryMode: "Course delivery",
  courseLocation: "Course location",
  agreedToTerms: "Agreed to terms",
  subject: "Subject",
  formKey: "Enquiry form",
  trigger: "Last action",
  step: "Form step",
};

const HIDDEN_KEYS = new Set(["agreedToTerms", "trigger", "step", "staff_notes"]);

/**
 * Map DB row → pipeline tile.
 * Legacy statuses (new / in_progress / …) count as Open.
 * Contact-form rows count as Contact us.
 */
export function normalizePipelineStatus(
  status: string,
  enquiryType?: string | null
): PipelineStatus {
  if (status === "sale" || status === "pending" || status === "disputed" || status === "contact_us") {
    return status;
  }
  if (status === "open") return "open";
  if (enquiryType === "contact") return "contact_us";
  // legacy: new, in_progress, contacted, booked, closed → open
  return "open";
}

function humanLabel(key: string): string {
  if (LABEL_MAP[key]) return LABEL_MAP[key];
  const leaf = key.includes(".") ? key.split(".").pop()! : key;
  if (LABEL_MAP[leaf]) return LABEL_MAP[leaf];
  return leaf
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function prettyValue(key: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (key === "deliveryMode") {
    if (value === "centre") return "At a course centre";
    if (value === "online") return "Online";
  }
  if (key === "applicationType") {
    const map: Record<string, string> = {
      new: "New card",
      renew: "Renewal",
      lost: "Lost / replacement",
    };
    return map[String(value)] || String(value);
  }
  if (key === "trigger") {
    const map: Record<string, string> = {
      easy_apply: "Clicked Easy Apply",
      terms_accepted: "Accepted terms",
      step_advance: "Moved to next step",
      form_submitted: "Submitted form",
    };
    return map[String(value)] || String(value);
  }
  if (key === "formKey") {
    if (value === "enrollment") return "NVQ enrolment";
    if (value === "nvq") return "NVQ Level 2";
  }
  if (key === "step" && typeof value === "number") return `Step ${value}`;
  return String(value);
}

export function fullName(row: Enquiry) {
  return [row.title, row.first_name, row.middle_name, row.last_name].filter(Boolean).join(" ") || "Unknown";
}

export function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function statusMeta(status: string, enquiryType?: string | null) {
  const pipeline = normalizePipelineStatus(status, enquiryType);
  switch (pipeline) {
    case "open":
      return { bg: "#e8eef8", color: "#1e3a5f", label: "Open", accent: "#1e3a5f" };
    case "sale":
      return { bg: "#a8d4b4", color: "#14351e", label: "Sale", accent: "#2f6b42" };
    case "pending":
      return { bg: "#f3e6dc", color: "#8a3d14", label: "Pending", accent: "#c45c26" };
    case "contact_us":
      return { bg: "#eceaf3", color: "#3d3560", label: "Contact us", accent: "#3d3560" };
    case "disputed":
      return { bg: "#f5e4e2", color: "#8a1f1b", label: "Disputed & failed", accent: "#8a1f1b" };
    default:
      return { bg: "#eee", color: "#5c6573", label: status, accent: "#5c6573" };
  }
}

export function buildReadableRows(row: Enquiry): {
  contact: InfoRow[];
  booking: InfoRow[];
  extra: InfoRow[];
} {
  const contact: InfoRow[] = [
    { label: "Full name", value: fullName(row) },
    { label: "Email", value: row.email || "—" },
    { label: "Phone", value: row.phone || "—" },
    { label: "Company", value: row.company_name || "—" },
  ];

  const booking: InfoRow[] = [
    { label: "Enquiry type", value: TYPE_LABELS[row.enquiry_type] || row.enquiry_type },
    { label: "Product / what they want", value: row.product || "—" },
    { label: "Page they came from", value: row.source_path || "—" },
    { label: "Agreed to terms", value: row.agreed_to_terms ? "Yes" : "No" },
    { label: "Submitted", value: formatWhen(row.created_at) },
    { label: "Last updated", value: formatWhen(row.updated_at) },
  ];

  if (row.message) {
    contact.push({ label: "Message", value: row.message });
  }

  const extra: InfoRow[] = [];
  const payload = row.payload || {};

  const form = (payload.form && typeof payload.form === "object" ? payload.form : null) as Record<
    string,
    unknown
  > | null;
  const address = (payload.address && typeof payload.address === "object"
    ? payload.address
    : null) as Record<string, unknown> | null;
  const testDetails = (payload.testDetails && typeof payload.testDetails === "object"
    ? payload.testDetails
    : null) as Record<string, unknown> | null;

  const pushObject = (obj: Record<string, unknown> | null, skipKeys: string[] = []) => {
    if (!obj) return;
    if (obj.dobDay || obj.dobMonth || obj.dobYear) {
      const dob = [obj.dobDay, obj.dobMonth, obj.dobYear].filter(Boolean).join("/");
      if (dob) extra.push({ label: "Date of birth", value: dob });
    }
    for (const [key, value] of Object.entries(obj)) {
      if (skipKeys.includes(key) || HIDDEN_KEYS.has(key)) continue;
      if (
        [
          "dobDay",
          "dobMonth",
          "dobYear",
          "firstName",
          "lastName",
          "middleName",
          "title",
          "emailAddress",
          "phoneNumber",
          "email",
          "phone",
        ].includes(key)
      ) {
        continue;
      }
      if (value && typeof value === "object" && !Array.isArray(value)) continue;
      extra.push({ label: humanLabel(key), value: prettyValue(key, value) });
    }
  };

  pushObject(form, [
    "firstName",
    "lastName",
    "middleName",
    "title",
    "emailAddress",
    "phoneNumber",
    "dobDay",
    "dobMonth",
    "dobYear",
    "agreedToTerms",
  ]);

  if (address) {
    const addressLine = [
      address.addressLine1,
      address.locality,
      address.city,
      address.county,
      address.postcode,
    ]
      .map((v) => (typeof v === "string" ? v.trim() : ""))
      .filter(Boolean)
      .join(", ");
    if (addressLine) extra.push({ label: "Address", value: addressLine });
    if (typeof address.citbId === "string" && address.citbId.trim()) {
      extra.push({ label: "CITB ID", value: address.citbId.trim() });
    }
  }

  pushObject(testDetails);

  for (const [key, value] of Object.entries(payload)) {
    if (["form", "address", "testDetails"].includes(key)) continue;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (v && typeof v === "object") continue;
        extra.push({ label: humanLabel(k), value: prettyValue(k, v) });
      }
      continue;
    }
    if (HIDDEN_KEYS.has(key)) continue;
    extra.push({ label: humanLabel(key), value: prettyValue(key, value) });
  }

  const seen = new Set<string>();
  const dedupe = (list: InfoRow[]) =>
    list.filter((item) => {
      const k = `${item.label}::${item.value}`;
      if (seen.has(k) || item.value === "—") return false;
      seen.add(k);
      return true;
    });

  return {
    contact: dedupe(contact),
    booking: dedupe(booking),
    extra: dedupe(extra),
  };
}
