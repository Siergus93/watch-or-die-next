import { Metadata } from "next";
import { PersonForm } from "@/app/ui/people/person-form";

export const metadata: Metadata = {
  title: "Create person",
};

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <PersonForm />;
    </main>
  );
}
