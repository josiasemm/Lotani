import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Leaf, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import hero from "@/assets/hero-reserva.jpg";


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
      <img
        src={hero}
        alt="Paisaje de reserva natural con niebla"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/60 to-background" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <Logo className="animate-fade-up h-12 text-foreground sm:h-16" />
        <h1 className="animate-fade-up mt-8 text-3xl font-semibold tracking-tight sm:text-5xl">
          El comercio legal de fauna exótica, por fin en un solo lugar
        </h1>
        <p className="text-muted-foreground animate-fade-up mt-5 max-w-2xl text-base sm:text-lg">
          Criadores certificados PIMVS/UMA, documentación de procedencia legal en cada publicación
          y pago protegido con escrow.
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/auth"
            className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-transform active:scale-95"
          >
            Ingresar a LOTANI
          </Link>
          <Link
            to="/explorar"
            className="rounded-full border border-foreground/30 px-8 py-3 font-medium transition-colors hover:bg-foreground/5"
          >
            Descubrir ejemplares
          </Link>
        </div>


        <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Criadores verificados", d: "Validación PIMVS/UMA ante SEMARNAT" },
            { icon: Lock, t: "Pago con escrow", d: "Fondos resguardados hasta la recepción" },
            { icon: Leaf, t: "Asistente IA", d: "Dudas legales y fichas de cuidado" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="panel p-5 text-left">
              <Icon className="size-5 text-primary" />
              <p className="mt-3 font-semibold">{t}</p>
              <p className="text-muted-foreground text-sm">{d}</p>
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
