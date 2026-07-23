import type { TmdbGenreModel } from "./tmdb-genre.model.ts";

export interface TmdbGenresResponseModel {
  genres: TmdbGenreModel[];
}
