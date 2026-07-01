"use client";

import { Grid2X2, Heart, List, Search } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useNoctraData } from "@/components/AppFrame";
import { TrackCard, QueueList } from "@/components/TrackCard";

export default function LibraryPage() {
  const { tracks } = useNoctraData();
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("All");
  const [genre, setGenre] = useState("All");
  const [mood, setMood] = useState("All");
  const [favorites, setFavorites] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const artists = ["All", ...Array.from(new Set(tracks.map((track) => track.artist)))];
  const genres = ["All", ...Array.from(new Set(tracks.map((track) => track.genre).filter(Boolean) as string[]))];
  const moods = ["All", ...Array.from(new Set(tracks.map((track) => track.mood).filter(Boolean) as string[]))];

  const filtered = useMemo(
    () =>
      tracks.filter((track) => {
        const haystack = `${track.title} ${track.artist} ${track.album ?? ""}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (artist === "All" || track.artist === artist) &&
          (genre === "All" || track.genre === genre) &&
          (mood === "All" || track.mood === mood) &&
          (!favorites || track.is_favorite)
        );
      }),
    [artist, favorites, genre, mood, query, tracks]
  );

  return (
    <div className="page-shell">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow"><span />Biblioteca</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-noctra-text md:text-6xl">Tu colección</h1>
          <p className="mt-2 text-sm font-semibold text-noctra-muted">{tracks.length.toString().padStart(2, "0")} canciones · privada · Cloudinary</p>
        </div>
        <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
          <button className={clsx("player-icon", view === "grid" && "bg-white/10 text-white")} onClick={() => setView("grid")}><Grid2X2 size={17} /></button>
          <button className={clsx("player-icon", view === "list" && "bg-white/10 text-white")} onClick={() => setView("list")}><List size={17} /></button>
        </div>
      </div>

      <label className="mb-5 flex h-14 items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.055] px-5 text-noctra-muted">
        <Search size={19} />
        <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-noctra-muted" placeholder="Buscar canciones, artistas, álbumes..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>

      <div className="mb-8 flex flex-wrap gap-3">
        <SelectPill label="Artista" value={artist} values={artists} onChange={setArtist} />
        <SelectPill label="Género" value={genre} values={genres} onChange={setGenre} />
        <SelectPill label="Mood" value={mood} values={moods} onChange={setMood} />
        <button className={clsx("tag-pill flex items-center gap-2", favorites && "text-noctra-pink")} onClick={() => setFavorites((value) => !value)}>
          <Heart size={14} fill={favorites ? "currentColor" : "none"} /> Favoritos
        </button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5">
          {filtered.map((track) => <TrackCard key={track.id} track={track} queue={filtered} />)}
        </div>
      ) : (
        <QueueList tracks={filtered} />
      )}
    </div>
  );
}

function SelectPill({
  label,
  value,
  values,
  onChange
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="tag-pill flex items-center gap-2">
      <span className="text-noctra-muted">{label}</span>
      <select className="bg-transparent text-noctra-text outline-none" value={value} onChange={(event) => onChange(event.target.value)}>
        {values.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
