/**
 * Verify a Cloudflare Turnstile token server-side.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  ip?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      error: "CAPTCHA is not configured. Add TURNSTILE_SECRET_KEY to .env.",
    };
  }
  if (!token || !token.trim()) {
    return { ok: false, error: "Wrong CAPTCHA" };
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip && ip !== "unknown") body.set("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }
    );
    const json = (await res.json()) as { success?: boolean };
    if (!json.success) return { ok: false, error: "Wrong CAPTCHA" };
    return { ok: true };
  } catch {
    return { ok: false, error: "Wrong CAPTCHA" };
  }
}
