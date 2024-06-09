import { NextRequest, NextResponse } from "next/server";
import { getTrailsByCollectionSlug } from "@repo/db";
import {
  handleApiError,
  hanldeInternalServerError,
  withApiClient,
} from "../../../lib/api";
import { TApiClient } from "@repo/db/types";
import { EApiError } from "@repo/types";

export const GET = withApiClient(
  async (req: NextRequest, client: TApiClient) => {
    const collectionName = req.nextUrl.searchParams.get("collection-slug");
    const collectionSlug = `${client.username}:${collectionName}`;

    try {
      const trails = await getTrailsByCollectionSlug({
        userId: client.id,
        userName: client.username!,
        collectionSlug: collectionSlug!,
      });

      return NextResponse.json(
        {
          data: trails.data,
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
