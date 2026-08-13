import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, ShieldCheck, BookOpen, User } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ChatWidget } from "@/components/ChatWidget";
import { useSesion } from "@/hooks/use-sesion";

const NAV = [
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/legalidad", label: "Legalidad", icon: ShieldCheck },
  { to: "/guias", label: "Guías", icon: BookOpen },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const { sesion } = useSesion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-4 sm:px-6">
          <Link to="/explorar" className="text-foreground">
            <Logo className="h-6" />
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  pathname === to
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 md:ml-0">
            {sesion?.rol === "criador" && (
              <Link
                to="/publicar"
                className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform active:scale-95 sm:block"
              >
                Publicar ejemplar
              </Link>
            )}
            <Link
              to="/perfil"
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-primary"
            >
              {sesion ? sesion.nombre.slice(0, 1).toUpperCase() : <User className="size-4" />}
            </Link>
          </div>
        </div>
        <nav className="flex items-center justify-around border-t border-border px-2 py-2 md:hidden">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-[11px] ${
                pathname === to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border bg-card/40">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <Logo className="h-6 text-foreground" />
            <p className="text-muted-foreground mt-3 max-w-xs text-sm">
              Plataforma comprometida con el comercio legal de fauna silvestre en México.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest">Plataforma</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link to="/explorar">Explorar catálogo</Link>
              </li>
              <li>
                <Link to="/guias">Guías de cuidado</Link>
              </li>
              <li>
                <Link to="/legalidad">Trámites</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest">Criadores</h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <Link to="/verificacion">Verificación PIMVS/UMA</Link>
              </li>
              <li>
                <Link to="/publicar">Publicar ejemplar</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest">Legal</h4>
            <p className="text-muted-foreground text-sm">
              LOTANI no sustituye la asesoría oficial de SEMARNAT. Toda publicación exige
              documentación de procedencia legal.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground border-t border-border py-5 text-center text-xs">
          © 2026 LOTANI · Marketplace de fauna exótica legal
        </p>
      </footer>

      <ChatWidget />
    </div>
  );
}