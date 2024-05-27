import { NextRequest, NextResponse } from "next/server";
import {
  isExistingCollectionByName,
  createCollection,
  getUserByUsername,
} from "@repo/db";
import slugify from "@sindresorhus/slugify";

export const POST = async (req: NextRequest) => {
  try {
    const { username, name, description } = await req.json();

    const user = await getUserByUsername({ username });
    if (!user) {
      return NextResponse.json(
        {
          error: {
            message: "User not found",
          },
        },
        { status: 404, statusText: "user_not_found" },
      );
    }
    const existingCollection = await isExistingCollectionByName({ name });

    // check is collection with given name already exists
    if (existingCollection.status === "conflict") {
      return NextResponse.json(
        {
          error: {
            message: "Collection with given name already exists",
            details: {
              ...existingCollection,
            },
          },
        },
        {
          status: existingCollection.code,
          statusText: existingCollection.status,
        },
      );
    }

    if (existingCollection.success) {
      // create new collection
      const parsedSlug = `${username}:${slugify(name, {
        separator: "-",
        preserveLeadingUnderscore: true,
        preserveTrailingDash: false,
        lowercase: true,
        decamelize: true,
      })}`;

      const { data, status, success, code } = await createCollection({
        name,
        description,
        userId: user.id,
        slug: parsedSlug,
      });

      return NextResponse.json(
        { data, success },
        { status: code, statusText: status },
      );
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      statusText: "internal_server_error",
    });
  }
};
