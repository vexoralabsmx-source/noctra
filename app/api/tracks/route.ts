import { NextResponse } from "next/server";
import { seedTracks } from "@/lib/seed-data";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ tracks: seedTracks, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("tracks")
    .select("*")
    .order("is_favorite", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ tracks: seedTracks, source: "fallback", warning: error.message });
  }

  return NextResponse.json({ tracks: data ?? [] });
}
