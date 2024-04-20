import { useFormState } from "react-dom";
import { Metadata } from "next";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/app/ui/button";
import { Form } from "@/app/ui/create-form";

export const metadata: Metadata = {
  title: "Create movie",
};

export default async function Page() {
  // const directors = await fetchDirectors();
  // const scriptWriters = await fetchScriptWriters();
  // const actors = await fetchActors();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <Form
        actors={actors}
        directors={directors}
        scriptWriters={scriptWriters}
      /> */}
    </main>
  );
}
