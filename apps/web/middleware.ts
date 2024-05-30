import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getToken from "@repo/auth/jwt";

const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // returns raw JWT if user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    raw: true,
  });

  console.log(token);

  if (!token) {
    // if user is not logged in, redirect to / path (for now)
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Add all proctected routes below
export const config = {
  matcher: ["/onboard"],
};
