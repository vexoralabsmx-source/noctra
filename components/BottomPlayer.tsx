"use client";

import Link from "next/link";
import { Gauge, Heart, ListMusic, Maximize2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { formatTime } from "@/lib/lrc";
import { usePlayerStore } from "@/store/player-store";

export function BottomPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    audioError,
    play,
    pause,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    setCurrentTime,
    setDuration,
    setAudioError,
    toggleFavorite
  } = usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (audio.src !== currentTrack.audio_url) {
      audio.src = currentTrack.audio_url;
      audio.load();
    }
    setAudioError(null);
    if (isPlaying) {
      audio.play().catch(() => setAudioError("No se pudo iniciar el audio. Revisa la URL o presiona reproducir otra vez."));
    }
  }, [currentTrack, isPlaying, setAudioError]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setAudioError("El navegador bloqueo la reproduccion. Pulsa reproducir para continuar."));
    } else {
      audio.pause();
    }
  }, [isPlaying, setAudioError]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (Math.abs(audio.currentTime - currentTime) > 1.2) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  if (!currentTrack) return null;

  const resolvedDuration = duration || currentTrack.duration || 0;

  return (
    <div className="fixed bottom-5 left-4 right-4 z-40 md:left-72 md:right-8">
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : currentTrack.duration ?? 0)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={next}
        onPlay={play}
        onPause={pause}
        onError={() => setAudioError("No se pudo cargar este audio de Cloudinary. La app sigue funcionando.")}
      />
      <div className="glass-player">
        <div className="flex min-w-0 items-center gap-4">
          {currentTrack.cover_url && <img src={currentTrack.cover_url} alt="" className="h-14 w-14 rounded-2xl object-cover" />}
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-black text-noctra-text">{currentTrack.title}</p>
            <p className="truncate text-xs font-semibold text-noctra-muted">{currentTrack.artist}</p>
          </div>
          <button className={clsx("text-noctra-muted hover:text-noctra-pink", currentTrack.is_favorite && "text-noctra-pink")} onClick={() => toggleFavorite(currentTrack.id)}>
            <Heart size={18} fill={currentTrack.is_favorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center gap-2 px-2">
          <div className="flex items-center gap-3">
            <button className="player-icon"><Shuffle size={17} /></button>
            <button className="player-icon" onClick={previous}><SkipBack size={21} fill="currentColor" /></button>
            <button className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,.32)]" onClick={togglePlay}>
              {isPlaying ? <Pause size={25} fill="currentColor" /> : <Play size={25} fill="currentColor" />}
            </button>
            <button className="player-icon" onClick={next}><SkipForward size={21} fill="currentColor" /></button>
            <button className="player-icon"><Repeat size={17} /></button>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3 text-[11px] font-mono text-noctra-muted">
            <span>{formatTime(currentTime)}</span>
            <input
              aria-label="Progreso"
              type="range"
              min={0}
              max={Math.max(1, resolvedDuration)}
              value={Math.min(currentTime, Math.max(1, resolvedDuration))}
              onChange={(event) => seek(Number(event.target.value))}
              className="range-control"
            />
            <span>{formatTime(resolvedDuration)}</span>
          </div>
          {audioError && <p className="max-w-xl text-center text-xs font-semibold text-rose-200">{audioError}</p>}
        </div>

        <div className="hidden items-center gap-4 text-noctra-muted lg:flex">
          <Volume2 size={17} />
          <input aria-label="Volumen" type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="range-control w-28" />
          <Link href="/night-drive" className="player-icon"><Gauge size={18} /></Link>
          <Link href="/now-playing" className="player-icon"><Maximize2 size={18} /></Link>
          <Link href="/playlists" className="player-icon"><ListMusic size={18} /></Link>
        </div>
      </div>
    </div>
  );
}
