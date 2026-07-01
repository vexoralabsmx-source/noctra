import { NextResponse, type NextRequest } from "next/server";
import { getAdminCookieName, verifyAdminToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/admin") &&
    pathname !== "/api/admin/login" &&
    pathname !== "/api/admin/logout";

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const token = request.cookies.get(getAdminCookieName())?.value;
  const valid = await verifyAdminToken(token, process.env.ADMIN_SESSION_SECRET);

  if (valid) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json({ error: "Sesion admin requerida" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
