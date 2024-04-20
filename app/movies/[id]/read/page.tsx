import { Metadata } from "next";
import Image from "next/image";
import { fetchMovie } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Movie page",
};

//cast
//person = {name, role}

export default async function Page({ params }: { params: { id: string } }) {
  //const movie = await fetchMovie(params.id);
  const movie = {
    poster_image_url:
      "https://www.impericon.com/media/catalog/product/f/p/fp2658-lotr-fellowship-of-the-ring_lg.jpg",
    title: "Lord of the Rings The Fellowship of the Ring",
    description:
      "An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo.",
    release_date: new Date(2001, 11, 10),
    rating: 8.9,
    cast: [
      { role: "Director", name: "Peter Jackson" },
      { role: "Screenwriter", name: "Fran Walsh" },
      { role: "Frodo Baggins", name: "Elijah Wood I" },
      { role: 'Samwise "Sam" Gamgee', name: "Sean Astin" },
      { role: "Aragorn", name: "Viggo Mortensen" },
      { role: "Gandalf", name: "Ian McKellen" },
    ],
    genres: ["action", "fantasy"],
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <a href="#" className="group block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={movie.poster_image_url}
          alt={movie.title}
          className="h-[400px] w-full object-cover sm:h-[450px]"
        />

        <div className="mt-1.5">
          <p className="text-xs text-gray-500">
            {movie.release_date.toDateString()}
          </p>

          <div className=" flex justify-between text-sm">
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {movie.title}
            </h3>
          </div>
        </div>
      </a>

      <div className="pl-5">
        <div className="">
          <RatingStars rating={movie.rating} />
        </div>

        <p className="">Cast</p>

        <div className="flow-root px-10 pt-2">
          {movie.cast.map((c, i) => {
            return (
              <dl key={i} className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">{c.role}</dt>
                  <dd className="text-gray-700 sm:col-span-2">{c.name}</dd>
                </div>
              </dl>
            );
          })}
        </div>
      </div>
    </main>
  );
}

type RatingStarsProps = {
  rating: number;
};
const RatingStars = ({ rating }: RatingStarsProps) => {
  const yellowStarsNumber = Math.round(rating);
  const greyStarsNumber = 10 - yellowStarsNumber;

  const YellowStar = (
    <svg
      className="w-6 h-6 text-yellow-300 ms-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  const GreyStar = (
    <svg
      className="w-6 h-6 ms-1 text-gray-300 dark:text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  return (
    <div className="flex items-center">
      {[...Array(yellowStarsNumber)].map(() => YellowStar)}
      {[...Array(greyStarsNumber)].map(() => GreyStar)}
    </div>
  );
};
