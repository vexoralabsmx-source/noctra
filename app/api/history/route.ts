import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { track_id } = (await request.json()) as { track_id?: string };

  if (!track_id) {
    return NextResponse.json({ error: "track_id requerido" }, { status: 400 });
  }

  const supabase = createServiceSupabaseClient();
  if (!supabase) return NextResponse.json({ ok: true, source: "fallback" });

  const history = await supabase.from("play_history").insert({ track_id });
  await supabase.rpc("increment_track_play_count", { track_uuid: track_id }).then(undefined, () => undefined);

  if (history.error) {
    return NextResponse.json({ error: history.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
