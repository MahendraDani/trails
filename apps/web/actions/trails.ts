"use server";

import { cookies } from "next/headers";

export interface ICreateCollectionPrevState {
  message: string;
  code: string;
  statusCode: number;
}

export interface IDeleteCollectionPrevState {
  message: string;
  code: string;
  statusCode: number;
}

export const createTrailAction = async (
  prevState: ICreateCollectionPrevState,
  formData: FormData,
) => {
  const trailName = formData.get("name");
  const trailDescription = formData.get("description");
  const trailContent = formData.get("content");
  const trailLanguage = formData.get("language");
  const collectionName = formData.get("collection-name");

  const token = cookies().get("next-auth.session-token")?.value;

  if (
    !token ||
    !trailName ||
    !trailDescription ||
    !trailContent ||
    !trailLanguage
  ) {
    return {
      message: "Invalid credentials",
      error: "bad_request",
    };
  }

  const res = await fetch(`http://localhost:3000/api/${collectionName}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      collectionName,
      trailName,
      trailDescription,
      trailContent,
      trailLanguage,
    }),
  });

  const response = await res.json();

  if (res.ok) {
    return {
      message: response.message,
      code: "ok",
      statusCode: 200,
    };
  }
  return response;
};
