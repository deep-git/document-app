import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import Credentials from "next-auth/providers/credentials";
import { authOptions } from "@/app/actions/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };