"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import auth from "@repo/auth/client";

import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { FormEvent, useState } from "react";
import { SpinnerOutline } from "../utils/spinner";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await auth.signIn("github");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Login with Trails
          </DialogTitle>
          <DialogDescription>
            Trails lets you manage your code snippets easily.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="mt-3">
          <Button type="submit" className="w-full ">
            {isLoading ? (
              <div className="flex justify-center gap-3 items-center">
                <SpinnerOutline />
                <span>Loading</span>
              </div>
            ) : (
              <div className="flex justify-center gap-3 items-center">
                <GitHubLogoIcon className="text-lg" />
                <span>Login with Github</span>
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
