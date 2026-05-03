import { getAccessToken, loginWithSpotify } from "../utils/auth";
import { groupByCategory } from "../utils/categorize";
import { useSpotify } from "../hooks/useSpotify";
import PlaylistInput from "../components/PlaylistInput";
import CategoryGrid from "../components/CategoryGrid";
import VibeChart from "../components/VibeChart";

const VIBES = [
  { label: "Chill / Lofi", count: "24 songs", color: "#7ec8e3" },
  { label: "Hype", count: "18 songs", color: "#FF6B6B" },
  { label: "Sad / Dark", count: "12 songs", color: "#c084fc" },
  { label: "Happy", count: "31 songs", color: "#FFD166" },
  { label: "Indie", count: "9 songs", color: "#95C77A" },
  { label: "Party", count: "7 songs", color: "#FF9A3C" },
  { label: "Focus", count: "5 songs", color: "#74B3CE" },
  { label: "Uncategorized", count: "4 songs", color: "#888888" },
];

export default function Home() {
  const token = getAccessToken();
  const {
    playlist,
    categorizedSongs,
    loading,
    error,
    progress,
    analyzePlaylist,
    createSortedPlaylists,
  } = useSpotify();

  const groups = groupByCategory(categorizedSongs);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0e",
        fontFamily: "inherit",
      }}
    >

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "#7B2FBE",
            opacity: 0.22,
            filter: "blur(110px)",
            top: "-120px",
            left: "48%",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "#1a0a2e",
            opacity: 0.55,
            filter: "blur(90px)",
            top: "80px",
            right: "4%",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "#0d2b1a",
            opacity: 0.45,
            filter: "blur(80px)",
            bottom: "8%",
            left: "8%",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 40px",
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

          {!token && (
            <button
              onClick={loginWithSpotify}
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
            >
              Connect Spotify
            </button>
          )}
        </nav>

        {!token ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "40px 40px 80px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                width: "100%",
                alignItems: "start",
              }}
            >

              <div>
                <h1
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: "-2px",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ color: "#1DB954" }}>Sort</span>
                  <br />
                  <span style={{ color: "#fff" }}>your playlist </span>
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
                  Paste a playlist link. We analyze every track and sort them
                  into vibes automatically.
                </p>

                <button
                  onClick={loginWithSpotify}
                  style={{
                    padding: "12px 28px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    marginBottom: "40px",
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

                {/* Stats row */}
                <div
                  style={{
                    display: "flex",
                    gap: "32px",
                    paddingTop: "24px",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { num: "+15k", label: "Songs analyzed" },
                    { num: "8", label: "Vibe categories" },
                    { num: "Free", label: "Always" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {s.num}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.3)",
                          textTransform: "uppercase",
                          letterSpacing: "1.2px",
                          marginTop: "3px",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* How it works */}
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
                  {[
                    "Get all songs in the playlist.",
                    "Analyze audio features to determine vibe.",
                    "New playlists created per category.",
                  ].map((step, i) => (
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
                        style={{
                          color: "#1DB954",
                          fontWeight: 500,
                          minWidth: "18px",
                        }}
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
                    gridTemplateColumns: "1fr 1fr",
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
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
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
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: 700,
                        color: "#1DB954",
                      }}
                    >
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
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                    }}
                  >
                    {VIBES.slice(0, 4).map((v) => (
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
                            style={{
                              color: "#fff",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
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
            </div>
          </div>
        ) : (

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
            <PlaylistInput onAnalyze={analyzePlaylist} loading={loading} />

            {progress && (
              <p
                style={{
                  color: "#1DB954",
                  fontSize: "13px",
                  textAlign: "center",
                  animation: "pulse 1.5s infinite",
                }}
              >
                {progress}
              </p>
            )}

            {error && (
              <p
                style={{
                  color: "#ff6b6b",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            {playlist && !loading && (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {playlist.name}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  by {playlist.owner.display_name} · {categorizedSongs.length}{" "}
                  songs
                </p>
              </div>
            )}

            {groups.length > 0 && <VibeChart groups={groups} />}

            {groups.length > 0 && (
              <CategoryGrid
                groups={groups}
                onCreatePlaylists={createSortedPlaylists}
                loading={loading}
              />
            )}

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("code_verifier");
                  window.location.reload();
                }}
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
        )}
      </div>
    </div>
  );
}
