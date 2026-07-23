import type { WatchListItemModel } from "../models/watch-list-item.model.ts";
import {
  INITIAL_WATCH_LIST_STATE,
  type WatchListState,
} from "../reducers/watch-list.reducer.ts";

const WATCH_LIST_STORAGE_KEY = import.meta.env.VITE_WATCH_LIST_STORAGE_KEY;

type StoredWatchList = {
  items: WatchListItemModel[];
};

export function loadWatchList(): WatchListState {
  try {
    const storedValue = window.localStorage.getItem(WATCH_LIST_STORAGE_KEY);

    if (!storedValue) {
      return INITIAL_WATCH_LIST_STATE;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (
      parsedValue === null ||
      typeof parsedValue !== "object" ||
      !("items" in parsedValue)
    ) {
      return INITIAL_WATCH_LIST_STATE;
    }

    const storedItems = (parsedValue as { items: unknown }).items;

    if (!Array.isArray(storedItems)) {
      return INITIAL_WATCH_LIST_STATE;
    }

    return {
      items: storedItems,
    };
  } catch {
    return INITIAL_WATCH_LIST_STATE;
  }
}

export function saveWatchList(items: WatchListItemModel[]): void {
  const valueToStore: StoredWatchList = { items };

  window.localStorage.setItem(
    WATCH_LIST_STORAGE_KEY,
    JSON.stringify(valueToStore),
  );
}
