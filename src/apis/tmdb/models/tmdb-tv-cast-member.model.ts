import type { TmdbCastMemberModel } from "./tmdb-cast-member.model.ts";

export interface TmdbTvCastMemberModel extends TmdbCastMemberModel {
  roles: TmdbTvCastRoleModel[];
  total_episode_count: number;
}

export interface TmdbTvCastRoleModel {
  character: string;
  credit_id: string;
  episode_count: number;
}
