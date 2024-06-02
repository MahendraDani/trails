"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import deleteCollectionAction, {
  IDeleteCollectionPrevState,
} from "../actions/collections";
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// id -> collection_id
export const DeleteCollectionForm = ({ id }: { id: string }) => {
  const init: IDeleteCollectionPrevState = {
    message: "",
    code: "",
    statusCode: 0,
  };

  const [formstate, formAction] = useFormState(deleteCollectionAction, init);
  const router = useRouter();

  useEffect(() => {
    if (formstate.statusCode === 200) {
      router.refresh();
    } else {
      toast.error("OOps, error deleting the collection");
    }
  }, [formstate.statusCode]);
  return (
    <form action={formAction} className="flex justify-end">
      <input name="collection_id" className="hidden" defaultValue={id} />
      <DeleteCollectionButton />
    </form>
  );
};

export default function DeleteCollectionButton() {
  const { pending, data } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex justify-center items-center"
    >
      {!pending ? "Delete" : <SpinnerOutline />}
    </Button>
  );
}
