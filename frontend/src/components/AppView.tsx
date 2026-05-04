import { useEffect } from "react";
import type {
  CategoryGroup,
  CategorizedSong,
  SpotifyPlaylist,
} from "../types/spotify";
import PlaylistPicker from "./PlaylistPicker";
import CategoryGrid from "./CategoryGrid";
import VibeChart from "./VibeChart";

interface Props {
  playlist: SpotifyPlaylist | null;
  categorizedSongs: CategorizedSong[];
  groups: CategoryGroup[];
  loading: boolean;
  error: string | null;
  progress: string;
  userPlaylists: any[];
  onAnalyze: (input: string) => void;
  onFetchPlaylists: () => void;
  onCreatePlaylists: (groups: CategoryGroup[]) => void;
  onLogout: () => void;
}

export default function AppView({
  playlist,
  categorizedSongs,
  groups,
  loading,
  error,
  progress,
  userPlaylists,
  onAnalyze,
  onFetchPlaylists,
  onCreatePlaylists,
  onLogout,
}: Props) {
  useEffect(() => {
    onFetchPlaylists();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 40px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {/* Show picker if no playlist selected yet */}
      {!playlist && (
        <PlaylistPicker
          playlists={userPlaylists}
          onSelect={onAnalyze}
          loading={loading}
        />
      )}

      {progress && (
        <p style={{ color: "#1DB954", fontSize: "13px", textAlign: "center" }}>
          {progress}
        </p>
      )}

      {error && (
        <p style={{ color: "#ff6b6b", fontSize: "13px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {playlist && !loading && (
        <div style={{ textAlign: "center" }}>
          {/* Back button */}
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              cursor: "pointer",
              marginBottom: "12px",
              display: "block",
              margin: "0 auto 12px",
            }}
          >
            ← Back to playlists
          </button>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "18px" }}>
            {playlist.name}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            by {playlist.owner.display_name} · {categorizedSongs.length} songs
          </p>
        </div>
      )}

      {groups.length > 0 && <VibeChart groups={groups} />}

      {groups.length > 0 && (
        <CategoryGrid
          groups={groups}
          onCreatePlaylists={onCreatePlaylists}
          loading={loading}
        />
      )}

      <div style={{ textAlign: "center" }}>
        <button
          onClick={onLogout}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.2)",
            fontSize: "12px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.5)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.2)")
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
