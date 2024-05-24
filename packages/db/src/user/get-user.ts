import { db } from "../index";
import { Prisma } from "@prisma/client";
import { EResourceNotFoundError, EDatabaseError } from "@repo/types";

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

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("Error getting user");
    }
    throw error;
  }
};

export const getUserByUsername = async ({ username }: { username: string }) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("User not found");
    }
    throw error;
  }
};
