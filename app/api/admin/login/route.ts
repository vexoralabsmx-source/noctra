import { NextResponse } from "next/server";
import { createAdminToken, getAdminCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json({ error: "Configura ADMIN_PASSWORD y ADMIN_SESSION_SECRET" }, { status: 500 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ error: "Contrasena incorrecta" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), await createAdminToken(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
