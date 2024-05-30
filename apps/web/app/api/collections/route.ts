import { NextRequest, NextResponse } from "next/server";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getCollectionById,
  getCollectionOwnerById,
} from "@repo/db";
import {
  handleApiError,
  hanldeInternalServerError,
  hanldeZodError,
  withApiClient,
} from "../../../lib/api";
import { TApiClient } from "@repo/db/types";
import { createSlug } from "../../../lib/slug";
import {
  EApiError,
  EValidationError,
  ZCreateCollectionSchema,
} from "@repo/types";
import { ZodError } from "zod";

// #get all collections of an user
export const GET = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      const userId = client.id;
      const collections = await getAllCollections({ userId });
      return NextResponse.json(
        {
          collections: collections.data,
        },
        { status: collections.code, statusText: collections.status },
      );
    } catch (error) {
      return hanldeInternalServerError(error);
    }
  },
);

// #create a new collection
export const POST = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      const { name, description } = await req.json();

      const parsed = ZCreateCollectionSchema.parse({
        name,
        description,
      });

      const { data } = await createCollection({
        name: parsed.name,
        description: parsed.description,
        userId: client.id,
        slug: `${client.username}:${createSlug(name.toLowerCase())}`,
      });
      return NextResponse.json(
        {
          data,
        },
        { status: 201, statusText: "ok" },
      );
    } catch (error) {
      if (error instanceof EApiError) {
        return handleApiError(error);
      }

      if (error instanceof ZodError) {
        return hanldeZodError(error);
      }
      return hanldeInternalServerError(error);
    }
  },
);

// // #delete collection by its id
export const DELETE = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      // collection_id
      const id = req.nextUrl.searchParams.get("id");

      if (!id) {
        throw new EApiError({
          message:
            "Invalid credentials. Id or username missing in search params",
          code: "bad_Request",
          statusCode: 400,
        });
      }

      //  check if collection exists first
      const exists = await getCollectionById({ id });
      if (!exists.data) {
        throw new EApiError({
          message: "Collection with provided id not found",
          statusCode: exists.code,
          code: exists.status,
        });
      }

      // get owner of collection
      const collection = await getCollectionOwnerById({ id });

      // validate owner
      if (client.username !== collection.data?.owner.username) {
        throw new EApiError({
          message:
            "The server understood the request, but refuses to authorize it.",
          statusCode: 403,
          code: "forbidden",
        });
      }

      // delete collection
      const deletedCollection = await deleteCollection({
        id,
      });
      return NextResponse.json(
        {
          message: "Collection deleted successfully",
          data: deletedCollection.data,
        },
        {
          status: deletedCollection.code,
          statusText: deletedCollection.status,
        },
      );
    } catch (error) {
      if (error instanceof EApiError) {
        return handleApiError(error);
      } else {
        return hanldeInternalServerError(error);
      }
    }
  },
);
