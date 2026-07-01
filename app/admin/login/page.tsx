import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Suspense fallback={<div className="text-sm font-semibold text-noctra-muted">Abriendo acceso privado...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
