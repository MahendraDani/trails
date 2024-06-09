"use server";
import { ZOnboardFormSchema } from "@repo/types";
import { usernameExists, addUsername, getUserByEmail } from "@repo/db";
import { redirect } from "next/navigation";
import { getServerSession } from "@repo/auth/server";
import { authOptions } from "@repo/auth";
export interface IOnboardFormPrevState {
  message: string;
  error: unknown;
  errorType?: string;
}

export async function OnboardUserAction(
  prevState: IOnboardFormPrevState,
  formData: FormData,
) {
  console.log("github logging in...");
  // get id from db call here (So that it doesn't appear in payload)
  const session = await getServerSession(authOptions);
  console.log(session);
  const user = await getUserByEmail({ email: session?.user?.email! });
  console.log(user);
  const username = formData.get("username");
  let name = formData.get("name");

  const parsedInput = ZOnboardFormSchema.safeParse({
    username,
    id: user?.id,
    name: name ?? user?.name,
  });

  if (!parsedInput.success) {
    return {
      message: "Validation error",
      error: parsedInput.error.errors[0]?.message,
      errorType: "EValidationError",
    };
  }

  const existingusername = await usernameExists({
    username: parsedInput.data.username,
  });
  if (existingusername) {
    return {
      message: "Username already taken",
      error: "username is already taken, please try again.",
      errorType: "EUserInputError",
    };
  }

  const updateduser = await addUsername({
    id: parsedInput.data.id,
    username: parsedInput.data.username,
    name: parsedInput.data.name,
  });

  console.log(updateduser.username);

  redirect(`/${updateduser.username}`);
  return {
    message: "Successfully created username",
    error: null,
  };
}
