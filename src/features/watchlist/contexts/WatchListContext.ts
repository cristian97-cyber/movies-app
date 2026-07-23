import { createContext } from "react";

import type { TmdbMediaType } from "../../../apis/tmdb/types/tmdb-media.type.ts";
import type { WatchListItemModel } from "../models/watch-list-item.model.ts";

export type WatchListContextValue = {
  items: WatchListItemModel[];
  count: number;
  add: (media: WatchListItemModel) => void;
  remove: (id: number, mediaType: TmdbMediaType) => void;
  toggle: (media: WatchListItemModel) => void;
  contains: (id: number, mediaType: TmdbMediaType) => boolean;
  clear: () => void;
};

export const WatchListContext = createContext<WatchListContextValue | null>(
  null,
);
