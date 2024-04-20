"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Genre } from "@/app/lib/data";
import { PersonFormState, PersonFields, PersonSchema } from "./model";

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  poster_image_url: z.string(),
  release_date: z.string(),
  genre: z.nativeEnum(Genre),
  director_id: z.string({
    invalid_type_error: "Please select a director.",
  }),
  script_writer_id: z.string({
    invalid_type_error: "Please select a script writer.",
  }),
  rating: z.coerce.number().gte(0).lte(10),
  actors_ids: z
    .string({
      invalid_type_error: "Please select an actor.",
    })
    .array(),
});

const CreateMovie = FormSchema.omit({ id: true });

export async function createMovie(prevState: State, formData: FormData) {
  console.log("formData", formData);

  const validatedFields = CreateMovie.safeParse({
    title: formData.get("title"),
    poster_image_url: formData.get("poster-image-url"),
    release_date: formData.get("release-date"),
    genre: formData.get("genre"),
    director_id: formData.get("director-id"),
    script_writer_id: formData.get("script-writer-id"),
    rating: formData.get("rating"),
    actors_ids: formData.getAll("actor-id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const {
    title,
    poster_image_url,
    release_date,
    genre,
    director_id,
    script_writer_id,
    rating,
    actors_ids,
  } = validatedFields.data;

  try {
    const movieDataResult = await sql<{ id: string }>`
      INSERT INTO movies (title, poster_image_url, release_date, genre, director_id, scriptwriter_id, rating)
      VALUES (${title}, ${poster_image_url}, ${release_date}, ${genre}, ${director_id}, ${script_writer_id}, ${rating})
      RETURNING id;
    `;

    const movieId = movieDataResult.rows[0].id;

    actors_ids.forEach(async (id) => {
      await sql`
      INSERT INTO movies_persons_item (person_id, movie_id)
      VALUES (${id}, ${movieId})
    `;
    });
  } catch (error) {
    console.log("Database insert did not work", error);
  }

  revalidatePath("/movies");
  redirect("/movies");

  return prevState;
}

export async function createPerson(
  _: PersonFormState,
  formData: FormData
): Promise<PersonFormState> {
  const validatedFields = PersonSchema.safeParse({
    [PersonFields.first_name]: formData.get(PersonFields.first_name),
    [PersonFields.last_name]: formData.get(PersonFields.last_name),
    [PersonFields.photo_url]: formData.get(PersonFields.photo_url),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create person.",
    };
  }

  const { first_name, last_name, photo_url } = validatedFields.data;

  try {
    await sql<{ id: string }>`
      INSERT INTO person (id, first_name, last_name, photo_url)
      VALUES (gen_random_uuid(), ${first_name}, ${last_name}, ${photo_url})
      RETURNING id;
    `;
  } catch (error) {
    console.log("Database insert did not work", error);
  }

  revalidatePath("/people");
  redirect("/people");
}

export async function editPerson(
  { id }: PersonFormState,
  formData: FormData
): Promise<PersonFormState> {
  const validatedFields = PersonSchema.safeParse({
    [PersonFields.first_name]: formData.get(PersonFields.first_name),
    [PersonFields.last_name]: formData.get(PersonFields.last_name),
    [PersonFields.photo_url]: formData.get(PersonFields.photo_url),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create person.",
    };
  }

  const { first_name, last_name, photo_url } = validatedFields.data;

  try {
    await sql`
      UPDATE person
      SET
        first_name = ${first_name},
        last_name = ${last_name},
        photo_url = ${photo_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("Database update did not work", error);
  }

  revalidatePath("/people");
  redirect("/people");
}

type DeletePersonState = { id: string };
export async function deletePerson(
  { id }: DeletePersonState,
  _: FormData
): Promise<DeletePersonState> {
  try {
    await sql`
    DELETE FROM person
    WHERE id = ${id}; 
`;
  } catch (error) {
    console.log("Database delete did not work", error);
  }

  revalidatePath("/people");
  redirect("/people");
}
