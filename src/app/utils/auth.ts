//https://youtu.be/vUm-YIEbl7E?si=_mQ8hY9yfsqWeHsC
//https://stackoverflow.com/questions/76503606/next-auth-error-adapter-is-not-assignable-to-type-adapter-undefined
//https://www.contentful.com/blog/how-to-store-users-with-nextauth-aka-auth/
//https://next-auth.js.org/configuration/events
//https://github.com/shadcn-ui/taxonomy/blob/main/lib/auth.ts


import { User } from "@nextui-org/react";
import type { NextAuthOptions } from "next-auth"

import Google from 'next-auth/providers/google';
//import { FirestoreAdapter } from "@next-auth/firebase-adapter"
//import { cert } from "firebase-admin/app"

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
          role: 'user' //melhorar isso aqui depois
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.email === process.env.ADMIN_EMAIL){
          user.role='admin'
        }
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
