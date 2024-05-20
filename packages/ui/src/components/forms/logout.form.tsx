"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import auth from "@repo/auth/client";

export const Logout = () => {
  const handleSignout = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  return (
    <form onSubmit={handleSignout}>
      <Button variant={"outline"} type="submit">
        Logout
      </Button>
    </form>
  );
};
