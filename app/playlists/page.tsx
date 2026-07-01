"use client";

import { Music, Play, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useNoctraData } from "@/components/AppFrame";
import { GlassPanel, PremiumButton } from "@/components/UI";
import { QueueList } from "@/components/TrackCard";
import { usePlayerStore } from "@/store/player-store";

export default function PlaylistsPage() {
  const { playlists, tracks } = useNoctraData();
  const [selectedId, setSelectedId] = useState(playlists[0]?.id ?? "");
  const [name, setName] = useState("");
  const setTrack = usePlayerStore((state) => state.setTrack);
  const selected = useMemo(() => playlists.find((playlist) => playlist.id === selectedId) ?? playlists[0], [playlists, selectedId]);

  return (
    <div className="page-shell">
      <p className="eyebrow"><span />Playlists</p>
      <h1 className="mt-2 text-5xl font-black tracking-normal text-noctra-text md:text-6xl">Tus sets</h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside>
          <div className="flex gap-2">
            <input className="admin-input" placeholder="Nuevo set" value={name} onChange={(event) => setName(event.target.value)} />
            <button className="grid h-12 w-14 place-items-center rounded-full bg-white text-black" title="Crear playlist" onClick={() => setName("")}><Plus size={18} /></button>
          </div>
          <div className="mt-5 space-y-3">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className={clsx("w-full rounded-3xl border p-4 text-left transition", selected?.id === playlist.id ? "border-white/28 bg-white/[0.06]" : "border-white/10 bg-white/[0.025] hover:bg-white/[0.05]")}
                onClick={() => setSelectedId(playlist.id)}
              >
                <p className="font-black text-noctra-text">{playlist.name}</p>
                <p className="mt-1 text-xs font-semibold text-noctra-muted">{playlist.tracks.length} canciones</p>
              </button>
            ))}
          </div>
        </aside>

        {selected && (
          <section className="space-y-5">
            <GlassPanel className="flex items-center justify-between rounded-[28px] p-6">
              <div className="flex items-center gap-5">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-noctra-violet to-noctra-blue">
                  <Music size={32} />
                </div>
                <div>
                  <p className="eyebrow"><span />Playlist</p>
                  <h2 className="text-3xl font-black text-noctra-text">{selected.name}</h2>
                  <p className="text-sm font-semibold text-noctra-muted">{selected.tracks.length} canciones</p>
                </div>
              </div>
              <div className="flex gap-2">
                <PremiumButton onClick={() => selected.tracks[0] && setTrack(selected.tracks[0], selected.tracks)}>
                  <Play size={17} fill="currentColor" /> Reproducir
                </PremiumButton>
                <button className="player-icon border border-white/10 bg-white/[0.04]"><Trash2 size={17} /></button>
              </div>
            </GlassPanel>

            <details className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
              <summary className="cursor-pointer text-sm font-black text-noctra-text">Agregar canciones</summary>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {tracks.map((track) => (
                  <button key={track.id} className="rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-bold text-noctra-muted hover:bg-white/[0.05]">
                    {track.title}
                  </button>
                ))}
              </div>
            </details>

            <GlassPanel className="rounded-[28px] p-4">
              <QueueList tracks={selected.tracks} />
            </GlassPanel>
          </section>
        )}
      </div>
    </div>
  );
}
