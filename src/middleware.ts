import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const pathname = request.nextUrl.pathname;

  // If user is already logged in and tries to access login page
  if (pathname === "/" && accessToken) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/banners",
    "/campaign",
    "/category",
    "/brand",
    "/coupon",
    "/order-list",
    "/products",
    "/user",
    "/product-review",
    "/new_order",
    "/home_controll",
    "/social",
    "/logo",
    "/policy",
    "/contact",
    "/about",
    "/staffs",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user is not logged in, redirect to login page
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

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