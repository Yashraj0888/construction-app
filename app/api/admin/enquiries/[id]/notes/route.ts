import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated, unauthorized } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

const createSchema = z.object({
  html: z.string().min(1, "Note cannot be empty"),
});

/** List all notes for an enquiry (newest first). */
export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id: enquiryId } = await params;
  if (!enquiryId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("enquiry_notes")
    .select("id, enquiry_id, html, created_at, updated_at")
    .eq("enquiry_id", enquiryId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("enquiry_notes list error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notes: data ?? [] });
}

/** Insert a new note row for this enquiry. */
export async function POST(req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id: enquiryId } = await params;
  if (!enquiryId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid note" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // Ensure enquiry exists
  const { data: enquiry, error: enquiryError } = await supabase
    .from("enquiries")
    .select("id")
    .eq("id", enquiryId)
    .maybeSingle();

  if (enquiryError) {
    return NextResponse.json({ error: enquiryError.message }, { status: 500 });
  }
  if (!enquiry) {
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("enquiry_notes")
    .insert({
      enquiry_id: enquiryId,
      html: parsed.data.html,
      created_at: now,
      updated_at: now,
    })
    .select("id, enquiry_id, html, created_at, updated_at")
    .single();

  if (error) {
    console.error("enquiry_notes insert error:", error);
    return NextResponse.json(
      {
        error:
          error.message.includes("enquiry_notes") || error.code === "42P01"
            ? "Notes table missing. Run supabase/enquiry_notes.sql in Supabase."
            : error.message,
      },
      { status: 500 }
    );
  }

  // Touch parent updated_at
  await supabase
    .from("enquiries")
    .update({ updated_at: now })
    .eq("id", enquiryId);

  return NextResponse.json({ note: data });
}
