"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PersonFormState, PersonFields, PersonSchema } from "./person.types";

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
