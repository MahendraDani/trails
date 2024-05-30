import { NextRequest, NextResponse } from "next/server";
import { withApiClient } from "../../../lib/api";
import { TUserWithSessionAndAccount } from "@repo/db/types";

// get user
export const GET = withApiClient(
  async (
    req: NextRequest,
    client: TUserWithSessionAndAccount,
  ): Promise<NextResponse> => {
    // Your route logic here
    return NextResponse.json(
      {
        user: {
          id: client.id,
          name: client.name,
          email: client.email,
          username: client.username,
          avatarUrl: client.avatarUrl,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
          provider: client.account?.provider,
        },
      },
      { status: 200, statusText: "ok" },
    );
  },
);
