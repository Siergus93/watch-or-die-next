import { Metadata } from "next";
import { fetchMovies } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Movies page",
};

export default async function Page() {
  const initialMovies = await fetchMovies();
  const movies = [...initialMovies, ...initialMovies, ...initialMovies];
  console.log("movies", movies);
  console.log(
    "movies[0].release_date",
    movies[0].release_date.getUTCFullYear()
  );

  return (
    <main>
      <p>Movies page</p>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {movies.map((movie) => (
              <div key={movie.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={movie.poster_image_url}
                    alt={movie.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={movie.poster_image_url}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {movie.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {movie.release_date.getUTCFullYear()} - Horror
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">8.4/10</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// INSERT INTO movies (id, title, poster_image_url, release_date)
// VALUES ('959a1856-2af2-446a-a06e-a9bfc08ff01e', 'Batman begins', 'https://fwcdn.pl/fpo/63/76/106376/7115941.3.jpg', TO_DATE('31/05/2005', 'DD/MM/YYYY'))
// ON CONFLICT (id) DO NOTHING;
