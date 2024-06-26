import { NextRequest, NextResponse } from "next/server";
import { db } from "@repo/db";
import { TApiClient } from "@repo/db/types";
import { EApiError } from "@repo/types";
import { ZodError } from "zod";
/*
 * 1. Get token from headers["Authorization"] => 8b883c35-688b-4aed-8980-549a50ae3e30
 * 2. Check if it exists in Session table in database and get the corresponding User details from userId field
 * 3. If the details don't exist request else return Unauthorized
 * */

export interface ICollectionPageProps {
  params: {
    collectionName: string;
  };
}

export const withApiClient =
  (handler: (req: NextRequest, client: TApiClient) => Promise<NextResponse>) =>
  async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get("Authorization");

      if (authHeader) {
        if (!authHeader.includes("Bearer ")) {
          throw new EApiError({
            message:
              "Misconfigured authorization header. Did you forget to add 'Bearer '?",
            code: "bad_request",
            statusCode: 400,
          });
        }
        const token = authHeader.split(" ")[1];
        const client = await db.user.findFirst({
          where: {
            sessions: {
              some: {
                sessionToken: token,
              },
            },
          },
          include: {
            account: true,
            sessions: true,
          },
        });

        if (!client) {
          throw new EApiError({
            message:
              "The request requires user authentication. Invalid or incorrect access token",
            code: "unauthorized",
            statusCode: 401,
          });
        }
        return handler(req, client);
      } else {
        throw new EApiError({
          message:
            "The request was invalid or cannot be surved. Authorization token is required to process the request",
          code: "bad_request",
          statusCode: 400,
        });
      }
    } catch (error) {
      if (error instanceof EApiError) {
        return handleApiError(error);
      } else {
        return hanldeInternalServerError(error);
      }
    }
  };

export const withApiCollectionIdClient =
  (
    handler: (
      req: NextRequest,
      client: TApiClient,
      collectionId: string,
    ) => Promise<NextResponse>,
  ) =>
  async (req: NextRequest, { params }: ICollectionPageProps) => {
    try {
      const authHeader = req.headers.get("Authorization");

      if (authHeader) {
        if (!authHeader.includes("Bearer ")) {
          throw new EApiError({
            message:
              "Misconfigured authorization header. Did you forget to add 'Bearer '?",
            code: "bad_request",
            statusCode: 400,
          });
        }
        const token = authHeader.split(" ")[1];
        const client = await db.user.findFirst({
          where: {
            sessions: {
              some: {
                sessionToken: token,
              },
            },
          },
          include: {
            account: true,
            sessions: true,
          },
        });

        if (!client) {
          throw new EApiError({
            message:
              "The request requires user authentication. Invalid or incorrect access token",
            code: "unauthorized",
            statusCode: 401,
          });
        }
        return handler(req, client, params.collectionName);
      } else {
        throw new EApiError({
          message:
            "The request was invalid or cannot be surved. Authorization token is required to process the request",
          code: "bad_request",
          statusCode: 400,
        });
      }
    } catch (error) {
      if (error instanceof EApiError) {
        return handleApiError(error);
      } else {
        return hanldeInternalServerError(error);
      }
    }
  };

export const handleApiError = (error: EApiError): NextResponse => {
  return NextResponse.json(
    {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
    },
    { status: error.statusCode },
  );
};

export const hanldeInternalServerError = (error: unknown): NextResponse => {
  return NextResponse.json(
    {
      statusCode: 500,
      code: "internal_server_error",
      message:
        "The server encountered an unexpected condition which prevented it from fulfilling the request",
    },
    {
      status: 500,
      statusText: "internal_server_error",
    },
  );
};

export const hanldeZodError = (error: ZodError): NextResponse => {
  return NextResponse.json(
    {
      statusCode: 400,
      code: "bad_request",
      message: "Invalid or incorrect request body",
      error: error.issues,
    },
    {
      status: 400,
      statusText: "bad_request",
    },
  );
};
