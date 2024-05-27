import { TCollectionsDB } from "@db/types";
import { db } from "..";
import { z } from "zod";

const ZIsExistingCollectionByNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .describe("The name of collection"),
});
export const getCollectionByName = async ({
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

    return {
      success: collection ? true : false,
      data: collection,
      code: !collection ? 200 : 409,
      status: !collection ? "ok" : "conflict",
      error: !collection ? null : "collection with given name already exists",
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

export const getCollectionById = async ({ id }: { id: string }) => {
  try {
    const collection = await db.collections.findUnique({
      where: { id },
      include: {
        owner: true,
        trails: true,
      },
    });
    return {
      success: !collection ? false : true,
      data: collection,
      code: !collection ? 404 : 200,
      status: !collection ? "not_found " : "ok",
      error: !collection ? "Collection not found" : null,
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
