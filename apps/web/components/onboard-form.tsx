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
import { useRouter } from "next/navigation";
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";
import { addUsername, usernameExists } from "@repo/db";
import { ZOnboardFormSchema } from "@repo/types";
import { z, zodResolver, useForm } from "@repo/ui/lib/react-hook-forms";
import { toast } from "sonner";

export const OnboardForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ZOnboardFormSchema>>({
    resolver: zodResolver(ZOnboardFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ZOnboardFormSchema>) => {
    // Shows loading state for better UX
    await new Promise((resolve) => {
      setTimeout(resolve, 1.5 * 1000);
    });

    const USERNAME_EXISTS = await usernameExists({ username: values.username });
    if (USERNAME_EXISTS) {
      form.reset();
      return toast.error("username already exists. Please try again!");
    }
    await addUsername({
      id,
      username: values.username,
    });
    router.push("/proctected");
  };
  return (
    <Card className="w-[23.5rem]">
      <CardHeader className="p-4 text-center">
        <CardTitle className="text-xl">Username</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem className="-mb-2">
                  <FormDescription className="pb-3">
                    Create a unique username, 5-20 characters, using letters,
                    numbers, or underscores.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="JhonDoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.isSubmitting ? (
              <div className="flex justify-center items-center">
                <Button
                  disabled={form.formState.isSubmitting}
                  className="w-full flex justify-center items-center gap-1 px-8"
                >
                  <SpinnerOutline />
                  <span>Submitting...</span>
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
