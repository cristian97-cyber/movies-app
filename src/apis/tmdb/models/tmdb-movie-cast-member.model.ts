import type { TmdbCastMemberModel } from "./tmdb-cast-member.model.ts";

export interface TmdbMovieCastMemberModel extends TmdbCastMemberModel {
  character: string;
}
