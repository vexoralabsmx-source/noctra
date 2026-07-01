import type { ParsedLyric } from "@/lib/types";

const timestampPattern = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;

export function parseLrc(lrc?: string | null): ParsedLyric[] {
  if (!lrc?.trim()) return [];

  return lrc
    .split(/\r?\n/)
    .flatMap((line) => {
      const matches = Array.from(line.matchAll(timestampPattern));
      const text = line.replace(timestampPattern, "").trim();
      return matches.map((match) => {
        const minutes = Number(match[1] ?? 0);
        const seconds = Number(match[2] ?? 0);
        const fraction = Number((match[3] ?? "0").padEnd(3, "0"));
        return { time: minutes * 60 + seconds + fraction / 1000, text };
      });
    })
    .filter((lyric) => Number.isFinite(lyric.time))
    .sort((a, b) => a.time - b.time);
}

export function getActiveLyricIndex(lyrics: ParsedLyric[], currentTime: number) {
  let active = -1;
  for (let index = 0; index < lyrics.length; index += 1) {
    if (lyrics[index].time <= currentTime) active = index;
  }
  return active;
}

export function formatTime(totalSeconds?: number | null) {
  const safe = Math.max(0, Math.floor(totalSeconds ?? 0));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
