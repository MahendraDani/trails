import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@repo/db";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      async sendVerificationRequest({ identifier, url }) {
        // console.log(identifier);
        // console.log(url);

        try {
          console.log(`Login Link: ${url}`);
        } catch (error) {
          throw new Error("Error sending error");
        }
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    newUser: "/onboard",
    error: "/auth/error",
    signIn: "/",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ account, user, profile }: any) {
      console.log(account);
      console.log(user);
      console.log(profile);

      if (!user.email) {
        return false;
      }

      if (!account?.provider) {
        return false;
      }
      // for those who login with email
      if (account?.provider === "email") {
        // for existing user
        const exisitngUser = await db.user.findUnique({
          where: {
            email: user.email,
          },
          include: {
            account: true,
          },
        });

        // for github user
        if (exisitngUser?.account?.provider === "github") {
          await db.user.update({
            where: {
              email: user.email,
            },
            data: {
              avatarUrl: profile?.image,
              profileId: profile?.id.toString(),
              name: profile?.name,
            },
          });
        }

        if (exisitngUser) {
          if (exisitngUser.email === user.email) {
            return true;
          }
          // update details

          const updatedUser = await db.user.update({
            where: {
              id: exisitngUser.id,
            },
            data: {
              email: user.email!,
              name: user?.name,
              avatarUrl: user?.image,
              profileId: account.providerAccountId,
            },
          });
          return true;
        }

        // for new user
        const newUser = await db.user.create({
          data: {
            name: user?.name,
            email: user.email!,
            profileId: account.providerAccountId,
            avatarUrl: user?.image,
          },
        });

        // add user in accounts table
        await db.account.create({
          data: {
            ...account,
            userId: newUser.id,
          },
        });
        return true;
      }

      // For those who login with github
      if (account?.provider === "github") {
        // check if user already exists
        const existingUserByEmail = await db.user.findUnique({
          where: {
            email: user.email,
          },
          include: {
            account: true,
          },
        });

        // add new user
        if (!existingUserByEmail) {
          const newUser = await db.user.create({
            data: {
              email: profile?.email!,
              name: profile?.name,
              avatarUrl: profile?.image,
              profileId: profile?.id.toString(),
            },
          });

          //create account for new user
          await db.account.create({
            data: {
              ...account,
              userId: newUser.id,
            },
          });
        }

        // check whether account.provder=== "email" || "github" => update details
        if (existingUserByEmail?.account?.provider === "email") {
          if (existingUserByEmail.email === user.email) {
            return true;
          }
        }

        if (existingUserByEmail?.account?.provider === "github") {
          if (existingUserByEmail.email === user.email) {
            await db.user.update({
              where: {
                id: existingUserByEmail.id,
              },
              data: {
                name: profile?.name,
                avatarUrl: profile?.image,
                profileId: profile?.id.toString(),
              },
            });

            return true;
          }
        }
      }
      return false;
    },
  },
};
