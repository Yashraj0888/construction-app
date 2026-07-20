import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminPassword } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const password = getAdminPassword();
  if (!password) {
    return NextResponse.json(
      { error: "Set ADMIN_PASSWORD in your .env file first." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  if (body.password !== password) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
