interface Props {
  showButton: boolean;
  onConnect: () => void;
}

export default function Navbar({ showButton, onConnect }: Props) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px clamp(16px, 5vw, 40px)",
        height: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "#1DB954",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 8h8M9 5l3 3-3 3"
              stroke="#000"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
          Songtify
        </span>
      </div>

      {showButton && (
        <button
          onClick={onConnect}
          style={{
            padding: "9px 22px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.25)";
          }}
        >
          Connect Spotify
        </button>
      )}
    </nav>
  );
}
