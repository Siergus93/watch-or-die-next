import { Metadata } from "next";
import { fetchPerson } from "@/app/lib/data";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { DeletePersonButton } from "@/app/ui/people/delete-person-button";

export const metadata: Metadata = {
  title: "Person page",
};

export default async function Page({ params }: { params: { id: string } }) {
  const person = await fetchPerson(params.id);

  return (
    <main className="flex flex-col items-center justify-between">
      <a href="#" className="block">
        <img
          alt={`${person?.first_name} ${person?.last_name}`}
          src={person?.photo_url}
          className="h-64 w-full object-cover sm:h-80 lg:h-96"
        />

        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
          {`${person?.first_name} ${person?.last_name}`}
        </h3>
      </a>
      <Link
        href={`/people/${params.id}/edit`}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Edit</span>{" "}
        <PencilSquareIcon className="h-5 md:ml-4" />
      </Link>
      <DeletePersonButton id={params.id} />
    </main>
  );
}
