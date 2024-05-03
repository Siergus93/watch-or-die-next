import { z } from "zod";

export const MovieFields = {
  id: "id",
  title: "title",
  description: "description",
  poster_url: "poster_url",
  release_date: "release_date",
  genres: "genres",
  rating: "rating",
} as const;

export const MovieSchema = z.object({
  [MovieFields.title]: z.string(),
  [MovieFields.description]: z.string(),
  [MovieFields.poster_url]: z.string(),
  [MovieFields.release_date]: z.date().nullable(),
  [MovieFields.genres]: z.array(z.string()),
  [MovieFields.rating]: z.coerce.number().gte(0).lte(10),
});

export type CreateMovieType = z.infer<typeof MovieSchema>;
export type EditMovieType = z.infer<typeof MovieSchema> & { id: string };

export type MovieFormState = {
  id?: string;
  message: string | null;
  genres?: string[];
  errors: {
    [MovieFields.title]?: string[];
    [MovieFields.description]?: string[];
    [MovieFields.poster_url]?: string[];
    [MovieFields.release_date]?: string[];
    [MovieFields.genres]?: string[];
    [MovieFields.rating]?: string[];
  };
};
