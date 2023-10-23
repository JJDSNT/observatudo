//https://youtu.be/vUm-YIEbl7E?si=_mQ8hY9yfsqWeHsC
//https://stackoverflow.com/questions/76503606/next-auth-error-adapter-is-not-assignable-to-type-adapter-undefined
//https://www.contentful.com/blog/how-to-store-users-with-nextauth-aka-auth/
//https://next-auth.js.org/configuration/events

//https://github.com/shadcn-ui/taxonomy/blob/main/lib/auth.ts

import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

import Google from 'next-auth/providers/google';
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { cert } from "firebase-admin/app"

import { UserService } from "@/app/services/UserService"
import { Usuario } from "@/app/models/Usuario"

//const userService = new UserService();

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }
      return token
    },
    //para client components
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
}
