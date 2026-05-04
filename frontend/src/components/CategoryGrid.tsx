import { useState } from "react";
import type { CategoryGroup, CategorizedSong } from "../types/spotify";
import SongCard from "./SongCard";

interface Props {
  groups: CategoryGroup[];
  onCreatePlaylists: (groups: CategoryGroup[]) => void;
  loading: boolean;
}

export default function CategoryGrid({
  groups,
  onCreatePlaylists,
  loading,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (category: string) => {
    setExpanded(expanded === category ? null : category);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">
          {groups.reduce((acc, g) => acc + g.songs.length, 0)} songs sorted into{" "}
          {groups.length} categories
        </p>
        <button
          onClick={() => onCreatePlaylists(groups)}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors"
        >
          <span>↑</span>
          {loading ? "Creating..." : "Save to Spotify"}
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-white/10 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >

            <button
              onClick={() => toggle(group.category)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{group.emoji}</span>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold">
                    {group.category}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {group.songs.length} songs
                  </p>
                </div>
              </div>
              <span
                className="text-gray-500 text-xs transition-transform duration-200"
                style={{
                  transform:
                    expanded === group.category
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </button>

            <div className="h-0.5 w-full" style={{ background: group.color }} />

            {expanded === group.category && (
              <div className="py-2 max-h-72 overflow-y-auto">
                {group.songs.map((song: CategorizedSong, i: number) => (
                  <SongCard key={song.track.id} song={song} index={i} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
