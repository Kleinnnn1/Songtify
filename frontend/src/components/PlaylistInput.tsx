import { useState } from "react";

interface Props {
  onAnalyze: (input: string) => void;
  loading: boolean;
}

export default function PlaylistInput({ onAnalyze, loading }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) onAnalyze(input.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-gray-400 text-sm mb-3 tracking-wide">
        Paste a Spotify playlist link or ID
      </p>
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="https://open.spotify.com/playlist/..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}
