import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@repo/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  pages: {
    signOut: "/",
    newUser: "/onboard",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.type !== "oauth") {
        return false;
      }

      // NOTE : use these logs while debbuging
      // console.log(user);
      // console.log(account);
      // console.log(profile);

      if (account.provider) {
        const existingUserWithAccount = await db.user.findFirst({
          include: {
            account: true,
          },
          where: {
            githubId: profile.id,
          },
        });

        if (existingUserWithAccount) {
          if (
            existingUserWithAccount.email === user.email &&
            existingUserWithAccount.name === user.name &&
            existingUserWithAccount.avatarUrl === user.avatar_url
          ) {
            return true;
          }

          // update details if user changed their provier details
          const updatedUser = await db.user.update({
            where: {
              id: existingUserWithAccount.id,
            },
            data: {
              name: profile.name,
              githubId: profile.id,
              email: profile.email,
              login: profile.login,
              avatarUrl: profile.avatar_url,
            },
          });

          return true;
        }

        // add new user to db
        const newUser = await db.user.create({
          data: {
            name: profile.name,
            githubId: profile.id,
            email: profile.email,
            login: profile.login,
            avatarUrl: profile.avatar_url,
          },
        });

        // create account for new user
        await db.account.create({
          data: {
            ...account,
            userId: newUser.id,
          },
        });
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (!token.sub) {
        return token;
      }
      const dbUser = await db.user.findFirst({
        where: {
          githubId: parseInt(token.sub),
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        avatarUrl: dbUser.avatarUrl,
        login: dbUser.login,
      };
    },
    async session({ token, session, user }) {
      if (token) {
        if (token.name && session.user) {
          session.user.name = token.name;
        }
        if (token.email && session.user) {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
};
