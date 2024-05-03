import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

// const movie = {
//   poster_image_url:
//     "https://www.impericon.com/media/catalog/product/f/p/fp2658-lotr-fellowship-of-the-ring_lg.jpg",
//   title: "Lord of the Rings The Fellowship of the Ring",
//   description:
//     "An ancient Ring thought lost for centuries has been found, and through a strange twist of fate has been given to a small Hobbit named Frodo.",
//   release_date: new Date(2001, 11, 10),
//   rating: 8.9,
//   cast: [
//     { role: "Director", name: "Peter Jackson" },
//     { role: "Screenwriter", name: "Fran Walsh" },
//     { role: "Frodo Baggins", name: "Elijah Wood I" },
//     { role: 'Samwise "Sam" Gamgee', name: "Sean Astin" },
//     { role: "Aragorn", name: "Viggo Mortensen" },
//     { role: "Gandalf", name: "Ian McKellen" },
//   ],
//   genres: ["action", "fantasy"],
// };

export type MovieRaw = {
  id: string;
  title: string;
  poster_url: string;
  release_date: Date;
  genres: string;
  rating: number;
  description: string;
  roles: { role: string; name: string }[];
};

export type Movie2 = {
  id: string;
  title: string;
  poster_url: string;
  release_date: Date;
  genres: Genre[];
  rating: number;
  description: string;
  roles: { role: string; name: string }[];
};

//MOVIE
//- id
//- title
//- poster
//- rating
//- release date
//- genres -> movie-genres

//MOVE-GENRES
//id
//movie-id
//genre

//MOVIE-ROLE
//- id
//- movie-id
//- role
//- person-id

//Person
//- id
//- first name
//- last name
//- photo-url
//- proffessions -> person-proffesion

//Person-Proffesion
//- id
//- person-id
//- proffesion

export type Movie = {
  id: string;
  title: string;
  poster_image_url: string;
  release_date: Date;
  genre: Genre;
  director: string; //director_id
  screenwriter: string; //screenwriter_id
  rating: number;
  actors: string[]; // [actor_id, actor_id, ...]
  //add movie description field
  //many directors?
  //many screenwriters - person's role per movie? And one person can has different roles in single movie
};

export enum Genre {
  horror = "horror",
  thriller = "thriller",
  comedy = "comedy",
  science_finction = "science_fiction",
  fantasy = "fantasy",
  action = "action",
  romance = "romance",
  adventure = "adventure",
}

export type Person = {
  id: string;
  first_name: string;
  last_name: string;
  photo_url: string;
};

export enum Role {
  actor = "actor",
  director = "director",
  scriptwriter = "scriptwriter",
}

export async function fetchMovies(query: string): Promise<Movie2[]> {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<MovieRaw>`
    SELECT m.*, (SELECT STRING_AGG (genre,',') genres FROM movie_genre mg where mg.movie_id = m.id)
    FROM movie m
    WHERE 
      title ILIKE ${`%${query}%`}
    `;

    const rows = data.rows.map((r) => {
      return {
        ...r,
        genres: r.genres.split(",") as Genre[],
      } as Movie2;
    });

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchMovie(id: string) {
  noStore();
  try {
    const data = await sql<Movie2>`
      SELECT m.*, (SELECT STRING_AGG (genre,',') genres FROM movie_genre mg where mg.movie_id = m.id)
      FROM movie m
      WHERE 
        id = ${id}
      `;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchPeople(query: string): Promise<Person[]> {
  noStore();
  try {
    const data = await sql<Person>`SELECT *
      FROM person
      WHERE 
        first_name ILIKE ${`%${query}%`} OR
        last_name ILIKE ${`%${query}%`}
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch people data.");
  }
}

export async function fetchPerson(id: string): Promise<Person | null> {
  noStore();
  try {
    const data = await sql<Person>`SELECT *
      FROM person
      WHERE 
        id = ${id}
      `;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch person data.");
  }
}
