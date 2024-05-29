import { NextRequest, NextResponse } from "next/server";
import {
  createCollection,
  deleteCollection, getAllCollections,
  getCollectionById,
  getCollectionOwnerById,
  getUserByUsername,
} from "@repo/db";
import { createSlug } from "../../../lib/slug";

// #get all collections of an user
export const GET = async (req: NextRequest)=>{
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if(!userId){
      return NextResponse.json(
        { error : {message : "userId is required"} },
        {
          status: 400,
          statusText: "bad_Request",
        },
      );
    }
    const collections = await getAllCollections({userId});
      return NextResponse.json({
        collections
      })

  }catch(error){
    return NextResponse.json(
      { error },
      {
        status: 500,
        statusText: "internal_server_error",
      },
    );
  }
}

// #create a new collection
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

    const { data, status, success, code, error } = await createCollection({
      name,
      description,
      userId: user.id,
      slug: `${username}:${createSlug(name.toLowerCase())}`,
    });

    return NextResponse.json(
      { data, success, error },
      { status: code, statusText: status },
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
        statusText: "internal_server_error",
      },
    );
  }
};

// #delete collection by its id
export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const username = req.nextUrl.searchParams.get("username");

    if (!id || !username) {
      return NextResponse.json(
        {
          error: "Invalid credentials. Id or username missing in search params",
        },
        {
          status: 400,
          statusText: "bas_request",
        },
      );
    }

    //  check if collection exists first
    const exists = await getCollectionById({ id });
    if (!exists.data) {
      return NextResponse.json(
        {
          error: {
            message: "Collection with given id not found",
          },
        },
        {
          status: exists.code,
          statusText: exists.status,
        },
      );
    }

    // get owner of collection
    const collection = await getCollectionOwnerById({ id });

    // validate owner
    if (username !== collection.data?.owner.username) {
      return NextResponse.json(
        {
          error: {
            message: "Collection owner and user performing action don't match",
          },
        },
        {
          status: 403,
          statusText: "forbidden",
        },
      );
    }

    // delete collection
    const deletedCollection = await deleteCollection({
      id,
    });
    return NextResponse.json(
      {
        message: "collection deleted successfully",
        data: deletedCollection.data,
      },
      {
        status: deletedCollection.code,
        statusText: deletedCollection.status,
      },
    );
  } catch (error) {
    throw new Error("OOPs, erorr deleting collection");
  }
};
