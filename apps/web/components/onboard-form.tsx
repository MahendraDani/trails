"use client";

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
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";
import { useFormState, useFormStatus } from "react-dom";
import { IOnboardFormPrevState, OnboardUserAction } from "../actions/onboard";

export const OnboardForm = () => {
  const initState = {
    message: "",
    error: null,
  };
  const [state, formAction] = useFormState(OnboardUserAction, initState);
  return (
    <Card className="w-[23.5rem]">
      <CardHeader className="p-4 -mb-6 text-center">
        <CardTitle className="text-xl">Username</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-8">
          <OnboardFormFields state={state} />
        </form>
      </CardContent>
    </Card>
  );
};

function OnboardFormFields({ state }: { state: IOnboardFormPrevState }) {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="-my-2">
        <div className="pb-3 text-sm text-muted-foreground">
          Create a unique username, 5-20 characters, using letters, numbers, or
          underscores.
        </div>
        <fieldset disabled={pending}>
          <Input placeholder="JhonDoe" name="username" />
          {state.errorType && state.errorType === "EValidationError" && (
            <div className="text-sm text-red-400 pt-2 px-1 -pb-2">
              <span>{state.error as string}</span>
            </div>
          )}
          {state.errorType && state.errorType === "EUserInputError" && (
            <div className="text-sm text-red-400 pt-1 px-1 -pb-2">
              <span>{state.error as string}</span>
            </div>
          )}
        </fieldset>
      </div>

      <div>
        <Button
          type="submit"
          disabled={pending}
          className="w-full flex justify-center items-center"
        >
          {pending ? (
            <div className="flex justify-center items-center gap-1">
              <SpinnerOutline />
              <span>Submitting...</span>
            </div>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
    </>
  );
}
