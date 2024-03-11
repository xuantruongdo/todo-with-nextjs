import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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

        const res = await axios.post("https://todo-with-nextjs-rouge.vercel.app/api/users/login", {
          username: credentials?.username,
          password: credentials?.password,
        });
        if (res && res.data) {
          return res.data as any;
        } else {
          throw new Error("Login error");
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