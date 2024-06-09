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
import { EApiError, ZCreateCollectionSchema } from "@repo/types";
import { ZodError } from "zod";

// #get all collections of an user
export const GET = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      const collections = await getAllCollections({ userId: client.id });

      return NextResponse.json(
        {
          data: collections.data,
        },
        { status: 200, statusText: "ok" },
      );
    } catch (error) {
      if (error instanceof EApiError) {
        return handleApiError(error);
      }
      return hanldeInternalServerError(error);
    }
  },
);

// #create a new collection
export const POST = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      const { collectionName, collectionDescription } = await req.json();

      const parsed = ZCreateCollectionSchema.parse({
        collectionName,
        collectionDescription,
      });

      const { data } = await createCollection({
        name: parsed.collectionName,
        description: parsed.collectionDescription,
        userId: client.id,
        slug: `${client.username}:${createSlug(collectionName.toLowerCase())}`,
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
      await getCollectionById({ id });

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
          id: deletedCollection.data.id,
        },
        {
          status: 200,
          statusText: "ok",
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
