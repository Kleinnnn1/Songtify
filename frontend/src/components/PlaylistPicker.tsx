interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
  owner: { display_name: string };
}

interface Props {
  playlists: Playlist[];
  onSelect: (id: string) => void;
  loading: boolean;
}

export default function PlaylistPicker({
  playlists,
  onSelect,
  loading,
}: Props) {
  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          marginBottom: "20px",
        }}
      >
        Select a playlist to analyze
      </p>

      {loading && (
        <p style={{ color: "#1DB954", fontSize: "13px" }}>
          Loading your playlists...
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {playlists.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "12px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-c olor 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            {/* Playlist image */}
            {p.images?.[0]?.url ? (
              <img
                src={p.images[0].url}
                alt={p.name}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                🎵
              </div>
            )}

            <div
              style={{
                color: "#fff",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "3px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "11px",
              }}
            >
              {p.tracks?.total ?? 0} songs
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
