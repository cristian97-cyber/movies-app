import type { GenreModel } from "../../../features/media/models/genre.model.ts";
import type { TmdbGenresResponseModel } from "../models/tmdb-genres-response.model.ts";

export function mapTmdbGenres(response: TmdbGenresResponseModel): GenreModel[] {
  return response.genres.map((genre) => ({
    id: genre.id,
    name: genre.name,
  }));
}
