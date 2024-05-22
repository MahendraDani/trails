"use server";
import { ZOnboardFormSchema } from "@repo/types";
import { usernameExists, addUsername } from "@repo/db";
import { redirect } from "next/navigation";
export interface IOnboardFormPrevState {
  message: string;
  error: unknown;
  errorType?: string;
}

export async function OnboardUserAction(
  prevState: IOnboardFormPrevState,
  formData: FormData,
) {
  const id = formData.get("id");
  const username = formData.get("username");

  const parsedInput = ZOnboardFormSchema.safeParse({
    username,
    id,
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

  await addUsername({
    id: parsedInput.data.id,
    username: parsedInput.data.username,
  });

  redirect("/proctected");
  return {
    message: "Successfully created username",
    error: null,
  };
}
