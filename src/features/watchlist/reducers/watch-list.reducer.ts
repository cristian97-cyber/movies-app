import type { WatchListItemModel } from "../models/watch-list-item.model.ts";
import type { TmdbMediaType } from "../../../apis/tmdb/types/tmdb-media.type.ts";

export interface WatchListState {
  items: WatchListItemModel[];
}

export type WatchListAction =
  | { type: "add"; item: WatchListItemModel }
  | {
      type: "remove";
      id: number;
      mediaType: TmdbMediaType;
    }
  | { type: "toggle"; item: WatchListItemModel }
  | { type: "clear" };

export const INITIAL_WATCH_LIST_STATE: WatchListState = {
  items: [],
};

export function watchListReducer(
  state: WatchListState,
  action: WatchListAction,
): WatchListState {
  switch (action.type) {
    case "add": {
      const alreadyExists = state.items.some(
        (item) => item.id === action.item.id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.item],
      };
    }

    case "remove": {
      const filteredItems = state.items.filter((item) => item.id !== action.id);

      if (filteredItems.length === state.items.length) {
        return state;
      }

      return {
        ...state,
        items: filteredItems,
      };
    }

    case "toggle": {
      const alreadyExists = state.items.some(
        (item) => item.id === action.item.id,
      );

      if (alreadyExists) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.item.id),
        };
      }

      return {
        ...state,
        items: [...state.items, action.item],
      };
    }

    case "clear": {
      if (state.items.length === 0) {
        return state;
      }

      return INITIAL_WATCH_LIST_STATE;
    }

    default: {
      return state;
    }
  }
}
