"use client";
import auth from "@repo/auth/client";
import { FormEvent } from "react";

export function SignIn() {
  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signIn("github");
  };
  return (
    <form onSubmit={handleSignin}>
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
