import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Truck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEjemplar } from "@/lib/lotani-data";

export const Route = createFileRoute("/estatus/$id")({
  loader: ({ params }) => {
    const ejemplar = getEjemplar(params.id);
    if (!ejemplar) throw notFound();
    return { ejemplar };
  },
  head: () => ({
    meta: [
      { title: "Estatus de compra segura — LOTANI" },
      {
        name: "description",
        content:
          "Sigue el estado de tu compra protegida con escrow: pago resguardado, documentación validada y confirmación de recepción.",
      },
      { property: "og:title", content: "Estatus de compra segura — LOTANI" },
      { property: "og:description", content: "Escrow activo hasta que confirmes la recepción." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Estatus,
});

const PASOS = [
  {
    titulo: "Pago recibido y resguardado en Escrow",
    desc: "Completado el 2 de agosto, 5:49",
    hecho: true,
  },
  {
    titulo: "Documentación CITES/Factura validada",
    desc: "Verificado por agentes LOTANI",
    hecho: true,
  },
  {
    titulo: "Confirmación de llegada y salud",
    desc: "Requiere tu validación en la plataforma",
    hecho: false,
  },
];

function Estatus() {
  const { ejemplar } = Route.useLoaderData();
  const [copiado, setCopiado] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Link to="/explorar" className="text-muted-foreground flex items-center gap-2 text-sm">
          <ArrowLeft className="size-4" /> Explorar
        </Link>
        <h1 className="mt-4 text-center text-3xl font-semibold">Estatus de compra segura</h1>
        <p className="text-muted-foreground mt-1 text-center text-xs uppercase tracking-widest">
          Order ID 454543453 · {ejemplar.nombre}
        </p>

        <div className="panel animate-fade-up mt-8 flex items-start gap-4 p-5">
          <span className="animate-pulse-ring rounded-full bg-primary/15 p-2 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-primary">Protección Escrow Activa</p>
            <p className="text-muted-foreground text-sm">
              Tus fondos están resguardados en custodia hasta que confirmes la recepción en buen
              estado.
            </p>
          </div>
        </div>

        <div className="panel animate-fade-up mt-6 space-y-6 p-6">
          {PASOS.map((p, i) => (
            <div key={p.titulo} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex size-6 items-center justify-center rounded-full ${
                    p.hecho ? "bg-primary text-primary-foreground" : "border border-primary/50"
                  }`}
                >
                  {p.hecho && <Check className="size-3.5" />}
                </span>
                {i < PASOS.length - 1 && <span className="my-1 w-px flex-1 bg-primary/30" />}
              </div>
              <div className={p.hecho ? "" : "opacity-70"}>
                <p className="font-medium">{p.titulo}</p>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 rounded-xl bg-background p-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Llegada estimada</p>
              <p className="text-muted-foreground text-sm">15 de agosto, 2026 · 18:00 hrs</p>
            </div>
            <Truck className="size-6 text-primary" />
          </div>
        </div>

        <div className="panel mt-6 flex items-center gap-4 p-4">
          <p className="flex-1 text-sm">Guía: #323423 — Zoologista animal</p>
          <button
            onClick={() => {
              void navigator.clipboard?.writeText("#323423");
              setCopiado(true);
            }}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
          >
            <Copy className="size-3.5" /> {copiado ? "Copiado" : "Copiar"}
          </button>
        </div>

        <button
          onClick={() => setConfirmado(true)}
          className="mt-6 w-full rounded-xl bg-primary py-4 font-medium text-primary-foreground transition-transform active:scale-95"
        >
          {confirmado ? "Recepción confirmada · fondos liberados" : "Confirmar recepción"}
        </button>
        <p className="text-muted-foreground mt-3 text-center text-xs">
          Tienes 24 hrs tras la entrega para validar la salud del ejemplar antes de liberar los
          fondos al vendedor.
        </p>
      </div>
    </SiteLayout>
  );
}