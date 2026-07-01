"use client";

import { Headphones, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Track, TrackInput } from "@/lib/types";
import { LYRICS_PLACEHOLDER } from "@/lib/seed-data";
import { PremiumButton } from "@/components/UI";

const emptyTrack: TrackInput = {
  title: "",
  artist: "",
  album: "Single",
  genre: "",
  mood: "",
  audio_url: "",
  cover_url: "",
  lyrics_lrc: LYRICS_PLACEHOLDER,
  duration: null,
  is_favorite: false
};

export function AdminTrackForm({ tracks }: { tracks: Track[] }) {
  const [selectedId, setSelectedId] = useState(tracks[0]?.id ?? "new");
  const selected = useMemo(() => tracks.find((track) => track.id === selectedId), [selectedId, tracks]);
  const [form, setForm] = useState<TrackInput>(selected ?? emptyTrack);
  const [message, setMessage] = useState("");
  const [testing, setTesting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setForm(selected ?? emptyTrack);
  }, [selected]);

  function update<K extends keyof TrackInput>(key: K, value: TrackInput[K]) {
    setForm((state) => ({ ...state, [key]: value }));
  }

  async function save() {
    setMessage("");
    const isNew = selectedId === "new";
    const url = isNew ? "/api/admin/tracks" : `/api/admin/tracks/${selectedId}`;
    const payload: TrackInput = {
      title: form.title,
      artist: form.artist,
      album: form.album,
      genre: form.genre,
      mood: form.mood,
      audio_url: form.audio_url,
      cover_url: form.cover_url,
      lyrics_lrc: form.lyrics_lrc,
      duration: form.duration,
      is_favorite: form.is_favorite
    };
    const response = await fetch(url, {
      method: isNew ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = (await response.json()) as { error?: string; track?: Track };
    if (!response.ok) {
      setMessage(json.error ?? "No se pudo guardar");
      return;
    }
    setMessage("Guardado en Supabase. La app ya usará estos datos.");
    window.dispatchEvent(new Event("noctra:refresh"));
    if (json.track?.id) setSelectedId(json.track.id);
  }

  async function remove() {
    if (selectedId === "new") return;
    const response = await fetch(`/api/admin/tracks/${selectedId}`, { method: "DELETE" });
    setMessage(response.ok ? "Canción eliminada." : "No se pudo eliminar.");
    window.dispatchEvent(new Event("noctra:refresh"));
    setSelectedId("new");
  }

  function testAudio() {
    setTesting(true);
    setMessage("");
    if (!audioRef.current) return;
    audioRef.current.src = form.audio_url;
    audioRef.current.play().catch(() => {
      setTesting(false);
      setMessage("No se pudo reproducir esa URL. Revisa que sea un audio publico de Cloudinary.");
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="space-y-2">
        <button className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-left text-sm font-black text-noctra-text" onClick={() => setSelectedId("new")}>
          <Plus size={16} className="mb-2" /> Nueva canción
        </button>
        {tracks.map((track) => (
          <button key={track.id} className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left hover:bg-white/[0.06]" onClick={() => setSelectedId(track.id)}>
            <span className="block truncate text-sm font-black text-noctra-text">{track.title}</span>
            <span className="block truncate text-xs font-semibold text-noctra-muted">{track.artist}</span>
          </button>
        ))}
      </aside>

      <section className="glass-panel rounded-[28px] p-5">
        <audio
          ref={audioRef}
          onCanPlay={() => {
            setTesting(false);
            setMessage("Audio válido. Puedes guardar esta URL.");
          }}
          onEnded={() => setTesting(false)}
          onError={() => {
            setTesting(false);
            setMessage("Error cargando el audio URL.");
          }}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" value={form.title} onChange={(value) => update("title", value)} />
          <Field label="Artista" value={form.artist} onChange={(value) => update("artist", value)} />
          <Field label="Álbum" value={form.album ?? ""} onChange={(value) => update("album", value)} />
          <Field label="Género" value={form.genre ?? ""} onChange={(value) => update("genre", value)} />
          <Field label="Mood" value={form.mood ?? ""} onChange={(value) => update("mood", value)} />
          <Field label="Duración (segundos)" type="number" value={form.duration?.toString() ?? ""} onChange={(value) => update("duration", value ? Number(value) : null)} />
          <Field label="audio_url Cloudinary" value={form.audio_url} onChange={(value) => update("audio_url", value)} className="md:col-span-2" />
          <Field label="cover_url Cloudinary" value={form.cover_url ?? ""} onChange={(value) => update("cover_url", value)} className="md:col-span-2" />
          <label className="md:col-span-2">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-noctra-muted">lyrics_lrc privado</span>
            <textarea className="admin-input min-h-48" value={form.lyrics_lrc ?? ""} onChange={(event) => update("lyrics_lrc", event.target.value)} />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-black text-noctra-text">
            <input type="checkbox" checked={form.is_favorite} onChange={(event) => update("is_favorite", event.target.checked)} />
            Favorito
          </label>
        </div>

        {message && <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-noctra-muted">{message}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          <PremiumButton onClick={save}><Save size={17} /> Guardar en Supabase</PremiumButton>
          <PremiumButton variant="ghost" onClick={testAudio}><Headphones size={17} /> {testing ? "Probando..." : "Probar audio_url"}</PremiumButton>
          {selectedId !== "new" && <PremiumButton variant="danger" onClick={remove}><Trash2 size={17} /> Eliminar</PremiumButton>}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.28em] text-noctra-muted">{label}</span>
      <input className="admin-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
