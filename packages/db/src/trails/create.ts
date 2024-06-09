import { TTrailsDB } from "@db/types";
import { db } from "..";
import { EDatabaseError } from "@repo/types";

interface CreateTrailInput {
  name: TTrailsDB["name"];
  userId: TTrailsDB["userId"];
  description: TTrailsDB["description"];
  content: TTrailsDB["content"];
  language: TTrailsDB["language"];
  collectionName: string;
}

export const createTrail = async ({
  name,
  userId,
  description,
  content,
  language,
  collectionName,
}: CreateTrailInput) => {
  const collectionid = await db.collections.findFirst({
    where: {
      name: collectionName,
    },
  });

  if (!collectionid) {
    throw new EDatabaseError("Collection not found");
  }

  const trail = await db.trails.create({
    data: {
      name,
      userId,
      description,
      content,
      language,
      collectionId: collectionid.id,
    },
  });

  return {
    data: trail,
  };
};
