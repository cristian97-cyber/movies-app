import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingSpinnerProps = {
  label?: string;
};

export function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 8,
      }}
    >
      <CircularProgress color="primary" />
      {label ? <Typography color="text.secondary">{label}</Typography> : null}
    </Box>
  );
}
