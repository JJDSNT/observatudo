import NextAuth, { NextAuthOptions } from 'next-auth';
//import Google from 'next-auth/providers/google';
import { authOptions } from "@/app/utils/auth";

/*
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    })
  ]
};
*/

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };