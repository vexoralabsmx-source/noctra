"use client";

import Link from "next/link";
import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { CockpitGauge } from "@/components/Visuals";
import { formatTime } from "@/lib/lrc";
import { usePlayerStore } from "@/store/player-store";

export default function NightDrivePage() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, previous, next, seek } = usePlayerStore();
  if (!currentTrack) return null;
  const resolvedDuration = duration || currentTrack.duration || 0;
  const progress = resolvedDuration ? (currentTime / resolvedDuration) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020203] px-6 py-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(225,29,72,.22),transparent_28%),radial-gradient(circle_at_77%_48%,rgba(56,189,248,.16),transparent_28%),linear-gradient(#030305,#050308)]" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-noctra-blue/70 to-transparent" />
      <header className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[1.1em] text-noctra-blue">NOCTRA</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-black text-noctra-text"><span className="h-3 w-3 rounded-full border-2 border-noctra-red" /> Night Drive · Cockpit</p>
        </div>
        <p className="font-mono text-3xl font-black tracking-[0.12em] text-noctra-text">
          {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
        <Link href="/" className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-noctra-text"><X size={20} /></Link>
      </header>

      <main className="relative z-10 grid min-h-[calc(100vh-220px)] grid-cols-[1fr_minmax(260px,430px)_1fr] items-center gap-4">
        <CockpitGauge value={3.9} label="RPM" tone="red" />
        <section className="text-center">
          {currentTrack.cover_url && <img src={currentTrack.cover_url} alt="" className="mx-auto aspect-square w-44 rounded-[24px] object-cover shadow-glow" />}
          <p className="eyebrow mx-auto mt-7 justify-center"><span />Night Drive</p>
          <h1 className="mt-2 text-4xl font-black text-noctra-text md:text-5xl">{currentTrack.title}</h1>
          <p className="mt-2 text-lg font-semibold text-noctra-muted">{currentTrack.artist}</p>
        </section>
        <CockpitGauge value={2.9} label="Vol" tone="blue" />
      </main>

      <footer className="relative z-10 mx-auto max-w-[1420px] rounded-[28px] border border-white/14 bg-gradient-to-r from-rose-500/18 via-white/[0.05] to-violet-500/16 p-5 shadow-glow backdrop-blur-2xl">
        <div className="grid gap-5 text-xs font-mono uppercase tracking-[0.36em] text-noctra-muted md:grid-cols-4">
          <div><span className="text-noctra-red">· Transcurrido</span><p className="mt-2 text-lg font-black tracking-normal text-noctra-text">{formatTime(currentTime)}</p></div>
          <div><span className="text-noctra-blue">· Restante</span><p className="mt-2 text-lg font-black tracking-normal text-noctra-text">-{formatTime(Math.max(0, resolvedDuration - currentTime))}</p></div>
          <div><span className="text-noctra-violet">· Estado</span><p className="mt-2 text-lg font-black tracking-[0.32em] text-noctra-text">{isPlaying ? "DRIVING" : "PAUSA"}</p></div>
          <div className="text-right"><span className="text-noctra-pink">· Mood</span><p className="mt-2 text-lg font-black tracking-[0.32em] text-noctra-text">{currentTrack.mood ?? "NIGHT"}</p></div>
        </div>
        <input className="range-control mt-4" type="range" min={0} max={Math.max(1, resolvedDuration)} value={Math.min(currentTime, Math.max(1, resolvedDuration))} onChange={(event) => seek(Number(event.target.value))} style={{ backgroundSize: `${progress}% 100%` }} />
        <div className="mt-5 flex justify-center gap-4">
          <button className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white" onClick={previous}><SkipBack fill="currentColor" /></button>
          <button className="grid h-16 w-16 place-items-center rounded-full bg-white p-5 text-black" onClick={togglePlay}>{isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}</button>
          <button className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white" onClick={next}><SkipForward fill="currentColor" /></button>
        </div>
      </footer>
    </div>
  );
}
