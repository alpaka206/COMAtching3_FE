import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/QR-generator") {
    return NextResponse.next();
  }

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = "/qr-generator";

  return NextResponse.redirect(nextUrl, 308);
}

export const config = {
  matcher: ["/QR-generator"],
};
