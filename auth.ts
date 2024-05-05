import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import Resend from "next-auth/providers/resend";

const prisma = new PrismaClient().$extends(withAccelerate());

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "hello@scry.party",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Check if the user already has a profile
      const existingProfile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (!existingProfile) {
        // Create a new profile for the user
        const newProfile = await prisma.profile.create({
          data: {
            userId: user.id,
            // Set any additional profile fields as needed
          },
        });

        // Add the profileId to the session user object
        session.user.profileId = newProfile.id;
      } else {
        // Add the existing profileId to the session user object
        session.user.profileId = existingProfile.id;
      }

      return session;
    },
  },
});
