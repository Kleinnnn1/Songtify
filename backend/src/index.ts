import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

app.use(cors({ origin: [FRONTEND_URL, "http://localhost:5173"] }));
app.use(express.json());

// ── Exchange code for token ──
app.post("/auth/token", async (req, res) => {
  const { code, redirect_uri, code_verifier } = req.body;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code_verifier,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    res.json(response.data);
  } catch (err: any) {
    res
      .status(err.response?.status ?? 500)
      .json(err.response?.data ?? { error: "Token exchange failed" });
  }
});

// ── Proxy: get playlist ──
app.get("/spotify/playlists/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${req.params.id}`,
      { headers: { Authorization: token } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: get playlist tracks ──
app.get("/spotify/playlists/:id/tracks", async (req, res) => {
  const token = req.headers.authorization;
  const limit = req.query.limit ?? 100;
  const offset = req.query.offset ?? 0;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${req.params.id}/tracks?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: token } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: get audio features ──
app.get("/spotify/audio-features", async (req, res) => {
  const token = req.headers.authorization;
  const ids = req.query.ids;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features?ids=${ids}`,
      { headers: { Authorization: token } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: get user playlists ──
app.get("/spotify/me/playlists", async (req, res) => {
  const token = req.headers.authorization;
  const limit = req.query.limit ?? 50;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
      { headers: { Authorization: token } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: get current user ──
app.get("/spotify/me", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: token },
    });
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: create playlist ──
app.post("/spotify/users/:userId/playlists", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${req.params.userId}/playlists`,
      req.body,
      { headers: { Authorization: token, "Content-Type": "application/json" } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

// ── Proxy: add tracks to playlist ──
app.post("/spotify/playlists/:id/tracks", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${req.params.id}/tracks`,
      req.body,
      { headers: { Authorization: token, "Content-Type": "application/json" } },
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(err.response?.status ?? 500).json(err.response?.data);
  }
});

app.listen(PORT, () => {
  console.log(`Songtify backend running on port ${PORT}`);
});
