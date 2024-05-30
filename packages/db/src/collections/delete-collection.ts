import { TCollectionsDB } from "@db/types";
import { db } from "..";

/**
 * @param id collection id
 */

export const deleteCollection = async ({ id }: { id: string }) => {
  // TODO : update this to transaction and delete all associated trails with the collection
  const collection = await db.collections.delete({
    where: {
      id,
    },
  });

  return {
    data: collection,
  };
};
