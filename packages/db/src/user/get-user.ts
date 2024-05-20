import { db } from "@db/db";
import { Prisma } from "@prisma/client";
import { EDatabaseError } from "@repo/types";

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("Error getting user");
    }
    throw error;
  }
};

// export const getUserByEmail;
