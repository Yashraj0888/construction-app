import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidUkPostcode, normalizePostcode } from "@/lib/validation";
import { clientIp, rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const enquirySchema = z.object({
  id: z.string().uuid().optional(),
  enquiry_type: z.string().min(1),
  product: z.string().nullable().optional(),
  source_path: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  company_name: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  status: z.string().optional(),
  agreed_to_terms: z.boolean().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

function sanitizePayload(
  payload: Record<string, unknown> | undefined
): { ok: true; payload: Record<string, unknown> } | { ok: false; error: string } {
  if (!payload) return { ok: true, payload: {} };
  const next = { ...payload };

  const cleanPostcode = (obj: unknown): Record<string, unknown> | string | null => {
    if (!obj || typeof obj !== "object") return null;
    const record = { ...(obj as Record<string, unknown>) };
    if (typeof record.postcode === "string" && record.postcode.trim()) {
      if (!isValidUkPostcode(record.postcode)) {
        return "Enter a valid UK postcode";
      }
      record.postcode = normalizePostcode(record.postcode);
    }
    return record;
  };

  if (next.address) {
    const cleaned = cleanPostcode(next.address);
    if (typeof cleaned === "string") return { ok: false, error: cleaned };
    if (cleaned) next.address = cleaned;
  }
  if (next.form) {
    const cleaned = cleanPostcode(next.form);
    if (typeof cleaned === "string") return { ok: false, error: cleaned };
    if (cleaned) next.form = cleaned;
  }

  return { ok: true, payload: next };
}

function pickRow(data: z.infer<typeof enquirySchema>, payload: Record<string, unknown>) {
  return {
    enquiry_type: data.enquiry_type,
    product: data.product ?? null,
    source_path: data.source_path ?? null,
    title: data.title ?? null,
    first_name: data.first_name ?? null,
    middle_name: data.middle_name ?? null,
    last_name: data.last_name ?? null,
    email: data.email ?? null,
    phone: data.phone ?? null,
    company_name: data.company_name ?? null,
    message: data.message ?? null,
    status: data.status ?? "open",
    agreed_to_terms: data.agreed_to_terms ?? false,
    payload,
    updated_at: new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = rateLimit({
    key: `enquiries:${ip}`,
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (!limited.ok) return rateLimitedResponse(limited.retryAfterSec);

  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

    const sanitized = sanitizePayload(parsed.data.payload);
    if (!sanitized.ok) {
      return NextResponse.json({ error: sanitized.error }, { status: 400 });
    }

    const supabase = createAdminClient();
    const row = {
      ...pickRow(parsed.data, sanitized.payload),
      user_agent: req.headers.get("user-agent"),
    };

    const { data, error } = await supabase
      .from("enquiries")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("enquiries insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("enquiries POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const ip = clientIp(req);
  const limited = rateLimit({
    key: `enquiries-patch:${ip}`,
    limit: 60,
    windowMs: 60 * 60 * 1000,
  });
  if (!limited.ok) return rateLimitedResponse(limited.retryAfterSec);

  try {
    const body = await req.json();
    const parsed = enquirySchema.extend({ id: z.string().uuid() }).safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }

    const { id, ...rest } = parsed.data;
    const supabase = createAdminClient();

    // Merge payload if provided so we don't wipe previous fields
    let nextPayload = rest.payload;
    if (rest.payload) {
      const { data: existing, error: existingError } = await supabase
        .from("enquiries")
        .select("payload")
        .eq("id", id)
        .maybeSingle();

      if (existingError) {
        console.error("enquiries lookup error:", existingError);
        return NextResponse.json({ error: existingError.message }, { status: 500 });
      }
      if (!existing) {
        return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
      }

      const merged = {
        ...((existing.payload as Record<string, unknown>) || {}),
        ...rest.payload,
      };
      const sanitized = sanitizePayload(merged);
      if (!sanitized.ok) {
        return NextResponse.json({ error: sanitized.error }, { status: 400 });
      }
      nextPayload = sanitized.payload;
    }

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (rest.enquiry_type !== undefined) updates.enquiry_type = rest.enquiry_type;
    if (rest.product !== undefined) updates.product = rest.product;
    if (rest.source_path !== undefined) updates.source_path = rest.source_path;
    if (rest.title !== undefined) updates.title = rest.title;
    if (rest.first_name !== undefined) updates.first_name = rest.first_name;
    if (rest.middle_name !== undefined) updates.middle_name = rest.middle_name;
    if (rest.last_name !== undefined) updates.last_name = rest.last_name;
    if (rest.email !== undefined) updates.email = rest.email;
    if (rest.phone !== undefined) updates.phone = rest.phone;
    if (rest.company_name !== undefined) updates.company_name = rest.company_name;
    if (rest.message !== undefined) updates.message = rest.message;
    if (rest.status !== undefined) updates.status = rest.status;
    if (rest.agreed_to_terms !== undefined) updates.agreed_to_terms = rest.agreed_to_terms;
    if (nextPayload !== undefined) updates.payload = nextPayload;

    const { data, error } = await supabase
      .from("enquiries")
      .update(updates)
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("enquiries update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("enquiries PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
