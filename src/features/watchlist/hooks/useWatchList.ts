import { useContext } from "react";

import { WatchListContext } from "../contexts/WatchListContext.ts";

export function useWatchList() {
  const context = useContext(WatchListContext);

  if (!context) {
    throw new Error(
      "useWatchList deve essere usato all'interno di WatchListProvider",
    );
  }

  return context;
}
