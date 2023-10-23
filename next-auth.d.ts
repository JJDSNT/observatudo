//https://next-auth.js.org/getting-started/typescript#module-augmentation
//https://reacthustle.com/blog/extend-user-session-nextauth-typescript
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string,
            role: string | undefined | null
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string
    }
}