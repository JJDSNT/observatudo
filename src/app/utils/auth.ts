//https://youtu.be/vUm-YIEbl7E?si=_mQ8hY9yfsqWeHsC
//https://stackoverflow.com/questions/76503606/next-auth-error-adapter-is-not-assignable-to-type-adapter-undefined
//https://www.contentful.com/blog/how-to-store-users-with-nextauth-aka-auth/
//https://next-auth.js.org/configuration/events

import NextAuth, { Session, DefaultUser, NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { UserService } from "@/app/services/UserService"
import { Usuario } from "@/app/models/Usuario"

const userService = new UserService();

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
    // Para criar o usuário no TypeORM caso ainda não exista
   /*async signIn({ account, profile }) {
      if (account && account.provider === "google" && profile?.email) { // && profile.email_verified
        try {
          return true;
          //const userData = new Usuario(profile.name || '', profile.email, profile.sub || '');//depois salvar tambem a role
          //console.log(userData);
          //await userService.getOrCreateUser(profile.email, userData);
          console.log("Usuário criado ou recuperado com sucesso!");
          return true;
        } catch (error) {
          console.error("Erro ao criar ou recuperar usuário:", error);
          //throw error;
        }
      }
      return true; // Ou retorne false se o usuário não atender aos critérios desejados
    }
    */
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
  }),
  session: {
    strategy: 'jwt'
  },
};