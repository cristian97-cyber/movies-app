import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { TmdbMediaType } from "../../../apis/tmdb/types/tmdb-media.type.ts";
import { WatchListContext } from "../contexts/WatchListContext.ts";
import { toWatchListItem } from "../mappers/watch-list.mapper.ts";
import type { WatchListItemModel } from "../models/watch-list-item.model.ts";
import {
  INITIAL_WATCH_LIST_STATE,
  watchListReducer,
} from "../reducers/watch-list.reducer.ts";
import { loadWatchList, saveWatchList } from "../storage/watch-list.storage.ts";

type WatchListProviderProps = {
  children: ReactNode;
};

export function WatchListProvider({ children }: WatchListProviderProps) {
  const [state, dispatch] = useReducer(
    watchListReducer,
    INITIAL_WATCH_LIST_STATE,
    loadWatchList,
  );

  useEffect(() => {
    saveWatchList(state.items);
  }, [state.items]);

  const add = useCallback((media: WatchListItemModel) => {
    dispatch({ type: "add", item: toWatchListItem(media) });
  }, []);

  const remove = useCallback((id: number, mediaType: TmdbMediaType) => {
    dispatch({ type: "remove", id, mediaType });
  }, []);

  const toggle = useCallback((media: WatchListItemModel) => {
    dispatch({ type: "toggle", item: toWatchListItem(media) });
  }, []);

  const contains = useCallback(
    (id: number, mediaType: TmdbMediaType) =>
      state.items.some(
        (item) => item.id === id && item.mediaType === mediaType,
      ),
    [state.items],
  );

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const contextValue = useMemo(
    () => ({
      items: state.items,
      count: state.items.length,
      add,
      remove,
      toggle,
      contains,
      clear,
    }),
    [state.items, add, remove, toggle, contains, clear],
  );

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}
