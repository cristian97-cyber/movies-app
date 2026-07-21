import type { PaginatedMediaModel } from "../../../models/paginated-media.model.ts";
import type { TmdbMultiSearchResponse } from "../models/tmdb-multi-search-response.model.ts";
import { mapTmdbMedia } from "./tmdb-media.mapper.ts";

export function mapTmdbMultiSearch(
  response: TmdbMultiSearchResponse,
): PaginatedMediaModel {
  return {
    page: response.page,
    results: response.results.flatMap((result) => {
      if (result.media_type === "person") return [];

      return [mapTmdbMedia(result.media_type, result)];
    }),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}
