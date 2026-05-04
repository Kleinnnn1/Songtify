import { useState } from "react";
import { getAccessToken } from "../utils/auth";
import { categorizeSong } from "../utils/categorize";
import type {
  AudioFeatures,
  CategorizedSong,
  SpotifyPlaylist,
  SpotifyTrack,
} from "../types/spotify";

const BASE_URL = "https://api.spotify.com/v1";

export function useSpotify() {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [categorizedSongs, setCategorizedSongs] = useState<CategorizedSong[]>(
    [],
  );
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
    let url = `${BASE_URL}/playlists/${playlistId}/tracks?limit=100`;

    while (url) {
      const res = await fetch(url, { headers });
      const data = await res.json();

      // ← add this
      console.log("fetchAllTracks response:", res.status, data);

      if (!res.ok) {
        throw new Error(
          data.error?.message ?? `Failed to fetch tracks (${res.status})`,
        );
      }

      data.items?.forEach((item: any) => {
        if (item?.track) tracks.push(item.track);
      });

      url = data.next;
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
      const res = await fetch(`${BASE_URL}/audio-features?ids=${batch}`, {
        headers,
      });
      const data = await res.json();
      features.push(...data.audio_features.filter(Boolean));
    }

    return features;
  }
  
  console.log("Access token:", getAccessToken()?.substring(0, 20) + "...");
  async function analyzePlaylist(input: string) {
    setLoading(true);
    setError(null);
    setCategorizedSongs([]);

    try {
      const playlistId = extractPlaylistId(input);
      if (!playlistId) throw new Error("Invalid playlist link or ID.");

      setProgress("Fetching playlist...");
      const res = await fetch(`${BASE_URL}/playlists/${playlistId}`, {
        headers,
      });
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

      if (tracks.length === 0)
        throw new Error("Playlist is empty or has no playable tracks.");

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

  async function createSortedPlaylists(groups: any[]) {
    setLoading(true);
    setProgress("Getting your Spotify profile...");

    try {
      const userRes = await fetch(`${BASE_URL}/me`, { headers });
      const user = await userRes.json();

      for (const group of groups) {
        setProgress(`Creating playlist: ${group.category}...`);

        // Create playlist
        const createRes = await fetch(
          `${BASE_URL}/users/${user.id}/playlists`,
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
          await fetch(`${BASE_URL}/playlists/${newPlaylist.id}/tracks`, {
            method: "POST",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify({ uris: uris.slice(i, i + 100) }),
          });
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
    loading,
    error,
    progress,
    analyzePlaylist,
    createSortedPlaylists,
  };
}
