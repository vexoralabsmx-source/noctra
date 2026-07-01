import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const { track_id, position } = (await request.json()) as { track_id?: string; position?: number };
  if (!track_id) return NextResponse.json({ error: "track_id requerido" }, { status: 400 });

  const { data, error } = await supabase
    .from("playlist_tracks")
    .upsert({ playlist_id: id, track_id, position: position ?? 0 }, { onConflict: "playlist_id,track_id" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ playlist_track: data });
}
