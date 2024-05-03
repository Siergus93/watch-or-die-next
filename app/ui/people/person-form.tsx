"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  PersonFields as f,
  EditPersonType,
} from "@/app/lib/person/person.types";
import { Button } from "@/app/ui/button";
import { createPerson, editPerson } from "@/app/lib/person/person.actions";

export function PersonForm({
  id,
  first_name,
  last_name,
  photo_url,
}: Partial<EditPersonType>) {
  const [state, dispatch] = useFormState(id ? editPerson : createPerson, {
    id,
    message: null,
    errors: {},
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <form action={dispatch}>
        <div className="mb-4">
          <label
            htmlFor={f.first_name}
            className="mb-2 block text-sm font-medium"
          >
            Enter first name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.first_name}
                name={f.first_name}
                type="text"
                placeholder="Enter first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                defaultValue={first_name}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors.first_name &&
              state.errors.first_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor={f.last_name}
            className="mb-2 block text-sm font-medium"
          >
            Enter last name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.last_name}
                name={f.last_name}
                type="text"
                placeholder="Enter last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                defaultValue={last_name}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors.last_name &&
              state.errors.last_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="photo_url" className="mb-2 block text-sm font-medium">
            Enter photo url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.photo_url}
                name={f.photo_url}
                type="text"
                placeholder="Enter picture url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="poster-image-url-error"
                defaultValue={photo_url}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div
            id="poster-image-url-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.photo_url &&
              state.errors.photo_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/people"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">{id ? "Edit" : "Create"}</Button>
        </div>
      </form>
    </main>
  );
}
