import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type MetadataItemProps = {
  icon: ReactNode;
  label: string;
};

export function MetadataItem({ icon, label }: MetadataItemProps) {
  return (
    <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
      {icon}
      <Typography component="span" variant="body1">
        {label}
      </Typography>
    </Box>
  );
}
