
import { NextRequest, NextResponse } from "next/server";

export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/banners/:path*",
    "/campaign/:path*",
    "/category/:path*",
    "/brand/:path*",
    "/coupon/:path*",
    "/order-list/:path*",
    "/products/:path*",
    "/user/:path*",
    "/new_order/:path*",
    "/product-review/:path*",
    "/home_controll/:path*",
    "/social/:path*",
    "/logo/:path*",
    "/policy/:path*",
    "/contact/:path*",
    "/about/:path*",
    "/staffs/:path*",
  ],
};
