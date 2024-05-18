// Example db query with error handling
// TODO : add zod validations for args

import { Prisma } from "@prisma/client";
import { db } from "./db";
import { EDatabaseError } from "@repo/types";

const getUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("Error querying database");
    }
    throw error;
  }
};
