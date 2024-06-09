import { TCollectionsDB } from "@db/types";
import { db } from "..";
import { EApiError } from "@repo/types";

export const createCollection = async ({
  name,
  userId,
  slug,
  description,
}: Pick<TCollectionsDB, "name" | "description" | "userId" | "slug">) => {
  const exists = await db.collections.findFirst({
    where: {
      userId,
      slug,
    },
  });

  if (exists) {
    throw new EApiError({
      message: "Collection with given name already exists",
      code: "conflict",
      statusCode: 409,
    });
  }
  const collection = await db.collections.create({
    data: {
      name,
      description,
      slug,
      userId,
    },
  });

  return {
    data: collection,
  };
};
