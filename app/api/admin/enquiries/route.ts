import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated, unauthorized } from "@/lib/admin-auth";

/** List columns only — skip heavy `payload` (loaded on detail page). */
const LIST_COLUMNS =
  "id, created_at, updated_at, enquiry_type, product, source_path, title, first_name, middle_name, last_name, email, phone, company_name, message, status, agreed_to_terms";

type PipelineStatus = "open" | "sale" | "pending" | "contact_us" | "disputed";

function normalizePipelineStatus(status: string, enquiryType: string | null): PipelineStatus {
  if (status === "sale" || status === "pending" || status === "disputed" || status === "contact_us") {
    return status;
  }
  if (status === "open") return "open";
  if (enquiryType === "contact") return "contact_us";
  return "open";
}

function emptyCounts(): Record<PipelineStatus, number> {
  return { open: 0, sale: 0, pending: 0, contact_us: 0, disputed: 0 };
}

export async function GET(req: NextRequest) {
  const t0 = Date.now();
  if (!(await isAdminAuthenticated())) return unauthorized();
  const authMs = Date.now() - t0;

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status") || "open";
  const q = searchParams.get("q")?.trim();

  const supabase = createAdminClient();

  const tDb = Date.now();

  // Counts across all leads (light query)
  const { data: countRows, error: countError } = await supabase
    .from("enquiries")
    .select("status, enquiry_type")
    .limit(2000);

  if (countError) {
    console.error("admin enquiries count error:", countError);
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const counts = emptyCounts();
  for (const row of countRows || []) {
    const key = normalizePipelineStatus(row.status, row.enquiry_type);
    counts[key] += 1;
  }

  let query = supabase
    .from("enquiries")
    .select(LIST_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(200);

  if (type && type !== "all") query = query.eq("enquiry_type", type);

  // Pipeline tile filters (legacy statuses mapped into open / contact_us)
  if (status === "open") {
    query = query
      .neq("enquiry_type", "contact")
      .not("status", "in", "(sale,pending,disputed,contact_us)");
  } else if (status === "contact_us") {
    query = query.or("status.eq.contact_us,enquiry_type.eq.contact");
  } else if (status === "sale" || status === "pending" || status === "disputed") {
    query = query.eq("status", status);
  }

  if (q) {
    query = query.or(
      `email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%,phone.ilike.%${q}%,product.ilike.%${q}%`
    );
  }

  const { data, error } = await query;
  const dbMs = Date.now() - tDb;

  if (error) {
    console.error("admin enquiries list error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const res = NextResponse.json({ enquiries: data ?? [], counts });
  res.headers.set(
    "Server-Timing",
    `auth;dur=${authMs}, supabase;dur=${dbMs}, total;dur=${Date.now() - t0}`
  );
  if (process.env.NODE_ENV === "development") {
    console.log(`[admin/enquiries] auth=${authMs}ms supabase=${dbMs}ms rows=${data?.length ?? 0}`);
  }
  return res;
}

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["open", "sale", "pending", "contact_us", "disputed"]),
});

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = await req.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("enquiries")
    .update({
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.id)
    .select("id, status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
