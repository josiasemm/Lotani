import { createFileRoute } from "@tanstack/react-router";
import { Clock, ChevronRight, FileText, ScrollText, Stamp } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { GUIAS, RECURSOS_LEGALES } from "@/lib/lotani-data";

export const Route = createFileRoute("/guias")({
  head: () => ({
    meta: [
      { title: "Guías de cuidado y recursos legales — LOTANI" },
      {
        name: "description",
        content:
          "Manuales de cuidado para tortugas, serpientes y artrópodos, más recursos de trámites CITES, PIMVS/UMA y procedencia legal.",
      },
      { property: "og:title", content: "Guías de cuidado — LOTANI" },
      {
        property: "og:description",
        content: "Aprende parámetros de terrario y trámites legales antes de comprar.",
      },
    ],
  }),
  component: Guias,
});

const ICONOS = [FileText, Stamp, ScrollText];

function Guias() {
  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Guías de cuidado</h1>

        <h2 className="mt-10 text-xl font-semibold">Guías destacadas</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {GUIAS.map((g) => (
            <article
              key={g.id}
              className="panel animate-fade-up group relative overflow-hidden"
            >
              <img
                src={g.imagen}
                alt={g.titulo}
                loading="lazy"
                width={1024}
                height={768}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/85 to-transparent p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-primary">
                    {g.nivel}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> {g.lectura}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{g.titulo}</h3>
                <p className="text-muted-foreground text-sm">{g.resumen}</p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-semibold">Recursos legales y trámite</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {RECURSOS_LEGALES.map((r, i) => {
            const Icon = ICONOS[i] ?? FileText;
            return (
              <button key={r.titulo} className="panel flex items-center gap-4 p-5 text-left">
                <span className="rounded-lg bg-secondary p-2.5 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{r.titulo}</span>
                  <span className="text-muted-foreground block text-sm">{r.desc}</span>
                </span>
                <ChevronRight className="text-muted-foreground size-5" />
              </button>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}