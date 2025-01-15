import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/types";

export async function middleware(req: NextRequest) {
  const SECRET = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret: SECRET });

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
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = token.user as User;
  const isComplete = user?.isComplete;

  if (!isComplete && !isCompletarPerfil) {
    console.log("vamos a completar perfil");
    return NextResponse.redirect(new URL("/completar-perfil", req.url));
  }
  if (isComplete && isCompletarPerfil) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// middleware.ts
export const config = {
  matcher: [
    // Excluimos todas las rutas de API y archivos estáticos
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
