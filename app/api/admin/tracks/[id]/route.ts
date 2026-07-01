import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { TrackInput } from "@/lib/types";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const payload = (await request.json()) as Partial<TrackInput>;
  const { data, error } = await supabase.from("tracks").update(payload).eq("id", id).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ track: data });
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
