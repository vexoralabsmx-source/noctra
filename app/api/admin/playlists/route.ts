import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

type PlaylistInput = {
  name: string;
  description?: string | null;
  cover_url?: string | null;
};

export async function POST(request: Request) {
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const payload = (await request.json()) as PlaylistInput;
  const { data, error } = await supabase.from("playlists").insert(payload).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ playlist: data });
}
