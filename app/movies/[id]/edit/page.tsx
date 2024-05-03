import { Metadata } from "next";
import { fetchMovie } from "@/app/lib/data";
import { MovieForm } from "@/app/ui/movies/movie-form";

export const metadata: Metadata = {
  title: "Edit movie",
};

export default async function Page({ params }: { params: { id: string } }) {
  const movie = await fetchMovie(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MovieForm {...movie} />
    </main>
  );
}
