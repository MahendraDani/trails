import { TCollectionsDB } from "@db/types";
import { db } from "..";

/**
 * @param id collection id
 */

export const deleteCollection = async ({ id }: { id: string }) => {
  try {
    // TODO : update this to transaction and delete all associated trails with the collection

    const collection = await db.collections.delete({
      where: {
        id,
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
