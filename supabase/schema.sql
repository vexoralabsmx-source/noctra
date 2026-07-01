create extension if not exists "pgcrypto";

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  album text,
  genre text,
  mood text,
  audio_url text not null,
  cover_url text,
  lyrics_lrc text,
  duration integer,
  is_favorite boolean default false,
  play_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  cover_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.playlist_tracks (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid references public.playlists(id) on delete cascade,
  track_id uuid references public.tracks(id) on delete cascade,
  position integer default 0,
  created_at timestamptz default now(),
  unique (playlist_id, track_id)
);

create table if not exists public.play_history (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references public.tracks(id) on delete cascade,
  played_at timestamptz default now()
);

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text,
  updated_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.increment_track_play_count(track_uuid uuid)
returns void
language sql
as $$
  update public.tracks
  set play_count = coalesce(play_count, 0) + 1
  where id = track_uuid;
$$;

drop trigger if exists tracks_set_updated_at on public.tracks;
create trigger tracks_set_updated_at
before update on public.tracks
for each row execute function public.set_updated_at();

drop trigger if exists playlists_set_updated_at on public.playlists;
create trigger playlists_set_updated_at
before update on public.playlists
for each row execute function public.set_updated_at();

drop trigger if exists app_settings_set_updated_at on public.app_settings;
create trigger app_settings_set_updated_at
before update on public.app_settings
for each row execute function public.set_updated_at();

alter table public.tracks enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_tracks enable row level security;
alter table public.play_history enable row level security;
alter table public.app_settings enable row level security;

drop policy if exists "Public can read tracks" on public.tracks;
create policy "Public can read tracks" on public.tracks for select using (true);

drop policy if exists "Public can read playlists" on public.playlists;
create policy "Public can read playlists" on public.playlists for select using (true);

drop policy if exists "Public can read playlist tracks" on public.playlist_tracks;
create policy "Public can read playlist tracks" on public.playlist_tracks for select using (true);

drop policy if exists "Public can insert play history" on public.play_history;
create policy "Public can insert play history" on public.play_history for insert with check (true);
