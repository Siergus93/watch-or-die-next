import { Metadata } from "next";
import { fetchPeople } from "@/app/lib/data";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Search from "@/app/ui/search";
import Link from "next/link";

export const metadata: Metadata = {
  title: "People page",
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
  const people = await fetchPeople(query);

  return (
    <div className="w-full">
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex w-full items-center justify-between">
              <h1 className={`text-2xl`}>People</h1>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              <Search placeholder="Search people..." />
              <Link
                href="/people/create"
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span className="hidden md:block">Create person</span>{" "}
                <PlusIcon className="h-5 md:ml-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {people.map((p) => (
                <div key={p.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Link
                      href={`/dashboard/people/${p.id}`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      <img
                        src={p.photo_url}
                        alt={`${p.first_name} ${p.last_name}`}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={`/people/${p.id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {`${p.first_name} ${p.last_name}`}
                        </a>
                      </h3>
                    </div>
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
