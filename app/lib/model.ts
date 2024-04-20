import { z } from "zod";

export const PersonFields = {
  id: "id",
  first_name: "first_name",
  last_name: "last_name",
  photo_url: "photo_url",
} as const;

export const PersonSchema = z.object({
  [PersonFields.first_name]: z.string(),
  [PersonFields.last_name]: z.string(),
  [PersonFields.photo_url]: z.string(),
});

export type CreatePersonType = z.infer<typeof PersonSchema>;
export type EditPersonType = z.infer<typeof PersonSchema> & { id: string };

export type PersonFormState = {
  id?: string;
  message: string | null;
  errors: {
    [PersonFields.first_name]?: string[];
    [PersonFields.last_name]?: string[];
    [PersonFields.photo_url]?: string[];
  };
};
