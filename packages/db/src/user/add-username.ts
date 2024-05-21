"use server";
interface IAddUsernameType {
  id: string;
  username: string;
}
import { db } from "../db";
import { Prisma } from "@prisma/client";
import { EDatabaseError } from "@repo/types";

export const addUsername = async ({ id, username }: IAddUsernameType) => {
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

export const usernameExists = async ({ username }: { username: string }) => {
  try {
    const user = await db.user.findFirst({
      where: {
        username,
      },
    });
    return user ? true : false;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new EDatabaseError("Error setting username");
    }
    throw error;
  }
};
