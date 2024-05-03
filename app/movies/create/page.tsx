import { Metadata } from "next";

import { MovieForm } from "@/app/ui/movies/movie-form";

export const metadata: Metadata = {
  title: "Create movie",
};

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <MovieForm />
    </main>
  );
}
