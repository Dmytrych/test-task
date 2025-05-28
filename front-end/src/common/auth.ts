import CredentialsProvider from "next-auth/providers/credentials";
import {authorize} from "@/common/api/auth/auth.repository";
import NextAuth, {AuthOptions, DefaultSession} from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await authorize(credentials?.email, credentials?.password)

          console.log(response)
          if (!response?.data) {
            return null;
          }
          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            accessToken: response.data.accessToken,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("Jwt")
      return {...token, ...user}
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

export const handlers = NextAuth(authOptions)
