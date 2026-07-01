"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Playlist, Track } from "@/lib/types";
import { seedPlaylists, seedTracks } from "@/lib/seed-data";
import { usePlayerStore } from "@/store/player-store";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomPlayer } from "@/components/BottomPlayer";
import { DynamicAmbientBackground } from "@/components/Visuals";

type DataState = {
  tracks: Track[];
  playlists: Playlist[];
};

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hydrateTracks = usePlayerStore((state) => state.hydrateTracks);
  const [data, setData] = useState<DataState>({ tracks: seedTracks, playlists: seedPlaylists });
  const immersive = pathname === "/night-drive" || pathname === "/admin/login";

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const [tracksResponse, playlistsResponse] = await Promise.all([
          fetch("/api/tracks", { cache: "no-store" }),
          fetch("/api/playlists", { cache: "no-store" })
        ]);
        const tracksJson = (await tracksResponse.json()) as { tracks?: Track[] };
        const playlistsJson = (await playlistsResponse.json()) as { playlists?: Playlist[] };
        if (!cancelled) {
          setData({
            tracks: tracksJson.tracks?.length ? tracksJson.tracks : seedTracks,
            playlists: playlistsJson.playlists?.length ? playlistsJson.playlists : seedPlaylists
          });
        }
      } catch {
        if (!cancelled) setData({ tracks: seedTracks, playlists: seedPlaylists });
      }
    }
    loadData();
    window.addEventListener("noctra:refresh", loadData);
    return () => {
      cancelled = true;
      window.removeEventListener("noctra:refresh", loadData);
    };
  }, []);

  useEffect(() => {
    hydrateTracks(data.tracks);
  }, [data.tracks, hydrateTracks]);

  const contextValue = useMemo(() => data, [data]);

  return (
    <NoctraDataContext.Provider value={contextValue}>
      <DynamicAmbientBackground />
      <div className={immersive ? "min-h-screen" : "flex min-h-screen"}>
        {!immersive && <AppSidebar />}
        <main className={immersive ? "min-h-screen" : "min-h-screen flex-1 pb-32 pl-0 md:pl-64"}>
          {children}
        </main>
        {!immersive && <BottomPlayer />}
      </div>
    </NoctraDataContext.Provider>
  );
}

const NoctraDataContext = createContext<DataState>({ tracks: seedTracks, playlists: seedPlaylists });

export function useNoctraData() {
  return useContext(NoctraDataContext);
}
