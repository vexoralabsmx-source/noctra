"use client";

import { useMemo } from "react";
import { getActiveLyricIndex, parseLrc } from "@/lib/lrc";
import type { Track } from "@/lib/types";
import { GlassPanel } from "@/components/UI";
import { usePlayerStore } from "@/store/player-store";

export function LyricsPanel({ track }: { track: Track }) {
  const currentTime = usePlayerStore((state) => state.currentTime);
  const lyrics = useMemo(() => parseLrc(track.lyrics_lrc), [track.lyrics_lrc]);
  const active = getActiveLyricIndex(lyrics, currentTime);

  return (
    <GlassPanel className="min-h-60 rounded-[28px] p-6">
      {lyrics.length === 0 ? (
        <div className="space-y-5">
          <p className="text-2xl font-black text-white/18">Letras no agregadas todavía</p>
          <p className="text-2xl font-black text-noctra-text">Agrega tus letras LRC privadas aquí</p>
          <p className="text-xl font-black text-white/22">NOCTRA modo privado</p>
        </div>
      ) : (
        <div className="max-h-72 space-y-3 overflow-hidden">
          {lyrics.map((line, index) => (
            <p
              key={`${line.time}-${index}`}
              className={index === active ? "text-2xl font-black text-noctra-text" : "text-xl font-black text-white/20"}
            >
              {line.text || "· · ·"}
            </p>
          ))}
        </div>
      )}
    </GlassPanel>
  );
}
