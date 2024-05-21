"use client";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { signOut } from "@repo/auth/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/components/ui/alert-dialog";

export const Logout = () => {
  const handleSignout = async (e: FormEvent) => {
    e.preventDefault();
    await signOut();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            There is a lot that can done, create trails, update trails and share
            them
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleSignout}>
            <Button variant={"destructive"} type="submit">
              Logout
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
