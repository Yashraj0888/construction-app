import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated, unauthorized } from "@/lib/admin-auth";

/** List columns only — skip heavy `payload` (loaded on detail page). */
const LIST_COLUMNS =
  "id, created_at, updated_at, enquiry_type, product, source_path, title, first_name, middle_name, last_name, email, phone, company_name, message, status, agreed_to_terms";

export async function GET(req: NextRequest) {
  const t0 = Date.now();
  if (!(await isAdminAuthenticated())) return unauthorized();
  const authMs = Date.now() - t0;

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.trim();

  const supabase = createAdminClient();
  let query = supabase
    .from("enquiries")
    .select(LIST_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(200);

  if (type && type !== "all") query = query.eq("enquiry_type", type);
  if (status && status !== "all") query = query.eq("status", status);
  if (q) {
    query = query.or(
      `email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%,phone.ilike.%${q}%,product.ilike.%${q}%`
    );
  }

  const tDb = Date.now();
  const { data, error } = await query;
  const dbMs = Date.now() - tDb;

  if (error) {
    console.error("admin enquiries list error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const res = NextResponse.json({ enquiries: data ?? [] });
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
  status: z.enum(["new", "in_progress", "contacted", "booked", "closed"]),
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
