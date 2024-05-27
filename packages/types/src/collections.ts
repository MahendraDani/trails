import { z } from "zod";

export const ZCreateCollectionSchema = z.object({
  name: z
    .string()
    .describe("The name of new collection")
    .min(1, { message: "Collection name is required" }),
  description: z
    .string()
    .describe("A short description of collection")
    .max(255, { message: "Description should not exceed 255 characters" }),
  userId: z
    .string()
    .min(1, { message: "userId is required" })
    .describe("The userId of user who is creating the collection"),
  slug: z
    .string()
    .min(1, { message: "slug is required" })
    .describe("A unique human readable identifier of the collection"),
});
