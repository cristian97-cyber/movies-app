import type { TmdbMediaType } from "../features/tmdb/types/tmdb-media.type.ts";
import type { CastMemberModel } from "./cast-member.model.ts";
import type { GenreModel } from "./genre.model.ts";
import type { PaginatedMediaModel } from "./paginated-media.model.ts";
import type { ProductionCompanyModel } from "./production-company.model.ts";

export interface MediaDetailModel {
  id: number;
  mediaType: TmdbMediaType;
  title: string;
  originalTitle: string;
  overview: string;
  tagline: string;
  originalLanguage: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  releaseYear: string;
  genres: GenreModel[];
  popularity: number;
  rating: number;
  voteCount: number;
  durationMinutes: number | null;
  status: string;
  numberOfSeasons: number | null;
  numberOfEpisodes: number | null;
  productionCompanies: ProductionCompanyModel[];
  cast: CastMemberModel[];
  recommendations: PaginatedMediaModel;
  trailer: string | null;
}
