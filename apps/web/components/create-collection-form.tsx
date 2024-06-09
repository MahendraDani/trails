"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  createCollectionAction,
  ICreateCollectionPrevState,
} from "../actions/collections";
import { useFormState, useFormStatus } from "react-dom";
import { SpinnerOutline } from "@repo/ui/components/utils/spinner";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

const initState: ICreateCollectionPrevState = {
  message: "",
  code: "",
  statusCode: 0,
};

export function CreateCollectionModal() {
  const pathname = usePathname();

  const [formstate, formAction] = useFormState(
    createCollectionAction,
    initState,
  );

  useEffect(() => {
    console.log(formstate.statusCode);
    if (formstate.statusCode === 200) {
      redirect(`./${pathname}`);
    }
  }, [formstate.statusCode]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-12" variant="outline">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Collection</DialogTitle>
          <DialogDescription>
            Add details for your new collection. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Collection name..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                name="description"
                placeholder="Collection description..."
                className="col-span-3"
              />
            </div>
            <CreateCollectionButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateCollectionButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">{pending ? <SpinnerOutline /> : "Create"}</Button>
  );
}
