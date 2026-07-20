import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated, unauthorized } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const t0 = Date.now();
  if (!(await isAdminAuthenticated())) return unauthorized();
  const authMs = Date.now() - t0;

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const tDb = Date.now();
  const { data, error } = await supabase
    .from("enquiries")
    .select(
      "id, created_at, updated_at, enquiry_type, product, source_path, title, first_name, middle_name, last_name, email, phone, company_name, message, status, agreed_to_terms, payload"
    )
    .eq("id", id)
    .maybeSingle();
  const dbMs = Date.now() - tDb;

  if (error) {
    console.error("admin enquiry fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }

  const res = NextResponse.json({ enquiry: data });
  res.headers.set(
    "Server-Timing",
    `auth;dur=${authMs}, supabase;dur=${dbMs}, total;dur=${Date.now() - t0}`
  );
  if (process.env.NODE_ENV === "development") {
    console.log(`[admin/enquiries/${id.slice(0, 8)}] auth=${authMs}ms supabase=${dbMs}ms`);
  }
  return res;
}
