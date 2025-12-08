export interface Resort {
  id: string;
  name: string;
  prefecture: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  ikonAccessInfo: string;
  websiteUrl: string;
  trailMapImageUrl: string;
  // Optional stats for UI display
  stats?: {
    elevation: string;
    runs: number;
    snowfall: string;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}
