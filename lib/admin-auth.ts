import { cookies } from "next/headers";

export const ADMIN_COOKIE = "cca_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export async function isAdminAuthenticated() {
  const password = getAdminPassword();
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  return token === password;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
