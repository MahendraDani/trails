import { TCollectionsDB } from "@db/types";
import { db } from "..";
import { z } from "zod";

const ZIsExistingCollectionByNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .describe("The name of collection"),
});
export const isExistingCollectionByName = async ({
  name,
}: Pick<TCollectionsDB, "name">) => {
  const parsedInput = ZIsExistingCollectionByNameSchema.safeParse({ name });

  if (!parsedInput.success) {
    return {
      success: false,
      data: null,
      error: parsedInput.error,
      code: 400,
      status: "validation_error",
    };
  }
  try {
    const collection = await db.collections.findFirst({
      where: {
        ...parsedInput.data,
      },
    });

    if (!collection) {
      return {
        success: true,
        data: null,
        code: 200,
        status: "ok",
        error: null,
      };
    }

    return {
      success: false,
      data: collection,
      code: 409,
      status: "conflict",
      error: "collection with given name already exists",
    };
  } catch (error) {
    return {
      data: null,
      error,
      status: "internal_server_error",
      code: 400,
      success: false,
    };
  }
};
