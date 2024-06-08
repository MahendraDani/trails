"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  createCollectionAction,
  ICreateCollectionPrevState,
} from "../actions/collections";
import { useEffect } from "react";
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";

export const CreateCollectionForm = () => {
  const pathname = usePathname();

  const initState: ICreateCollectionPrevState = {
    message: "",
    code: "",
    statusCode: 0,
  };

  const [formstate, formAction] = useFormState(
    createCollectionAction,
    initState,
  );

  useEffect(() => {
    if (formstate.statusCode === 200) {
      redirect(`./${pathname}`);
    }
  }, [formstate.statusCode]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <form action={formAction}>
        <h2 className="text-xl font-semibold mb-4">Create Collection</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="block w-full h-20 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <CreateCollectionButton />
          <Link href={pathname}>
            <button
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md ml-2"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

function CreateCollectionButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="bg-black hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md"
    >
      {pending ? <SpinnerOutline /> : "Create"}
    </Button>
  );
}

export default CreateCollectionForm;
