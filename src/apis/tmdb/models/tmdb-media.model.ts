export interface TmdbMediaModel {
  id: number;
  overview: string;
  original_language: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}
