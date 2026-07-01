import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const payload = (await request.json()) as {
    name?: string;
    description?: string | null;
    cover_url?: string | null;
  };
  const { data, error } = await supabase.from("playlists").update(payload).eq("id", id).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ playlist: data });
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params;
  const supabase = createServiceSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado" }, { status: 503 });
  }

  const { error } = await supabase.from("playlists").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
