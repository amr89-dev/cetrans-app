import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import authConfig from "./auth.config";
import { User } from "./types";
type CompleteUser = AdapterUser & User;

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
      session.user = token.user as CompleteUser;
      return session;
    },
    authorized: async ({ auth }) => {
      const isLoggedIn = !!auth;

      return isLoggedIn;
    },
  },
  pages: {
    signIn: "/login",
    error: "/signin-error",
    newUser: "/completar-perfil",
  },
});
