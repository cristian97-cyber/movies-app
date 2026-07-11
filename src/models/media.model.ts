import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";

export interface MediaModel {
  id: number;
  mediaType: TmdbMediaType;
  title: string;
  originalTitle: string;
  overview: string;
  originalLanguage: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseYear: string;
  genreIds: number[];
  popularity: number;
  rating: number;
  voteCount: number;
}
