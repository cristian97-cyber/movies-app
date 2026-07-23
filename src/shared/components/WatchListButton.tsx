import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { Button, type ButtonProps } from "@mui/material";

import { useWatchList } from "../../features/watchlist/hooks/useWatchList.ts";
import type { WatchListItemModel } from "../../features/watchlist/models/watch-list-item.model.ts";

type WatchListButtonProps = Omit<
  ButtonProps,
  "aria-label" | "aria-pressed" | "children" | "onClick" | "startIcon"
> & {
  media: WatchListItemModel;
};

export function WatchListButton({
  media,
  type = "button",
  ...buttonProps
}: WatchListButtonProps) {
  const { contains, toggle } = useWatchList();

  const isInWatchList = contains(media.id, media.mediaType);
  const actionLabel = isInWatchList ? "Rimuovi" : "Aggiungi";

  return (
    <Button
      {...buttonProps}
      variant={buttonProps.variant || isInWatchList ? "outlined" : "contained"}
      aria-label={`${actionLabel} ${media.title} ${
        isInWatchList ? "dalla" : "alla"
      } watchlist`}
      aria-pressed={isInWatchList}
      onClick={() => toggle(media)}
      startIcon={
        isInWatchList ? (
          <BookmarkRemoveOutlinedIcon />
        ) : (
          <BookmarkAddOutlinedIcon />
        )
      }
      type={type}
    >
      {actionLabel} {isInWatchList ? "dalla" : "alla"} watchlist
    </Button>
  );
}
