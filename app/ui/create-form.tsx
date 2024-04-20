"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Person, Movie, Genre } from "@/app/lib/data";
import { createMovie } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";

export type FormProps = {
  directors: Person[];
  scriptWriters: Person[];
  actors: Person[];
};

export function Form({ directors, scriptWriters, actors }: FormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMovie, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <form action={dispatch}>
        {/* Movie title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Insert movie title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter movie title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie poster image url */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Insert poster image url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="poster-image-url"
                name="poster-image-url"
                type="text"
                placeholder="Enter poster image url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="poster-image-url-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div
            id="poster-image-url-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie release date */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Insert release date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="release-date"
                name="release-date"
                type="date"
                placeholder="Enter release date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="release-date-error"
              />
            </div>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="release-date-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie genre */}
        <div className="mb-4">
          <label htmlFor="genre" className="mb-2 block text-sm font-medium">
            Choose genre
          </label>
          <div className="relative">
            <select
              id="genre"
              name="genre"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="genre-error"
            >
              <option value="" disabled>
                Select a genre
              </option>
              {Object.values(Genre).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="genre-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie director */}
        <div className="mb-4">
          <label htmlFor="director" className="mb-2 block text-sm font-medium">
            Choose director
          </label>
          <div className="relative">
            <select
              id="director"
              name="director-id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="director-id-error"
            >
              <option value="" disabled>
                Select a director
              </option>
              {directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {`${director.first_name} ${director.last_name}`}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="director-id-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie scriptwriter */}
        <div className="mb-4">
          <label
            htmlFor="script-writer"
            className="mb-2 block text-sm font-medium"
          >
            Choose script writer
          </label>
          <div className="relative">
            <select
              id="script-writer"
              name="script-writer-id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="script-writer-id-error"
            >
              <option value="" disabled>
                Select a script writer
              </option>
              {scriptWriters.map((writer) => (
                <option key={writer.id} value={writer.id}>
                  {`${writer.first_name} ${writer.last_name}`}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div
            id="script-writer-id-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="mb-2 block text-sm font-medium">
            Choose a rating
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.01"
                placeholder="Enter rating from 0 to 10"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="rating-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="rating-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Movie actors */}
        <div className="mb-4">
          <label htmlFor="actor" className="mb-2 block text-sm font-medium">
            Choose actors
          </label>
          <div className="relative">
            <select
              id="actor"
              multiple
              name="actor-id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="actor-id-error"
            >
              <option value="" disabled>
                Select actors
              </option>
              {actors.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {`${actor.first_name} ${actor.last_name}`}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="actor-id-error" aria-live="polite" aria-atomic="true">
            {/* {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/movies"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create movie</Button>
        </div>
      </form>
    </main>
  );
}
