import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Leaf, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { HeroScene } from "@/components/HeroScene";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOTANI — Marketplace de fauna exótica legal en México" },
      {
        name: "description",
        content:
          "Compra y vende fauna exótica con procedencia legal verificada: criadores PIMVS/UMA, trazabilidad SEMARNAT y pago protegido con escrow.",
      },
      { property: "og:title", content: "LOTANI — Fauna exótica legal, verificada y protegida" },
      {
        property: "og:description",
        content:
          "Catálogo verificado, documentación de procedencia legal y escrow seguro para el comercio de fauna exótica en México.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/10 to-background/50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 32%, color-mix(in oklab, var(--background) 78%, transparent) 0%, color-mix(in oklab, var(--background) 45%, transparent) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <Logo className="animate-fade-up h-12 text-foreground sm:h-16" />
        <h1 className="animate-fade-up mt-8 text-3xl font-semibold tracking-tight sm:text-5xl">
          El comercio legal de fauna exótica, por fin en un solo lugar
        </h1>
        <p className="animate-fade-up mt-5 max-w-2xl text-base text-[#EDF2EC] sm:text-lg">
          Criadores certificados PIMVS/UMA, documentación de procedencia legal en cada publicación
          y pago protegido con escrow.
        </p>

        <p className="animate-fade-up mt-4 text-sm font-medium text-[#C8E0C9]">
          +120 criadores verificados · +850 ejemplares con procedencia legal · 100% pagos con escrow
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/explorar"
            className="rounded-full bg-[#A9D3B0] px-8 py-3 font-bold text-[#101B14] transition-transform active:scale-95"
          >
            Ver catálogo — sin registro
          </Link>
          <Link
            to="/auth"
            className="rounded-full border border-foreground/30 px-8 py-3 font-normal transition-colors hover:bg-foreground/5"
          >
            Ya tengo cuenta
          </Link>
        </div>


        <div className="mt-44 grid w-full gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Criadores verificados", d: "Validación PIMVS/UMA ante SEMARNAT" },
            { icon: Lock, t: "Pago con escrow", d: "Fondos resguardados hasta la recepción" },
            { icon: Leaf, t: "Asistente IA", d: "Dudas legales y fichas de cuidado" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="panel border border-[#2A3C2E] p-5 text-left">
              <Icon className="size-5 text-primary" />
              <p className="mt-3 font-semibold">{t}</p>
              <p className="text-sm text-[#EDF2EC]">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground relative pb-8 text-center text-xs">
        Plataforma comprometida con el comercio legal de fauna silvestre
      </p>
    </div>
  );
}
