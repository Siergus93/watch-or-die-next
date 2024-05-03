import { Metadata } from "next";
import { fetchMovies } from "@/app/lib/data";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Search from "@/app/ui/search";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Movies page",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const movies = await fetchMovies(query);

  return (
    <div className="w-full">
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex w-full items-center justify-between">
              <h1 className={`text-2xl`}>Movies</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Search movies..." />
              <Link
                href="/movies/create"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span className="hidden md:block">Create movie</span>{" "}
                <PlusIcon className="h-5 md:ml-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {movies.map((movie) => (
                <div key={movie.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Link
                      href={`/dashboard/movies/${movie.id}`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={`/movies/${movie.id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {movie.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {movie.release_date.getUTCFullYear()} -{" "}
                        {movie.genres.join(", ")}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {movie.rating}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
