import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export type Movie = {
  id: string;
  title: string;
  poster_image_url: string;
  release_date: Date;
};

export async function fetchMovies() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    const data = await sql<Movie>`SELECT * FROM movies`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
