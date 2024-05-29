"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@repo/auth/client";

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
import { Input } from "../ui/input";
import z from "zod";

const ZEmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .min(1, { message: "Email is required for logging in using Magic Link" }),
});
export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [emailValidationError, setEmailVationError] = useState("");
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("github");
  };

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEmailLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const parsedInput = ZEmailSchema.safeParse({
      email,
    });

    if (!parsedInput.success) {
      setEmailVationError(parsedInput.error.errors[0]?.message as string);
      setIsEmailLoading(false);
      return;
    }

    await signIn("email", {
      email: parsedInput.data.email,
    });
    setIsEmailLoading(false);
    return;
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
        <form onSubmit={handleEmailLogin} className="mt-3">
          <Input className="w-full" placeholder="Email" name="email" />
          {emailValidationError && (
            <span className="text-sm text-red-400">{emailValidationError}</span>
          )}
          <Button
            type="submit"
            disabled={isEmailLoading}
            className="w-full mt-3"
            variant={"secondary"}
          >
            {isEmailLoading ? (
              <div className="flex justify-center gap-3 items-center">
                <SpinnerOutline />
              </div>
            ) : (
              <div className="flex justify-center gap-3 items-center">
                <span>Login with Email</span>
              </div>
            )}
          </Button>
        </form>
        <form onSubmit={handleLogin}>
          <Button type="submit" className="w-full ">
            {isLoading ? (
              <div className="flex justify-center gap-3 items-center">
                <SpinnerOutline />
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
