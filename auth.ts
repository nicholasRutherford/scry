import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import Resend from "next-auth/providers/resend"

const prisma = new PrismaClient().$extends(withAccelerate())


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Resend({
        server: "scry.party",
        from: "hello@scry.party",
    })],
})