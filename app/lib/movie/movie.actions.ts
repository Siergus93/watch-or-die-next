"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MovieFields, MovieFormState, MovieSchema } from "./movie.types";

const parseFormValueIntoDate = (v: FormDataEntryValue | null) => {
  if (typeof v === "string") {
    return new Date(v);
  }
  return null;
};

export async function createMovie(
  _: MovieFormState,
  formData: FormData
): Promise<MovieFormState> {
  const dataFromForm = {
    [MovieFields.title]: formData.get(MovieFields.title),
    [MovieFields.description]: formData.get(MovieFields.description),
    [MovieFields.poster_url]: formData.get(MovieFields.poster_url),
    [MovieFields.release_date]: formData.get(MovieFields.release_date),
    [MovieFields.rating]: formData.get(MovieFields.rating),
    [MovieFields.genres]: formData.getAll(MovieFields.genres),
  };

  const parsedData = {
    ...dataFromForm,
    [MovieFields.release_date]: parseFormValueIntoDate(
      dataFromForm[MovieFields.release_date]
    ),
  };

  const validatedFields = MovieSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create person.",
    };
  }

  const { title, poster_url, rating, release_date, description, genres } =
    validatedFields.data;

  try {
    const movieResult = await sql<{ id: string }>`
      INSERT INTO movie (id, title, poster_url, rating, release_date, description)
      VALUES (gen_random_uuid(), ${title}, ${poster_url}, ${rating}, ${
        release_date ? release_date.toISOString() : release_date
      }, ${description})
      RETURNING id;
    `;

    const movie_id = movieResult.rowCount > 0 ? movieResult.rows[0].id : null;

    if (movie_id) {
      genres.forEach(async (g) => {
        await sql`
          INSERT INTO movie_genre (id, movie_id, genre)
          VALUES
              (gen_random_uuid(), ${movie_id}, ${g})
      `;
      });
    }
  } catch (error) {
    console.log("Database insert did not work", error);
  }

  revalidatePath("/movies");
  redirect("/movies");
}

export async function editMovie(
  { id }: MovieFormState,
  formData: FormData
): Promise<MovieFormState> {
  const dataFromForm = {
    [MovieFields.title]: formData.get(MovieFields.title),
    [MovieFields.description]: formData.get(MovieFields.description),
    [MovieFields.poster_url]: formData.get(MovieFields.poster_url),
    [MovieFields.release_date]: formData.get(MovieFields.release_date),
    [MovieFields.rating]: formData.get(MovieFields.rating),
    [MovieFields.genres]: formData.getAll(MovieFields.genres),
  };

  const parsedData = {
    ...dataFromForm,
    [MovieFields.release_date]: parseFormValueIntoDate(
      dataFromForm[MovieFields.release_date]
    ),
  };

  const validatedFields = MovieSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create person.",
    };
  }

  console.log("validatedFields.data", validatedFields.data, "id", id);

  const { title, poster_url, rating, release_date, description, genres } =
    validatedFields.data;

  try {
    await sql`
      UPDATE movie
      SET
        title = ${title},
        poster_url = ${poster_url},
        rating = ${rating},
        release_date = ${release_date ? release_date.toISOString() : null},
        description = ${description}
      WHERE id = ${id}
    `;

    await sql`
      DELETE FROM movie_genre
      WHERE movie_id = ${id}
    `;

    genres.forEach(async (g) => {
      await sql`
        INSERT INTO movie_genre (id, movie_id, genre)
        VALUES
            (gen_random_uuid(), ${id}, ${g})`;
    });
  } catch (error) {
    console.log("Database update did not work", error);
  }

  revalidatePath("/movies");
  redirect("/movies");
}

type DeleteMovieState = { id: string };
export async function deleteMovie(
  { id }: DeleteMovieState,
  _: FormData
): Promise<DeleteMovieState> {
  try {
    await sql`
      DELETE FROM movie_genre
      WHERE movie_id = ${id}
    `;

    await sql`
      DELETE FROM movie
      WHERE id = ${id};
    `;
  } catch (error) {
    console.log("Database delete did not work", error);
  }

  revalidatePath("/movies");
  redirect("/movies");
}
