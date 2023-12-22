import { Metadata } from "next";
import { fetchMovies } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Movies page",
};

export default async function Page() {
  const movies = await fetchMovies();
  console.log(movies);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Movies page</p>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <p>{movie.title}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

// INSERT INTO movies (id, title, poster_image_url, release_date)
// VALUES ('959a1856-2af2-446a-a06e-a9bfc08ff01e', 'Batman begins', 'https://fwcdn.pl/fpo/63/76/106376/7115941.3.jpg', TO_DATE('31/05/2005', 'DD/MM/YYYY'))
// ON CONFLICT (id) DO NOTHING;
