import { z } from "zod";

export const ZCreateCollectionSchema = z.object({
  collectionName: z
    .string()
    .describe("The name of new collection")
    .min(1, { message: "Collection name is required" })
    .max(255, { message: "Name should not exceed 255 characters" }),
  collectionDescription: z
    .string()
    .describe("A short description of collection")
    .max(255, { message: "Description should not exceed 255 characters" }),
});
