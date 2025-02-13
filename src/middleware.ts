import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/types";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user as User;

  const publicRoutes = ["/login", "/signin-error"];
  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isCompletarPerfil =
    req.nextUrl.pathname.startsWith("/completar-perfil");

  if (isPublicRoute && !session) {
    return NextResponse.next();
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

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
