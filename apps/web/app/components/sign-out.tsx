"use client";

import auth from "@repo/auth/client";
import { FormEvent } from "react";

export default function SignOut() {
  const handleSignout = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  return (
    <form onSubmit={handleSignout}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
