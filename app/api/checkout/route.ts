import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { citbTotalPence } from "@/lib/citb-pricing";
import { cscsCardPricePence } from "@/lib/cscs-pricing";
import { clientIp, rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const schema = z.object({
  checkoutType: z.enum(["citb_test", "cscs_card"]),
  email: z.string().email(),
  fullName: z.string().min(1),
  product: z.string().min(1),
  multiTest: z.boolean().default(false),
  enquiryId: z.string().optional(),
  successPath: z.string().default("/book-citb-test?payment=success"),
  cancelPath: z.string().default("/book-citb-test?payment=cancelled"),
});

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = rateLimit({
    key: `checkout:${ip}`,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!limited.ok) return rateLimitedResponse(limited.retryAfterSec);

  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid checkout request" },
        { status: 400 }
      );
    }

    const {
      checkoutType,
      email,
      fullName,
      product,
      multiTest,
      enquiryId,
      successPath,
      cancelPath,
    } = parsed.data;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env." },
        { status: 503 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const amount =
      checkoutType === "cscs_card"
        ? cscsCardPricePence()
        : citbTotalPence(multiTest);
    const stripe = getStripe();
    const description =
      checkoutType === "cscs_card"
        ? "CSCS card application and booking"
        : multiTest
          ? "CITB HS&E test booking including multi-test / retake add-on"
          : "CITB HS&E test booking";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amount,
            product_data: {
              name: product,
              description,
            },
          },
        },
      ],
      success_url: `${origin}${successPath.startsWith("/") ? successPath : `/${successPath}`}`,
      cancel_url: `${origin}${cancelPath.startsWith("/") ? cancelPath : `/${cancelPath}`}`,
      metadata: {
        checkout_type: checkoutType,
        product,
        multi_test:
          checkoutType === "citb_test" && multiTest ? "true" : "false",
        enquiry_id: enquiryId || "",
        full_name: fullName,
        amount_gbp: String(amount / 100),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("checkout error:", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
