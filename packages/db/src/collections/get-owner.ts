import { TCollectionsDB } from "@db/types";
import { db } from "..";

/**
 * @param id collection id
 */

export const getCollectionOwnerById = async ({
  id,
}: Pick<TCollectionsDB, "id">) => {
  try {
    const collection = await db.collections.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });

    return {
      success: true,
      error: null,
      data: collection,
      code: 200,
      status: "ok",
    };
  } catch (error) {
    return {
      success: false,
      error,
      data: null,
      code: 500,
      status: "internal_server_error",
    };
  }
};
