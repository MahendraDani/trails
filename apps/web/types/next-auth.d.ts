import { TAccountDB, TSessionDB, TUserDB } from "@repo/db/types";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: TUserDB;
    account?: TAccountDB;
    sess: TSessionDB[];
  }
}
