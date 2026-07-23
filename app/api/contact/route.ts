import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidEmail } from "@/lib/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { clientIp, rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().refine((v) => isValidEmail(v), "Invalid email"),
  subject: z.string().optional(),
  message: z.string().min(10),
  turnstileToken: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = rateLimit({
    key: `contact:${ip}`,
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });
  if (!limited.ok) return rateLimitedResponse(limited.retryAfterSec);

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid form" },
        { status: 400 }
      );
    }

    const captcha = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
    if (!captcha.ok) {
      return NextResponse.json({ error: captcha.error }, { status: 400 });
    }

    const supabase = createAdminClient();
    const nameParts = parsed.data.name.trim().split(/\s+/);
    const firstName = nameParts[0] || parsed.data.name;
    const lastName = nameParts.slice(1).join(" ") || null;

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        enquiry_type: "contact",
        product: parsed.data.subject || "Contact form",
        source_path: "/#contact",
        first_name: firstName,
        last_name: lastName,
        email: parsed.data.email,
        message: parsed.data.message,
        status: "contact_us",
        agreed_to_terms: false,
        payload: {
          trigger: "form_submitted",
          subject: parsed.data.subject || "",
        },
        user_agent: req.headers.get("user-agent"),
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("contact insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("contact POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
