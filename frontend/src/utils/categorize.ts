import type {
  AudioFeatures,
  CategorizedSong,
  CategoryGroup,
  SongCategory,
} from "../types/spotify";

export function categorizeSong(features: AudioFeatures): SongCategory {
  const {
    energy,
    valence,
    acousticness,
    danceability,
    tempo,
    instrumentalness,
  } = features;

  if (instrumentalness > 0.7 && energy < 0.6) return "Focus / Instrumental";
  if (energy < 0.4 && acousticness > 0.6) return "Chill / Lofi";
  if (energy > 0.7 && danceability > 0.6 && tempo > 120) return "Party";
  if (energy > 0.7 && valence > 0.5) return "Hype / Hype";
  if (valence < 0.35 && energy < 0.55) return "Sad / Dark";
  if (valence > 0.7 && energy > 0.5) return "Happy / Feel Good";
  if (acousticness > 0.4 && energy < 0.65) return "Indie / Mellow";

  return "Uncategorized";
}

export const CATEGORY_META: Record<
  SongCategory,
  { color: string; emoji: string }
> = {
  "Chill / Lofi": { color: "#7EC8E3", emoji: "🌊" },
  "Hype / Hype": { color: "#FF6B6B", emoji: "🔥" },
  "Sad / Dark": { color: "#9B8EC4", emoji: "🌧️" },
  "Indie / Mellow": { color: "#95C77A", emoji: "🍃" },
  "Happy / Feel Good": { color: "#FFD166", emoji: "☀️" },
  Party: { color: "#FF9A3C", emoji: "🎉" },
  "Focus / Instrumental": { color: "#74B3CE", emoji: "🎯" },
  Uncategorized: { color: "#888888", emoji: "🎵" },
};

export function groupByCategory(songs: CategorizedSong[]): CategoryGroup[] {
  const groups: Record<string, CategorizedSong[]> = {};

  songs.forEach((song) => {
    if (!groups[song.category]) groups[song.category] = [];
    groups[song.category].push(song);
  });

  return Object.entries(groups).map(([category, songs]) => ({
    category: category as SongCategory,
    songs,
    color: CATEGORY_META[category as SongCategory].color,
    emoji: CATEGORY_META[category as SongCategory].emoji,
  }));
}

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
