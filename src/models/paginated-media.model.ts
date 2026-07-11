import type { MediaModel } from "./media.model.ts";

export interface PaginatedMediaModel {
  page: number;
  results: MediaModel[];
  totalPages: number;
  totalResults: number;
}
