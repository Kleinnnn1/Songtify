import { useState } from "react";
import { getAccessToken } from "../utils/auth";
import { categorizeSong } from "../utils/categorize";
import type {
  AudioFeatures,
  CategorizedSong,
  SpotifyPlaylist,
  SpotifyTrack,
} from "../types/spotify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useSpotify() {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [categorizedSongs, setCategorizedSongs] = useState<CategorizedSong[]>(
    [],
  );
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };

  function extractPlaylistId(input: string): string | null {
    const cleaned = input.split("?")[0];
    const match = cleaned.match(/playlist\/([a-zA-Z0-9]+)/);
    if (match) return match[1];
    if (/^[a-zA-Z0-9]+$/.test(input.trim())) return input.trim();
    return null;
  }

  async function fetchAllTracks(playlistId: string): Promise<SpotifyTrack[]> {
    const tracks: SpotifyTrack[] = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `${BACKEND_URL}/spotify/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        { headers },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message ?? `Failed to fetch tracks (${res.status})`,
        );
      }

      data.items?.forEach((item: any) => {
        if (item?.track) tracks.push(item.track);
      });

      offset += limit;
      hasMore = data.next !== null && data.items?.length === limit;
    }

    return tracks;
  }

  async function fetchAudioFeatures(
    trackIds: string[],
  ): Promise<AudioFeatures[]> {
    const features: AudioFeatures[] = [];
    const batchSize = 100;

    for (let i = 0; i < trackIds.length; i += batchSize) {
      const batch = trackIds.slice(i, i + batchSize).join(",");
      const res = await fetch(
        `${BACKEND_URL}/spotify/audio-features?ids=${batch}`,
        { headers },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message ??
            `Failed to fetch audio features (${res.status})`,
        );
      }

      features.push(...(data.audio_features?.filter(Boolean) ?? []));
    }

    return features;
  }

  async function analyzePlaylist(input: string) {
    setLoading(true);
    setError(null);
    setCategorizedSongs([]);

    try {
      const playlistId = extractPlaylistId(input);
      if (!playlistId) throw new Error("Invalid playlist link or ID.");

      setProgress("Fetching playlist...");
      const res = await fetch(
        `${BACKEND_URL}/spotify/playlists/${playlistId}`,
        { headers },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message ??
            `Error ${res.status}: Could not fetch playlist.`,
        );
      }

      setPlaylist(data);

      setProgress("Fetching tracks...");
      const tracks = await fetchAllTracks(playlistId);

      if (tracks.length === 0) {
        throw new Error("Playlist is empty or has no playable tracks.");
      }

      setProgress("Analyzing audio features...");
      const trackIds = tracks.map((t) => t.id);
      const features = await fetchAudioFeatures(trackIds);

      setProgress("Categorizing songs...");
      const featureMap: Record<string, AudioFeatures> = {};
      features.forEach((f) => (featureMap[f.id] = f));

      const categorized: CategorizedSong[] = tracks
        .filter((t) => featureMap[t.id])
        .map((track) => ({
          track,
          features: featureMap[track.id],
          category: categorizeSong(featureMap[track.id]),
        }));

      setCategorizedSongs(categorized);
      setProgress("");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
      setProgress("");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserPlaylists() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/spotify/me/playlists?limit=50`, {
        headers,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message ?? "Failed to fetch your playlists.",
        );
      }

      setUserPlaylists(data.items?.filter(Boolean) ?? []);
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch playlists.");
    } finally {
      setLoading(false);
    }
  }

  async function createSortedPlaylists(groups: any[]) {
    setLoading(true);
    setProgress("Getting your Spotify profile...");

    try {
      const userRes = await fetch(`${BACKEND_URL}/spotify/me`, { headers });
      const user = await userRes.json();

      for (const group of groups) {
        setProgress(`Creating playlist: ${group.category}...`);

        const createRes = await fetch(
          `${BACKEND_URL}/spotify/users/${user.id}/playlists`,
          {
            method: "POST",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `✦ Songtify — ${group.category}`,
              description: `Sorted by Songtify • ${group.songs.length} songs`,
              public: false,
            }),
          },
        );
        const newPlaylist = await createRes.json();

        const uris = group.songs.map(
          (s: CategorizedSong) => `spotify:track:${s.track.id}`,
        );

        for (let i = 0; i < uris.length; i += 100) {
          await fetch(
            `${BACKEND_URL}/spotify/playlists/${newPlaylist.id}/tracks`,
            {
              method: "POST",
              headers: { ...headers, "Content-Type": "application/json" },
              body: JSON.stringify({ uris: uris.slice(i, i + 100) }),
            },
          );
        }
      }

      setProgress("✓ Playlists created in your Spotify!");
      setTimeout(() => setProgress(""), 3000);
    } catch (err: any) {
      setError(err.message ?? "Failed to create playlists.");
    } finally {
      setLoading(false);
    }
  }

  return {
    playlist,
    categorizedSongs,
    userPlaylists,
    loading,
    error,
    progress,
    analyzePlaylist,
    fetchUserPlaylists,
    createSortedPlaylists,
  };
}
