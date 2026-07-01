"use client";

import clsx from "clsx";
import { Play } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function GlassPanel({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={clsx("glass-panel", className)}>{children}</section>;
}

export function PremiumButton({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition active:scale-[0.98]",
        variant === "primary" && "bg-noctra-text text-black hover:bg-white",
        variant === "ghost" && "border border-white/10 bg-white/[0.04] text-noctra-text hover:bg-white/[0.08]",
        variant === "danger" && "border border-rose-400/25 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TagPill({ children, tone = "violet" }: { children: ReactNode; tone?: "violet" | "blue" | "red" }) {
  return <span className={clsx("tag-pill", `tag-pill-${tone}`)}>{children}</span>;
}

export function EmptyCover({ className }: { className?: string }) {
  return (
    <div className={clsx("grid place-items-center rounded-[22px] bg-white/[0.05] text-noctra-muted", className)}>
      <Play size={28} />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  action
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow"><span />{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-normal text-noctra-text md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
