"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { TUserDB } from "@repo/db/types";
import { useRouter } from "next/navigation";
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";
import { FormEvent, useState } from "react";
import { addUsername } from "@repo/db";
import { ZOnboardFormSchema } from "@repo/types";

export const OnboardFormNext = ({ id }: { id: string }) => {
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  async function handleLoginForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    let formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    const parsedUsername = ZOnboardFormSchema.safeParse({ username });
    if (!parsedUsername.success) {
      alert("validation error");
      setSaving(false);
      return;
    }

    const updatedUser = await addUsername({ id, username });
    router.push("/proctected");
  }

  return (
    <Card className="w-[23.5rem]">
      <CardHeader className="p-4 text-center">
        <CardTitle className="text-xl">Create Username</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginForm}>
          <fieldset
            disabled={saving}
            className="group flex flex-col items-start gap-1 text-black/70"
          >
            <div className="text-sm text-slate-500 mb-1">
              This is your public display name.
            </div>
            <div className="w-full group-disabled:opacity-50">
              <Input className="w-full" placeholder="jhondoe" name="username" />
            </div>
            <div className="mt-[25px] flex w-full justify-center items-center">
              <Button type="submit">
                <span className="group-disabled:hidden">Submit</span>
                <div className="flex justify-center items-center gap-2 group-enabled:hidden">
                  <SpinnerOutline />
                  <span>Loading...</span>
                </div>
              </Button>
            </div>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
};
