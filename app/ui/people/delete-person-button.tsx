"use client";
import { deletePerson } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

type DeletePersonButtonType = { id: string };
export const DeletePersonButton = ({ id }: DeletePersonButtonType) => {
  const [_, dispatch] = useFormState(deletePerson, {
    id,
  });

  return (
    <form action={dispatch}>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Delete</span>{" "}
          <TrashIcon className="h-5 md:ml-4" />
        </Button>
      </div>
    </form>
  );
};
