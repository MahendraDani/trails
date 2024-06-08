import { NextRequest, NextResponse } from "next/server";
import { getTrailsByCollectionSlug, createTrail } from "@repo/db";
import {
  handleApiError,
  hanldeInternalServerError,
  hanldeZodError,
  withApiClient,
  withApiCollectionIdClient,
} from "../../../lib/api";
import { TApiClient } from "@repo/db/types";
import { EApiError, ZCreateTrailSchema } from "@repo/types";
import { ZodError } from "zod";

export const GET = withApiCollectionIdClient(
  async (req: NextRequest, client: TApiClient, collectionName: string) => {
    console.log(client.id);
    console.log(client.username);
    console.log(collectionName);
    try {
      const trails = await getTrailsByCollectionSlug({
        userId: client.id,
        userName: client.username!,
        collectionName,
      });
      return NextResponse.json(
        {
          data: trails.data,
        },
        { status: 200, statusText: "ok" },
      );
    } catch (error) {
      console.log(error);
      if (error instanceof EApiError) {
        return handleApiError(error);
      }
      return hanldeInternalServerError(error);
    }
  },
);

export const POST = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    try {
      const {
        trailName,
        trailDescription,
        collectionName,
        trailContent,
        trailLanguage,
      } = await req.json();

      const parsed = ZCreateTrailSchema.parse({
        trailName,
        trailDescription,
        trailContent,
        trailLanguage,
      });

      const { data } = await createTrail({
        name: parsed.trailName,
        collectionName,
        content: parsed.trailContent,
        description: parsed.trailDescription,
        language: parsed.trailLanguage,
        userId: client.id,
      });
      return NextResponse.json(
        {
          data,
        },
        { status: 201, statusText: "ok" },
      );
    } catch (error) {
      console.log(error);
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
