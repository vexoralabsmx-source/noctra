"use client";

import Link from "next/link";
import { ExternalLink, Gauge, Play } from "lucide-react";
import type { Track } from "@/lib/types";
import { usePlayerStore } from "@/store/player-store";
import { AudioVisualizer } from "@/components/Visuals";
import { EmptyCover, PremiumButton, TagPill } from "@/components/UI";

export function HeroFeaturedTrack({ track, queue }: { track: Track; queue: Track[] }) {
  const setTrack = usePlayerStore((state) => state.setTrack);

  return (
    <section className="hero-grid">
      <div className="relative">
        <div className="absolute inset-10 rounded-[40px] bg-noctra-pink/25 blur-[80px]" />
        {track.cover_url ? (
          <img src={track.cover_url} alt="" className="relative aspect-square w-full rounded-[28px] object-cover shadow-glow" />
        ) : (
          <EmptyCover className="relative aspect-square w-full rounded-[28px]" />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <p className="eyebrow"><span />Destacado esta noche</p>
        <h1 className="mt-6 max-w-2xl text-6xl font-black leading-[0.9] tracking-normal text-noctra-text md:text-8xl">
          {track.title}
        </h1>
        <p className="mt-6 text-2xl font-medium text-noctra-muted">{track.artist}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <TagPill>{track.mood ?? "Privado"}</TagPill>
          <TagPill tone="blue">{track.genre ?? "Sin genero"}</TagPill>
          <TagPill tone="red">{track.album ?? "Single"}</TagPill>
        </div>
        <AudioVisualizer />
        <div className="mt-7 flex flex-wrap gap-3">
          <PremiumButton onClick={() => setTrack(track, queue)}>
            <Play size={18} fill="currentColor" /> Reproducir
          </PremiumButton>
          <Link href="/night-drive">
            <PremiumButton variant="ghost"><Gauge size={18} /> Night Drive</PremiumButton>
          </Link>
          <Link href="/now-playing">
            <PremiumButton variant="ghost">Abrir <ExternalLink size={17} /></PremiumButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
