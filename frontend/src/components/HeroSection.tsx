interface Props {
  onConnect: () => void;
}

export default function HeroSection({ onConnect }: Props) {
  return (
    <div style={{ alignSelf: "center" }}>
      <h1
        style={{
          fontSize: "clamp(32px, 6vw, 56px)",
          letterSpacing: "clamp(-1px, -0.05em, -2px)",
          fontWeight: 700,
          lineHeight: 1.08,
          marginBottom: "16px",
        }}
      >
        <span style={{ color: "#1DB954" }}>Sort</span>
        <br />
        <span style={{ color: "#fff" }}>your playlist</span>
        <br />
        <span style={{ color: "#c084fc" }}>faster</span>
        <br />
        <span style={{ color: "#fff" }}>than your</span>
        <br />
        <span style={{ color: "#7ec8e3" }}>heartbeat</span>
      </h1>

      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          lineHeight: 1.7,
          marginBottom: "24px",
          maxWidth: "320px",
        }}
      >
        Paste a playlist link. We analyze every track and sort them into vibes
        automatically.
      </p>

      <button
        onClick={onConnect}
        style={{
          padding: "12px 28px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "6px",
          color: "#fff",
          fontSize: "14px",
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
        Connect to Spotify
      </button>
    </div>
  );
}
