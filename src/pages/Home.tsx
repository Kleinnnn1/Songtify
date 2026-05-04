import { getAccessToken, loginWithSpotify } from "../utils/auth";
import { groupByCategory } from "../utils/categorize";
import { useSpotify } from "../hooks/useSpotify";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import InfoCards from "../components/InfoCards";
import AppView from "../components/AppView";

export default function Home() {
  const token = getAccessToken();
  const {
    playlist,
    categorizedSongs,
    userPlaylists,
    fetchUserPlaylists,
    loading,
    error,
    progress,
    analyzePlaylist,
    createSortedPlaylists,
  } = useSpotify();

  const groups = groupByCategory(categorizedSongs);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");
    window.location.reload();
  };

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
        <Navbar showButton={!token} onConnect={loginWithSpotify} />

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
              <HeroSection onConnect={loginWithSpotify} />
              <InfoCards />
            </div>
          </div>
        ) : (
          <AppView
            playlist={playlist}
            categorizedSongs={categorizedSongs}
            groups={groups}
            loading={loading}
            error={error}
            progress={progress}
            onAnalyze={analyzePlaylist}
            userPlaylists={userPlaylists}
            onFetchPlaylists={fetchUserPlaylists}
            onCreatePlaylists={createSortedPlaylists}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
