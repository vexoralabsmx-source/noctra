"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Playlist, Track } from "@/lib/types";
import { PremiumButton } from "@/components/UI";

export function AdminPlaylistManager({ playlists, tracks }: { playlists: Playlist[]; tracks: Track[] }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function createPlaylist() {
    const response = await fetch("/api/admin/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: "Set privado NOCTRA" })
    });
    setMessage(response.ok ? "Playlist creada." : "No se pudo crear playlist.");
    setName("");
    window.dispatchEvent(new Event("noctra:refresh"));
  }

  async function addTrack(playlistId: string, trackId: string, position: number) {
    const response = await fetch(`/api/admin/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track_id: trackId, position })
    });
    setMessage(response.ok ? "Canción agregada." : "No se pudo agregar canción.");
    window.dispatchEvent(new Event("noctra:refresh"));
  }

  async function removeTrack(playlistId: string, trackId: string) {
    const response = await fetch(`/api/admin/playlists/${playlistId}/tracks/${trackId}`, { method: "DELETE" });
    setMessage(response.ok ? "Canción quitada." : "No se pudo quitar canción.");
    window.dispatchEvent(new Event("noctra:refresh"));
  }

  return (
    <section className="glass-panel rounded-[28px] p-5">
      <div className="flex flex-wrap gap-3">
        <input className="admin-input max-w-sm" placeholder="Nombre de playlist" value={name} onChange={(event) => setName(event.target.value)} />
        <PremiumButton onClick={createPlaylist} disabled={!name.trim()}><Plus size={17} /> Crear playlist</PremiumButton>
      </div>
      {message && <p className="mt-4 text-sm font-semibold text-noctra-muted">{message}</p>}

      <div className="mt-6 space-y-5">
        {playlists.map((playlist) => (
          <PlaylistEditor
            key={playlist.id}
            playlist={playlist}
            tracks={tracks}
            addTrack={addTrack}
            removeTrack={removeTrack}
            setMessage={setMessage}
          />
        ))}
      </div>
    </section>
  );
}

function PlaylistEditor({
  playlist,
  tracks,
  addTrack,
  removeTrack,
  setMessage
}: {
  playlist: Playlist;
  tracks: Track[];
  addTrack: (playlistId: string, trackId: string, position: number) => Promise<void>;
  removeTrack: (playlistId: string, trackId: string) => Promise<void>;
  setMessage: (message: string) => void;
}) {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description ?? "");
  const [coverUrl, setCoverUrl] = useState(playlist.cover_url ?? "");

  async function save() {
    const response = await fetch(`/api/admin/playlists/${playlist.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, cover_url: coverUrl })
    });
    setMessage(response.ok ? "Playlist actualizada." : "No se pudo actualizar playlist.");
    window.dispatchEvent(new Event("noctra:refresh"));
  }

  async function remove() {
    const response = await fetch(`/api/admin/playlists/${playlist.id}`, { method: "DELETE" });
    setMessage(response.ok ? "Playlist eliminada." : "No se pudo eliminar playlist.");
    window.dispatchEvent(new Event("noctra:refresh"));
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
        <input className="admin-input" value={name} onChange={(event) => setName(event.target.value)} />
        <input className="admin-input" value={description} placeholder="Descripción" onChange={(event) => setDescription(event.target.value)} />
        <input className="admin-input" value={coverUrl} placeholder="cover_url" onChange={(event) => setCoverUrl(event.target.value)} />
        <PremiumButton variant="ghost" onClick={save}><Save size={16} /> Guardar</PremiumButton>
        <PremiumButton variant="danger" onClick={remove}><Trash2 size={16} /> Borrar</PremiumButton>
      </div>
      <p className="mt-3 text-xs font-semibold text-noctra-muted">{playlist.tracks.length} canciones</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-noctra-muted">Dentro del set</p>
          {playlist.tracks.map((track) => (
            <div key={track.id} className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-3 py-2">
              <span className="truncate text-sm font-bold text-noctra-text">{track.title}</span>
              <button className="player-icon" onClick={() => removeTrack(playlist.id, track.id)}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-noctra-muted">Agregar tracks</p>
          {tracks.map((track, index) => (
            <button key={track.id} className="block w-full rounded-2xl bg-white/[0.03] px-3 py-2 text-left text-sm font-bold text-noctra-muted hover:bg-white/[0.06]" onClick={() => addTrack(playlist.id, track.id, index + 1)}>
              {track.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
