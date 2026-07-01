import { NextResponse } from "next/server";
import { seedPlaylists } from "@/lib/seed-data";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { Playlist, Track } from "@/lib/types";

type PlaylistTrackRow = {
  position: number | null;
  tracks: Track | Track[] | null;
};

type PlaylistRow = {
  id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  created_at?: string;
  updated_at?: string;
  playlist_tracks?: PlaylistTrackRow[] | null;
};

export async function GET() {
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ playlists: seedPlaylists, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("playlists")
    .select("*, playlist_tracks(position, tracks(*))")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ playlists: seedPlaylists, source: "fallback", warning: error.message });
  }

  const playlists: Playlist[] = ((data ?? []) as PlaylistRow[]).map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    cover_url: playlist.cover_url,
    created_at: playlist.created_at,
    updated_at: playlist.updated_at,
    tracks: (playlist.playlist_tracks ?? [])
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .flatMap((entry) => {
        if (Array.isArray(entry.tracks)) return entry.tracks;
        return entry.tracks ? [entry.tracks] : [];
      })
  }));

  return NextResponse.json({ playlists });
}
