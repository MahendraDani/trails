import { TTrailsDB } from "@db/types";
import { db } from "..";
import { z } from "zod";
import { EApiError } from "@repo/types";

export const getTrailsByCollectionSlug = async ({
  userId,
  userName,
  collectionSlug,
}: {
  userId: string;
  userName: string;
  collectionSlug: string;
}) => {
  const collectionMaybe = await db.collections.findFirst({
    where: {
      slug: collectionSlug,
    },
  });

  const collectionId = collectionMaybe?.id;

  if (!collectionId) {
    throw new EApiError({
      message: "Collection not found",
      code: "not_found",
      statusCode: 404,
    });
  }

  const trails = await db.trails.findMany({
    where: {
      userId,
      collectionId,
    },
  });

  if (!trails || trails.length === 0) {
    throw new EApiError({
      message: "Trails not found in the collection",
      code: "not_found",
      statusCode: 404,
    });
  }

  return {
    data: trails,
  };
};
