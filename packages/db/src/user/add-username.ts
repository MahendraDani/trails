interface IAddUsernameType {
  id: string;
  username: string;
}
import { db } from "../index";
import { Prisma } from "@prisma/client";
import { EDatabaseError } from "@repo/types";

export const addUsername = async ({ id, username }: IAddUsernameType) => {
  // TODO : add zod validations for id and username
  try {
    const user = await db.user.update({
      data: {
        username,
      },
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("Error setting username");
    }
    throw error;
  }
};
