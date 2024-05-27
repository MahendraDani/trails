import { TCollectionsDB } from "@db/types";
import { db } from "..";
import { ZCreateCollectionSchema } from "@repo/types";

export const createCollection = async ({
  name,
  userId,
  slug,
  description,
}: Pick<TCollectionsDB, "name" | "description" | "userId" | "slug">) => {
  try {
    const parsedInput = ZCreateCollectionSchema.safeParse({
      name,
      description,
      userId,
      slug,
    });

    if (!parsedInput.success) {
      return {
        success: false,
        data: null,
        code: 400,
        status: "bad_request",
        error: parsedInput.error,
      };
    }

    const exists = await db.collections.findFirst({
      where: {
        slug,
      },
    });

    if (exists) {
      return {
        success: false,
        data: exists,
        error: "Collection with given name already exists",
        code: 403,
        status: "forbidden",
      };
    }
    const collection = await db.collections.create({
      data: {
        ...parsedInput.data,
      },
    });

    console.log(collection);

    return {
      success: true,
      data: collection,
      error: null,
      code: 201,
      status: "resource_created",
    };
  } catch (error) {
    console.log("I am here");
    return {
      success: false,
      data: null,
      error,
      code: 500,
      status: "internal_server_error",
    };
  }
};
