import { TAccountDB, TSessionDB, TUserDB } from "@repo/db/types";
import NextAuth, { DefaultSession } from "next-auth";

// Ref : https://github.com/nextauthjs/next-auth/discussions/9120
declare module "next-auth" {
  interface Session {
    user: TUserDB;
    account?: TAccountDB;
    sess: TSessionDB[];
  }
}
