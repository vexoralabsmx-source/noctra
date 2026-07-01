import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppFrame } from "@/components/AppFrame";

export const metadata: Metadata = {
  title: "NOCTRA",
  description: "App privada de musica para escuchar de noche."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
