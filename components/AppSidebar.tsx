"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Heart, Home, Library, ListMusic, Search, Settings, Shield, SlidersHorizontal } from "lucide-react";
import clsx from "clsx";
import { LOGO_URL } from "@/lib/seed-data";

const nav = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/library", label: "Biblioteca", icon: Library },
  { href: "/playlists", label: "Playlists", icon: ListMusic },
  { href: "/now-playing", label: "Reproduciendo", icon: Heart },
  { href: "/night-drive", label: "Night Drive", icon: Gauge },
  { href: "/settings", label: "Ajustes", icon: Settings },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/[0.08] bg-[#07040b]/88 px-5 py-8 backdrop-blur-2xl md:block">
      <Link href="/" className="block">
        <img
          src={LOGO_URL}
          alt="NOCTRA"
          className="mb-3 h-9 w-auto object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <h1 className="text-3xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-noctra-pink via-white to-noctra-violet">
          NOCTRA
        </h1>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.62em] text-noctra-muted">Escucha privada</p>
      </Link>

      <button className="mt-8 flex h-11 w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-noctra-muted">
        <span className="flex items-center gap-3"><Search size={17} /> Spotlight</span>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px]">⌘K</span>
      </button>

      <nav className="mt-8 space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group relative flex h-12 items-center gap-3 rounded-full px-4 text-sm font-bold text-noctra-muted transition",
                active && "border border-white/10 bg-white/[0.08] text-noctra-text",
                !active && "hover:bg-white/[0.04] hover:text-noctra-text"
              )}
            >
              {active && <span className="absolute left-0 h-6 w-1 rounded-r bg-gradient-to-b from-noctra-pink to-noctra-violet" />}
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-noctra-muted">
        <div className="mb-3 flex items-center gap-2 text-noctra-text"><SlidersHorizontal size={16} /> Privado</div>
        Sin compartir, sin superficie publica. Solo tu noche.
      </div>
    </aside>
  );
}
