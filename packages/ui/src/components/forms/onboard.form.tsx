"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { isValidUsername } from "../utils/valid-username";
import { TUserDB } from "@repo/db/types";

const ZOnboardFormSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: "Username must be at least 6 characters.",
    })
    .refine(
      (username) => {
        return isValidUsername(username);
      },
      {
        message:
          "Username should not contain any special charactes expect underscore",
      },
    ),
});

export const OnboardForm = ({
  id,
  addUsername,
}: {
  id: string;
  addUsername: ({
    id,
    username,
  }: {
    id: string;
    username: string;
  }) => Promise<TUserDB>;
}) => {
  const form = useForm<z.infer<typeof ZOnboardFormSchema>>({
    resolver: zodResolver(ZOnboardFormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ZOnboardFormSchema>) {
    const updateUsername = await addUsername({ id, username: values.username });
    // TODO : redirect to /proctected page and later to dashboard page
    console.log(updateUsername);
  }
  return (
    <Card className="w-[23.5rem]">
      <CardHeader className="p-4 text-center">
        <CardTitle className="text-xl">Create Username</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="JhonDoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full text-center">
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
