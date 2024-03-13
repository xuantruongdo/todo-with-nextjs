import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/config/axios-customize";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/users/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          return data;
        }
        catch (err) {
          throw Error(err as string);
        } 
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, trigger }) {
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.user = user.user;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
