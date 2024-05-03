"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Genre } from "@/app/lib/data";
import { createMovie, editMovie } from "@/app/lib/movie/movie.actions";
import { Button } from "@/app/ui/button";
import { MovieFields as f } from "@/app/lib/movie/movie.types";
import { EditMovieType } from "@/app/lib/movie/movie.types";
import { format } from "date-fns";
import { Checkbox } from "@material-tailwind/react";

export function MovieForm({
  id,
  title,
  description,
  poster_url,
  release_date,
  genres,
  rating,
}: Partial<EditMovieType>) {
  const [state, dispatch] = useFormState(id ? editMovie : createMovie, {
    message: null,
    errors: {},
    id,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <form action={dispatch}>
        {/* Movie title */}
        <div className="mb-4">
          <label htmlFor={f.title} className="mb-2 block text-sm font-medium">
            Insert movie title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.title}
                name={f.title}
                type="text"
                placeholder="Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                defaultValue={title}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Movie description */}
        <div className="mb-4">
          <label
            htmlFor={f.description}
            className="mb-2 block text-sm font-medium"
          >
            Insert movie description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id={f.description}
                name={f.description}
                placeholder="Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
                defaultValue={description}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Movie poster image url */}
        <div className="mb-4">
          <label
            htmlFor={f.poster_url}
            className="mb-2 block text-sm font-medium"
          >
            Insert poster image url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.poster_url}
                name={f.poster_url}
                type="text"
                placeholder="Poster image url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="poster-image-url-error"
                defaultValue={poster_url}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div
            id="poster-image-url-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors.poster_url &&
              state.errors.poster_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
                id={f.release_date}
                name={f.release_date}
                type="date"
                placeholder="Release date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="release-date-error"
                defaultValue={
                  release_date ? format(release_date, "yyyy-MM-dd") : ""
                }
              />
            </div>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="release-date-error" aria-live="polite" aria-atomic="true">
            {state.errors.release_date &&
              state.errors.release_date.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Movie rating */}
        <div className="mb-4">
          <label htmlFor={f.rating} className="mb-2 block text-sm font-medium">
            Choose a rating
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={f.rating}
                name={f.rating}
                type="number"
                step="1"
                placeholder="Enter rating from 0 to 10"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="rating-error"
                max={10}
                min={1}
                maxLength={1}
                defaultValue={rating}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="rating-error" aria-live="polite" aria-atomic="true">
            {state.errors.rating &&
              state.errors.rating.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Movie genres */}
        <div className="mb-4 relative mt-2 rounded-md flex flex-col">
          {Object.values(Genre).map((g) => (
            <Checkbox
              key={g}
              name="genres"
              crossOrigin="true"
              label={g}
              value={g}
              defaultChecked={genres?.includes(g)}
            ></Checkbox>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/movies"
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
