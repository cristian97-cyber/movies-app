import type { WatchListItemModel } from "../models/watch-list-item.model.ts";

export function toWatchListItem(media: WatchListItemModel): WatchListItemModel {
  return {
    id: media.id,
    mediaType: media.mediaType,
    title: media.title,
    posterPath: media.posterPath,
    releaseYear: media.releaseYear,
    rating: media.rating,
  };
}
