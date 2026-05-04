export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: SpotifyImage[];
  tracks: {
    items: SpotifyPlaylistTrack[];
    total: number;
  };
  owner: {
    display_name: string;
  };
}

export interface AudioFeatures {
  id: string;
  energy: number;
  valence: number;
  acousticness: number;
  danceability: number;
  tempo: number;
  speechiness: number;
  instrumentalness: number;
}

export interface CategorizedSong {
  track: SpotifyTrack;
  features: AudioFeatures;
  category: SongCategory;
}

export type SongCategory =
  | "Chill / Lofi"
  | "Hype / Hype"
  | "Sad / Dark"
  | "Indie / Mellow"
  | "Happy / Feel Good"
  | "Party"
  | "Focus / Instrumental"
  | "Uncategorized";

export interface CategoryGroup {
  category: SongCategory;
  songs: CategorizedSong[];
  color: string;
  emoji: string;
}
