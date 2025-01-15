import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/types";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Añadir logging para debuggear en producción
  console.log("Middleware token:", !!token);
  console.log("Current path:", req.nextUrl.pathname);

  const publicRoutes = ["/login", "/signin-error"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isCompletarPerfil =
    req.nextUrl.pathname.startsWith("/completar-perfil");

  if (isPublicRoute && !token) {
    return NextResponse.next();
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = token.user as User;
  console.log("User data:", {
    id: user?.id,
    isComplete: user?.isComplete,
  });

  if (!user?.isComplete && !isCompletarPerfil) {
    console.log("Redirecting to completar perfil");
    return NextResponse.redirect(new URL("/completar-perfil", req.url));
  }

  if (user?.isComplete && isCompletarPerfil) {
    console.log("User profile is complete, redirecting to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*|_vercel).*)",
  ],
};
