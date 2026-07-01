"use client";

import { create } from "zustand";
import type { Track } from "@/lib/types";

type RepeatMode = "off" | "one" | "all";

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
  lyricsOpen: boolean;
  audioError: string | null;
  initialized: boolean;
  setTrack: (track: Track, queue?: Track[]) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setQueue: (queue: Track[]) => void;
  toggleLyrics: () => void;
  toggleFavorite: (trackId: string) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioError: (message: string | null) => void;
  hydrateTracks: (tracks: Track[]) => void;
};

function nextIndex(state: PlayerState, direction: 1 | -1) {
  if (!state.currentTrack || state.queue.length === 0) return -1;
  const current = state.queue.findIndex((track) => track.id === state.currentTrack?.id);
  if (current === -1) return direction === 1 ? 0 : state.queue.length - 1;
  if (state.shuffle && direction === 1) return Math.floor(Math.random() * state.queue.length);
  return (current + direction + state.queue.length) % state.queue.length;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.82,
  currentTime: 0,
  duration: 0,
  repeatMode: "off",
  shuffle: false,
  lyricsOpen: false,
  audioError: null,
  initialized: false,
  hydrateTracks: (tracks) =>
    set((state) => {
      if (state.initialized || tracks.length === 0) return { queue: tracks };
      const featured = tracks.find((track) => track.title === "Careless Whisper") ?? tracks[0];
      return {
        queue: tracks,
        currentTrack: featured,
        duration: featured.duration ?? 0,
        initialized: true
      };
    }),
  setTrack: (track, queue) =>
    set({
      currentTrack: track,
      queue: queue?.length ? queue : get().queue,
      isPlaying: true,
      currentTime: 0,
      duration: track.duration ?? 0,
      audioError: null
    }),
  play: () => set({ isPlaying: true, audioError: null }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying, audioError: null })),
  next: () => {
    const state = get();
    const index = nextIndex(state, 1);
    if (index >= 0) {
      const track = state.queue[index];
      set({ currentTrack: track, isPlaying: true, currentTime: 0, duration: track.duration ?? 0, audioError: null });
    }
  },
  previous: () => {
    const state = get();
    if (state.currentTime > 4) {
      set({ currentTime: 0 });
      return;
    }
    const index = nextIndex(state, -1);
    if (index >= 0) {
      const track = state.queue[index];
      set({ currentTrack: track, isPlaying: true, currentTime: 0, duration: track.duration ?? 0, audioError: null });
    }
  },
  seek: (time) => set({ currentTime: Math.max(0, time) }),
  setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
  setQueue: (queue) => set({ queue }),
  toggleLyrics: () => set((state) => ({ lyricsOpen: !state.lyricsOpen })),
  toggleFavorite: (trackId) =>
    set((state) => ({
      queue: state.queue.map((track) =>
        track.id === trackId ? { ...track, is_favorite: !track.is_favorite } : track
      ),
      currentTrack:
        state.currentTrack?.id === trackId
          ? { ...state.currentTrack, is_favorite: !state.currentTrack.is_favorite }
          : state.currentTrack
    })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setAudioError: (message) => set({ audioError: message, isPlaying: message ? false : get().isPlaying })
}));
