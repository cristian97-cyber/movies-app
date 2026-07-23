import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Avatar, Box, Typography } from "@mui/material";

import type { CastMemberModel } from "../models/cast-member.model.ts";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

type CastMemberProps = {
  member: CastMemberModel;
};

export function CastMember({ member }: CastMemberProps) {
  const profileUrl = member.profilePath
    ? `${TMDB_IMAGE_BASE_URL}/w185${member.profilePath}`
    : undefined;

  return (
    <Box
      component="li"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        textAlign: "center",
      }}
    >
      <Avatar
        alt={profileUrl ? `Foto di ${member.name}` : undefined}
        src={profileUrl}
        sx={{
          bgcolor: "rgba(0, 184, 169, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          color: "secondary.light",
          height: { xs: 88, sm: 104 },
          width: { xs: 88, sm: 104 },
        }}
      >
        <PersonOutlinedIcon sx={{ fontSize: 42 }} />
      </Avatar>

      <Typography
        sx={{
          fontWeight: 700,
          lineHeight: 1.3,
          mt: 1.5,
          overflowWrap: "anywhere",
        }}
        variant="body2"
      >
        {member.name}
      </Typography>

      {member.character ? (
        <Typography
          color="text.secondary"
          sx={{ lineHeight: 1.3, mt: 0.5, overflowWrap: "anywhere" }}
          variant="caption"
        >
          {member.character}
        </Typography>
      ) : null}
    </Box>
  );
}
