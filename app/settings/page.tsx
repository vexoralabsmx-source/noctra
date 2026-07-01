"use client";

import { BarChart3, Lock, Music2, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { Quality } from "@/lib/types";

const settings = [
  { icon: Sparkles, title: "Animaciones avanzadas", subtitle: "Transiciones suaves y movimiento cinematográfico." },
  { icon: BarChart3, title: "Visualizador de audio", subtitle: "Visual reactiva en Reproduciendo y Night Drive." },
  { icon: Music2, title: "Reproducción automática", subtitle: "Continúa con la siguiente canción." },
  { icon: Lock, title: "Modo privado", subtitle: "Sin compartir, sin superficies públicas. Siempre activo." }
];

export default function SettingsPage() {
  const [quality, setQuality] = useState<Quality>("Ultra");
  const [enabled, setEnabled] = useState([true, true, true, true]);

  return (
    <div className="page-shell max-w-3xl">
      <p className="eyebrow"><span />Ajustes</p>
      <h1 className="mt-2 text-5xl font-black tracking-normal text-noctra-text md:text-6xl">Preferencias</h1>

      <div className="mt-9 space-y-4">
        {settings.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={item.title} className="glass-panel flex w-full items-center gap-5 rounded-[24px] p-5 text-left" onClick={() => setEnabled((state) => state.map((value, i) => (i === index ? !value : value)))}>
              <Icon className="text-noctra-violet" size={22} />
              <span className="min-w-0 flex-1">
                <span className="block font-black text-noctra-text">{item.title}</span>
                <span className="mt-1 block text-xs font-semibold text-noctra-muted">{item.subtitle}</span>
              </span>
              <span className={clsx("relative h-7 w-[52px] rounded-full bg-white transition", enabled[index] ? "bg-white" : "bg-white/20")}>
                <span className={clsx("absolute top-1 h-5 w-5 rounded-full bg-black transition", enabled[index] ? "right-1" : "left-1")} />
              </span>
            </button>
          );
        })}

        <div className="glass-panel rounded-[24px] p-5">
          <p className="font-black text-noctra-text">Calidad visual</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {(["Baja", "Media", "Ultra"] as Quality[]).map((item) => (
              <button key={item} className={clsx("h-12 rounded-full border border-white/10 text-sm font-bold", quality === item ? "bg-white text-black" : "bg-white/[0.04] text-noctra-text")} onClick={() => setQuality(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel flex items-center justify-between rounded-[24px] p-5">
          <div>
            <p className="font-black text-noctra-text">Limpiar historial</p>
            <p className="mt-1 text-xs font-semibold text-noctra-muted">Borra Reproducido recientemente de este dispositivo.</p>
          </div>
          <button className="player-icon border border-white/10 bg-white/[0.04]"><Trash2 size={17} /></button>
        </div>
      </div>

      <p className="mt-8 text-xs font-semibold text-noctra-muted">
        Shortcuts: Space reproducir/pausar, ←/→ anterior/siguiente, N Night Drive, L Letras, ⌘K buscar.
      </p>
    </div>
  );
}
