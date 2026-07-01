import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { TrackInput } from "@/lib/types";

export async function POST(request: Request) {
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const payload = (await request.json()) as TrackInput;
  const { data, error } = await supabase.from("tracks").insert(payload).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ track: data });
}
