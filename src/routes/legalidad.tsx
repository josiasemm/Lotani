import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ChevronRight, ExternalLink, Globe, IdCard, FileSignature, FileText } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { EJEMPLARES } from "@/lib/lotani-data";

export const Route = createFileRoute("/legalidad")({
  head: () => ({
    meta: [
      { title: "Trámites y expediente legal de tus ejemplares — LOTANI" },
      {
        name: "description",
        content:
          "Consulta el ID oficial LOTANI, estatus legal y expediente documental (titularidad, nota de aprovechamiento, marcaje y CITES) de cada ejemplar.",
      },
      { property: "og:title", content: "Trámites — LOTANI" },
      {
        property: "og:description",
        content: "Registro y datos legales de tus ejemplares en un solo lugar.",
      },
    ],
  }),
  component: Legalidad,
});

function Legalidad() {
  const e = EJEMPLARES[0]!;

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Trámites</h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          Un apartado para que tengas siempre a la mano el registro y los datos legales de tu
          ejemplar.
        </p>

        <div className="panel animate-fade-up mt-8 flex items-center gap-4 p-5">
          <img
            src={e.imagen}
            alt={e.nombre}
            loading="lazy"
            className="size-16 rounded-full border border-primary/40 object-cover"
          />
          <div>
            <p className="text-lg font-semibold">Leviatán</p>
            <p className="text-muted-foreground text-sm">{e.nombre}</p>
            <p className="flex items-center gap-1 text-xs text-primary">
              <BadgeCheck className="size-3.5" /> Verificado
            </p>
          </div>
        </div>

        <div className="panel animate-fade-up mt-6 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            ID Oficial LOTANI
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Leviatán</h2>
          <p className="text-muted-foreground">{e.nombre}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[200px_1fr]">
            <img
              src={e.imagen}
              alt={e.nombre}
              loading="lazy"
              className="h-32 w-full rounded-xl object-cover"
            />
            <div className="space-y-3">
              <div className="rounded-xl border border-border p-3">
                <p className="text-muted-foreground text-xs">ID</p>
                <p className="font-medium">986596895689568</p>
              </div>
              <div className="rounded-xl bg-primary/15 p-3">
                <p className="text-muted-foreground text-xs">Estatus Legal</p>
                <p className="font-medium text-primary">Vigente</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">Registrado: 3 de agosto 2026</p>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Expediente</h2>
        <div className="mt-5 space-y-4">
          <button className="panel flex w-full items-center gap-4 p-5 text-left">
            <span className="rounded-lg bg-secondary p-2.5 text-gold">
              <IdCard className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium">Titularidad</span>
              <span className="text-muted-foreground block text-sm">
                INE, comprobante de domicilio
              </span>
            </span>
            <ChevronRight className="text-muted-foreground size-5" />
          </button>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-5">
              <div className="flex items-start justify-between">
                <FileText className="size-5 text-primary" />
                <ExternalLink className="text-muted-foreground size-4" />
              </div>
              <p className="mt-3 font-medium">Nota de aprovechamiento</p>
              <p className="text-sm text-primary">Vigente</p>
            </div>
            <div className="panel p-5">
              <div className="flex items-start justify-between">
                <FileSignature className="size-5 text-warning" />
                <ExternalLink className="text-muted-foreground size-4" />
              </div>
              <p className="mt-3 font-medium">Formato de marcaje</p>
              <p className="text-warning text-sm">Requiere firma</p>
            </div>
          </div>

          <div className="panel flex items-center gap-4 p-5 opacity-70">
            <Globe className="size-5" />
            <div>
              <p className="font-medium">Permiso CITES</p>
              <p className="text-muted-foreground text-sm">No requerido para esta especie</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}