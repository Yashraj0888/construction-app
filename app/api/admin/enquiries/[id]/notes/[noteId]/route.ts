import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminAuthenticated, unauthorized } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string; noteId: string }> };

const updateSchema = z.object({
  html: z.string().min(1, "Note cannot be empty"),
});

/** Update a note belonging to this enquiry. */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id: enquiryId, noteId } = await params;
  if (!enquiryId || !noteId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid note" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("enquiry_notes")
    .update({ html: parsed.data.html, updated_at: now })
    .eq("id", noteId)
    .eq("enquiry_id", enquiryId)
    .select("id, enquiry_id, html, created_at, updated_at")
    .maybeSingle();

  if (error) {
    console.error("enquiry_notes update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  await supabase.from("enquiries").update({ updated_at: now }).eq("id", enquiryId);

  return NextResponse.json({ note: data });
}

/** Delete a note belonging to this enquiry. */
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id: enquiryId, noteId } = await params;
  if (!enquiryId || !noteId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("enquiry_notes")
    .delete()
    .eq("id", noteId)
    .eq("enquiry_id", enquiryId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("enquiry_notes delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  await supabase
    .from("enquiries")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", enquiryId);

  return NextResponse.json({ ok: true });
}
