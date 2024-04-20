import { Metadata } from "next";
import { fetchPerson } from "@/app/lib/data";
import { PersonForm } from "@/app/ui/people/person-form";

export const metadata: Metadata = {
  title: "Edit person",
};

export default async function Page({ params }: { params: { id: string } }) {
  const person = await fetchPerson(params.id);

  //add loading when not fetched

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {person && <PersonForm {...person} />}
    </main>
  );
}
