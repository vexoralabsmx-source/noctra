"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminPlaylistManager } from "@/components/admin/AdminPlaylistManager";
import { AdminTrackForm } from "@/components/admin/AdminTrackForm";
import { useNoctraData } from "@/components/AppFrame";
import { PremiumButton } from "@/components/UI";

export default function AdminPage() {
  const router = useRouter();
  const { tracks, playlists } = useNoctraData();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="page-shell">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow"><span />Admin</p>
          <h1 className="mt-2 text-5xl font-black tracking-normal text-noctra-text md:text-6xl">Control privado</h1>
          <p className="mt-2 text-sm font-semibold text-noctra-muted">Edita el seed, Cloudinary, letras LRC y playlists desde Supabase.</p>
        </div>
        <PremiumButton variant="ghost" onClick={logout}><LogOut size={17} /> Cerrar sesión</PremiumButton>
      </div>

      <div className="space-y-10">
        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.36em] text-noctra-muted">Canciones</p>
          <AdminTrackForm tracks={tracks} />
        </section>
        <section>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.36em] text-noctra-muted">Playlists</p>
          <AdminPlaylistManager playlists={playlists} tracks={tracks} />
        </section>
      </div>
    </div>
  );
}
