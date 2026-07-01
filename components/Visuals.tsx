"use client";

import clsx from "clsx";

export function DynamicAmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-noctra-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_12%,rgba(255,77,141,0.18),transparent_30%),radial-gradient(circle_at_70%_18%,rgba(56,189,248,0.12),transparent_34%),radial-gradient(circle_at_42%_82%,rgba(139,92,246,0.16),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,3,6,.94),rgba(4,3,6,.62)_42%,rgba(0,20,26,.9))]" />
    </div>
  );
}

export function MiniWaveVisualizer({ active = true, className }: { active?: boolean; className?: string }) {
  return (
    <div className={clsx("flex h-14 items-end gap-[3px]", className)} aria-hidden>
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          className={clsx(
            "w-1 rounded-full bg-gradient-to-t from-noctra-blue via-noctra-pink to-noctra-violet",
            active && "wave-bar"
          )}
          style={{
            height: `${18 + Math.sin(index * 0.65) * 14 + (index % 5) * 2}px`,
            animationDelay: `${index * 34}ms`
          }}
        />
      ))}
    </div>
  );
}

export function AudioVisualizer({ active = true }: { active?: boolean }) {
  return (
    <div className="relative h-16 w-full overflow-hidden">
      <MiniWaveVisualizer active={active} className="absolute bottom-2 left-0 right-0" />
      <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-white/20" />
    </div>
  );
}

export function CockpitGauge({
  value,
  label,
  tone
}: {
  value: number;
  label: string;
  tone: "red" | "blue";
}) {
  const rotation = -118 + value * 23;
  return (
    <div className="relative grid aspect-square w-[min(25vw,300px)] min-w-48 place-items-center">
      <div
        className={clsx(
          "absolute inset-0 rounded-full opacity-70 blur-2xl",
          tone === "red" ? "bg-rose-600/20" : "bg-sky-500/20"
        )}
      />
      <div className="gauge-ring" />
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-3 w-px origin-[50%_112px] bg-white/25"
          style={{ transform: `rotate(${-132 + index * 9.8}deg) translateY(-112px)` }}
        />
      ))}
      <div
        className={clsx("gauge-arc", tone === "red" ? "border-rose-400" : "border-sky-400")}
        style={{ transform: "rotate(-38deg)" }}
      />
      <div className="absolute h-[42%] w-1 origin-bottom rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.7)]" style={{ transform: `translateY(-48%) rotate(${rotation}deg)` }} />
      <div className="absolute h-4 w-4 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.9)]" />
      <div className="relative mt-28 text-center">
        <p className="text-4xl font-black text-noctra-text">{value.toFixed(1)}</p>
        <p className={clsx("text-[9px] font-bold uppercase", tone === "red" ? "text-rose-300" : "text-sky-300")}>
          {label}
        </p>
      </div>
    </div>
  );
}
