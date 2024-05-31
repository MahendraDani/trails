import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getToken from "@repo/auth/jwt";
import { getServerSession } from "@repo/auth/server";
import { authOptions } from "@repo/auth";

const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // returns raw JWT if user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    raw: true,
  });

  // if user is not logged in and is request any page excpet for '/' then send them back to '/'
  if (!token && req.url !== "http://localhost:3000/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

/*
 * Match all paths except for:
 * 1. /api routes
 * 2. /_next (Next.js internals)
 * 3. /fonts (inside /public)
 * 4. /examples (inside /public)
 * 5. all root files inside /public (e.g. /favicon.ico)
 */
export const config = {
  matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
};
