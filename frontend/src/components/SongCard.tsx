import type { CategorizedSong } from "../types/spotify";
import { formatDuration } from "../utils/categorize";

interface Props {
  song: CategorizedSong;
  index: number;
}

export default function SongCard({ song, index }: Props) {
  const { track } = song;
  const albumArt = track.album.images[2]?.url ?? track.album.images[0]?.url;
  const artists = track.artists.map((a) => a.name).join(", ");

  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
    >
      <span className="text-gray-600 text-xs w-5 text-right shrink-0">
        {index + 1}
      </span>

      {albumArt && (
        <img
          src={albumArt}
          alt={track.album.name}
          className="w-9 h-9 rounded object-cover shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate group-hover:text-green-400 transition-colors">
          {track.name}
        </p>
        <p className="text-gray-500 text-xs truncate">{artists}</p>
      </div>

      <span className="text-gray-600 text-xs shrink-0">
        {formatDuration(track.duration_ms)}
      </span>
    </a>
  );
}
