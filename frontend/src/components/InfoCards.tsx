const STEPS = [
  "Get all songs in the playlist.",
  "Analyze audio features to determine vibe.",
  "New playlists created per category.",
];

const VIBES = [
  { label: "Chill / Lofi", count: "24 songs", color: "#7ec8e3" },
  { label: "Hype", count: "18 songs", color: "#FF6B6B" },
  { label: "Sad / Dark", count: "12 songs", color: "#c084fc" },
  { label: "Happy", count: "31 songs", color: "#FFD166" },
];

export default function InfoCards() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          How it works
        </div>
        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              padding: "5px 0",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            <span
              style={{ color: "#1DB954", fontWeight: 500, minWidth: "18px" }}
            >
              {i + 1}.
            </span>
            {step}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "16px 18px",
          }}
        >
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#fff" }}>
            +15k
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "4px",
            }}
          >
            Songs analyzed
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(29,185,84,0.25)",
            borderRadius: "12px",
            padding: "16px 18px",
          }}
        >
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#1DB954" }}>
            Free
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "4px",
            }}
          >
            Always free
          </div>
        </div>
      </div>

      {/* Vibe categories */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "12px",
          }}
        >
          Vibe categories
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "8px",
          }}
        >
          {VIBES.map((v) => (
            <div
              key={v.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "3px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: v.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                >
                  {v.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.25)",
                  paddingLeft: "14px",
                }}
              >
                {v.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
