import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

type MediaTrailerProps = {
  open: boolean;
  title: string;
  trailerUrl: string | null;
  onClose: () => void;
};

export function MediaTrailer({
  onClose,
  open,
  title,
  trailerUrl,
}: MediaTrailerProps) {
  return (
    <Dialog
      aria-labelledby="media-trailer-title"
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open && trailerUrl !== null}
    >
      <DialogTitle id="media-trailer-title" sx={{ pr: 7 }}>
        Trailer di {title}
      </DialogTitle>
      <IconButton
        aria-label="Chiudi il trailer"
        onClick={onClose}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ bgcolor: "common.black", p: 0 }}>
        <Box sx={{ aspectRatio: "16 / 9", width: "100%" }}>
          {open && trailerUrl ? (
            <Box
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              component="iframe"
              referrerPolicy="strict-origin-when-cross-origin"
              src={trailerUrl}
              sx={{
                border: 0,
                display: "block",
                height: "100%",
                width: "100%",
              }}
              title={`Trailer di ${title}`}
            />
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
