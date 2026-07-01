"use client";

import { Lock, LogIn } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PremiumButton } from "@/components/UI";

export function AdminLoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const json = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) {
      setError(json.error ?? "No se pudo iniciar sesión");
      return;
    }
    router.replace(search.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="glass-panel mx-auto flex w-full max-w-md flex-col gap-5 rounded-[30px] p-7">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-black"><Lock size={22} /></div>
      <div>
        <p className="eyebrow"><span />Admin secreto</p>
        <h1 className="mt-3 text-4xl font-black text-noctra-text">Acceso privado</h1>
        <p className="mt-2 text-sm font-semibold text-noctra-muted">Entra para editar canciones, URLs de Cloudinary, favoritos y letras LRC.</p>
      </div>
      <input className="admin-input" type="password" placeholder="Contraseña admin" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
      {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm font-semibold text-rose-100">{error}</p>}
      <PremiumButton disabled={loading} type="submit"><LogIn size={18} /> {loading ? "Entrando..." : "Entrar"}</PremiumButton>
    </form>
  );
}
