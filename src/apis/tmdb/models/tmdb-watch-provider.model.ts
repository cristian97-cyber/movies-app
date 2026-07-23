export interface TmdbWatchProvidersResponseModel {
  results: Record<string, TmdbWatchProvidersByCountryModel>;
}

export interface TmdbWatchProvidersByCountryModel {
  link: string;
  flatrate?: TmdbWatchProviderModel[];
  rent?: TmdbWatchProviderModel[];
  buy?: TmdbWatchProviderModel[];
  free?: TmdbWatchProviderModel[];
  ads?: TmdbWatchProviderModel[];
}

export interface TmdbWatchProviderModel {
  provider_id: number;
  provider_name: string;
  display_priority: number;
  logo_path: string;
}
