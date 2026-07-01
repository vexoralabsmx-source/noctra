import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string; trackId: string }> };

export async function DELETE(_request: Request, context: Context) {
  const { id, trackId } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const { error } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", id)
    .eq("track_id", trackId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
