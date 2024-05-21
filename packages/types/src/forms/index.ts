import { z } from "zod";
import { isValidUsername } from "@repo/ui/lib/valid-username";

export const ZOnboardFormSchema = z.object({
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
