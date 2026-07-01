"use client";

import Link from "next/link";
import { Gauge, Heart, ListMusic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import clsx from "clsx";
import { formatTime } from "@/lib/lrc";
import { LyricsPanel } from "@/components/LyricsPanel";
import { PremiumButton, TagPill } from "@/components/UI";
import { QueueList } from "@/components/TrackCard";
import { usePlayerStore } from "@/store/player-store";

export default function NowPlayingPage() {
  const {
    currentTrack,
    queue,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    next,
    previous,
    seek,
    toggleFavorite,
    lyricsOpen,
    toggleLyrics
  } = usePlayerStore();

  if (!currentTrack) return null;
  const resolvedDuration = duration || currentTrack.duration || 0;
  const upcoming = queue.filter((track) => track.id !== currentTrack.id).slice(0, 4);

  return (
    <div className="page-shell">
      <div className="grid min-h-[calc(100vh-150px)] items-center gap-12 lg:grid-cols-[360px_1fr]">
        <div className="relative mx-auto w-full max-w-[360px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-noctra-pink/25 to-noctra-blue/25 blur-[80px]" />
          <div className={clsx("vinyl-disc relative aspect-square p-[14%]", isPlaying && "animate-[spin_18s_linear_infinite]")}>
            {currentTrack.cover_url && <img src={currentTrack.cover_url} alt="" className="h-full w-full rounded-full object-cover" />}
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#030305] shadow-inner">
              <span className="h-5 w-5 rounded-full bg-white/10" />
            </span>
          </div>
        </div>

        <section>
          <p className="eyebrow"><span />Reproduciendo</p>
          <h1 className="mt-4 max-w-3xl text-6xl font-black leading-[0.9] text-noctra-text md:text-8xl">{currentTrack.title}</h1>
          <p className="mt-5 text-2xl font-medium text-noctra-muted">{currentTrack.artist}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <TagPill>{currentTrack.mood ?? "Privado"}</TagPill>
            <TagPill tone="red">{currentTrack.album ?? "Single"}</TagPill>
          </div>

          <div className="mt-9 max-w-3xl">
            <input className="range-control" type="range" min={0} max={Math.max(1, resolvedDuration)} value={Math.min(currentTime, Math.max(1, resolvedDuration))} onChange={(event) => seek(Number(event.target.value))} />
            <div className="mt-2 flex justify-between text-xs font-mono text-noctra-muted">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(Math.max(0, resolvedDuration - currentTime))}</span>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-5">
            <button className="player-icon"><Shuffle size={18} /></button>
            <button className="player-icon" onClick={previous}><SkipBack size={24} fill="currentColor" /></button>
            <button className="grid h-16 w-16 place-items-center rounded-full bg-white text-black" onClick={togglePlay}>
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
            <button className="player-icon" onClick={next}><SkipForward size={24} fill="currentColor" /></button>
            <button className="player-icon"><Repeat size={18} /></button>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <PremiumButton variant={currentTrack.is_favorite ? "danger" : "ghost"} onClick={() => toggleFavorite(currentTrack.id)}>
              <Heart size={17} fill={currentTrack.is_favorite ? "currentColor" : "none"} /> {currentTrack.is_favorite ? "Favorito" : "Favorito"}
            </PremiumButton>
            <PremiumButton variant="ghost" onClick={toggleLyrics}><ListMusic size={17} /> Letras</PremiumButton>
            <Link href="/night-drive"><PremiumButton variant="ghost"><Gauge size={17} /> Night Drive</PremiumButton></Link>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.82fr]">
            <LyricsPanel track={currentTrack} />
            {!lyricsOpen && (
              <div>
                <p className="eyebrow mb-4"><span />Sigue</p>
                <QueueList tracks={upcoming} startIndex={2} />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
