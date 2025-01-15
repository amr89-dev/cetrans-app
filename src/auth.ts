import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import authConfig from "./auth.config";
import { User } from "./types";
type CompleteUser = AdapterUser & User;

declare module "next-auth" {
  interface Session {
    user: CompleteUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: CompleteUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CompleteUser;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      const isLoggedIn = !!auth;
      /* const isCompletarPerfil =
        nextUrl.pathname.startsWith("/completar-perfil");
      const isComplete = (auth?.user as CompleteUser)?.isComplete;

      if (isLoggedIn && !isComplete && !isCompletarPerfil) {
        return Response.redirect(new URL("/completar-perfil", nextUrl));
      }

      if (isLoggedIn && isComplete && isCompletarPerfil) {
        return Response.redirect(new URL("/", nextUrl));
      } */

      return isLoggedIn;
    },
  },
  pages: {
    signIn: "/login",
    error: "/signin-error",
    newUser: "/completar-perfil",
  },
});
