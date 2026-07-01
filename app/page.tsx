"use client";

import { useMemo } from "react";
import { useNoctraData } from "@/components/AppFrame";
import { HeroFeaturedTrack } from "@/components/HeroFeaturedTrack";
import { SectionHeader } from "@/components/UI";
import { TrackRail } from "@/components/TrackCard";

export default function HomePage() {
  const { tracks } = useNoctraData();
  const featured = useMemo(() => tracks.find((track) => track.title === "Careless Whisper") ?? tracks[0], [tracks]);
  const afterHours = tracks.filter((track) => ["Night Drive", "After Hours", "Neon Pop", "Gold Rush"].includes(track.mood ?? ""));
  const favorites = tracks.filter((track) => track.is_favorite);

  if (!featured) return null;

  return (
    <div className="page-shell">
      <div className="mb-10 flex items-center justify-between">
        <p className="eyebrow"><span />Esta noche · Martes 30 de junio</p>
        <p className="hidden font-mono text-sm tracking-[0.45em] text-noctra-muted md:block">
          {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <HeroFeaturedTrack track={featured} queue={tracks} />

      <div className="mt-14 space-y-14">
        <section>
          <SectionHeader eyebrow="After Hours" title="Night Drive" />
          <TrackRail tracks={afterHours} />
        </section>
        <section>
          <SectionHeader eyebrow="De tu noche" title="Reproducido recientemente" />
          <TrackRail tracks={tracks.slice(0, 5)} />
        </section>
        <section>
          <SectionHeader eyebrow="Favoritos" title="Tu selección" />
          <TrackRail tracks={favorites.length ? favorites : [featured]} />
        </section>
      </div>
    </div>
  );
}
