export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  genre: string | null;
  mood: string | null;
  audio_url: string;
  cover_url: string | null;
  lyrics_lrc: string | null;
  duration: number | null;
  is_favorite: boolean;
  play_count: number;
  created_at?: string;
  updated_at?: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  created_at?: string;
  updated_at?: string;
  tracks: Track[];
};

export type Quality = "Baja" | "Media" | "Ultra";

export type ParsedLyric = {
  time: number;
  text: string;
};

export type TrackInput = Omit<Track, "id" | "created_at" | "updated_at" | "play_count"> & {
  id?: string;
  play_count?: number;
};
