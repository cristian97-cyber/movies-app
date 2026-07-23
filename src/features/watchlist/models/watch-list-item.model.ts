import type { TmdbMediaType } from "../../../apis/tmdb/types/tmdb-media.type.ts";

export interface WatchListItemModel {
  id: number;
  mediaType: TmdbMediaType;
  title: string;
  posterPath: string | null;
  releaseYear: string;
  rating: number;
}
