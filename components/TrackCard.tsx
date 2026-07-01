"use client";

import clsx from "clsx";
import { Heart, Play } from "lucide-react";
import type { Track } from "@/lib/types";
import { EmptyCover } from "@/components/UI";
import { usePlayerStore } from "@/store/player-store";

export function TrackCard({
  track,
  queue,
  compact = false
}: {
  track: Track;
  queue: Track[];
  compact?: boolean;
}) {
  const setTrack = usePlayerStore((state) => state.setTrack);
  const toggleFavorite = usePlayerStore((state) => state.toggleFavorite);

  return (
    <article className={clsx("track-card group", compact && "min-w-40")}>
      <button className="relative block w-full text-left" onClick={() => setTrack(track, queue)} aria-label={`Reproducir ${track.title}`}>
        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt=""
            className="aspect-square w-full rounded-[22px] object-cover shadow-glow"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <EmptyCover className="aspect-square w-full" />
        )}
        <span className="absolute inset-0 grid place-items-center rounded-[22px] bg-black/35 opacity-0 transition group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black"><Play size={20} fill="currentColor" /></span>
        </span>
      </button>
      <div className="mt-4 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-black text-noctra-text">{track.title}</h3>
          <p className="mt-1 truncate text-xs font-semibold text-noctra-muted">{track.artist}</p>
        </div>
        <button
          className={clsx("mt-0.5 text-noctra-muted transition hover:text-noctra-pink", track.is_favorite && "text-noctra-pink")}
          onClick={() => toggleFavorite(track.id)}
          aria-label="Favorito"
        >
          <Heart size={17} fill={track.is_favorite ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}

export function TrackRail({ tracks, title }: { tracks: Track[]; title?: string }) {
  if (tracks.length === 0) return null;

  return (
    <div>
      {title && <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.34em] text-noctra-muted">{title}</h3>}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} queue={tracks} />
        ))}
      </div>
    </div>
  );
}

export function QueueList({ tracks, startIndex = 1 }: { tracks: Track[]; startIndex?: number }) {
  const setTrack = usePlayerStore((state) => state.setTrack);

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => (
        <button
          key={track.id}
          onClick={() => setTrack(track, tracks)}
          className="flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-left transition hover:bg-white/[0.06]"
        >
          <span className="w-6 text-right text-xs font-mono text-noctra-muted">{String(index + startIndex).padStart(2, "0")}</span>
          {track.cover_url ? (
            <img src={track.cover_url} alt="" className="h-10 w-10 rounded-xl object-cover" />
          ) : (
            <EmptyCover className="h-10 w-10 rounded-xl" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-black text-noctra-text">{track.title}</span>
            <span className="block truncate text-xs font-semibold text-noctra-muted">{track.artist}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
