import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeToken } from "../utils/auth";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      exchangeToken(code).then(() => navigate("/"));
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      Connecting to Spotify...
    </div>
  );
}
