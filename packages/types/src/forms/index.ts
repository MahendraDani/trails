import { z } from "zod";
import { isValidUsername } from "@repo/ui/lib/valid-username";

export const ZOnboardFormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(20, {
      message: "username should be at most 20 characters",
    })
    .refine(
      (username) => {
        return isValidUsername(username);
      },
      {
        message:
          "Username should not contain any special characters expect underscore",
      },
    ),
});
