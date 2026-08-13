import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Lock, MessageSquare, Package, VenusAndMars, Calendar, Palette, Ruler } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { CareSheet } from "@/components/CareSheet";
import { LegalProvenance } from "@/components/LegalProvenance";
import { getEjemplar, mxn } from "@/lib/lotani-data";

export const Route = createFileRoute("/ejemplar/$id")({
  loader: ({ params }) => {
    const ejemplar = getEjemplar(params.id);
    if (!ejemplar) throw notFound();
    return { ejemplar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Ejemplar no disponible — LOTANI" }, { name: "robots", content: "noindex" }] };
    }
    const e = loaderData.ejemplar;
    return {
      meta: [
        { title: `${e.nombre} (${e.cientifico}) — LOTANI` },
        { name: "description", content: `${e.descripcion.slice(0, 150)}` },
        { property: "og:title", content: `${e.nombre} — ${mxn(e.precio)} · LOTANI` },
        { property: "og:description", content: e.descripcion.slice(0, 150) },
      ],
    };
  },
  component: Detalle,
});

function Dato({ icon, label, valor }: { icon: React.ReactNode; label: string; valor: string }) {
  return (
    <div className="panel flex items-center gap-3 p-4">
      <span className="rounded-lg bg-secondary p-2 text-primary">{icon}</span>
      <div>
        <p className="text-muted-foreground text-[11px] uppercase tracking-wide">{label}</p>
        <p className="font-medium">{valor}</p>
      </div>
    </div>
  );
}

function Detalle() {
  const { ejemplar: e } = Route.useLoaderData();
  const [listo, setListo] = useState(false);

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <Link to="/explorar" className="text-muted-foreground flex items-center gap-2 text-sm">
          <ArrowLeft className="size-4" /> Detalle del ejemplar
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="animate-fade-up">
            <img
              src={e.imagen}
              alt={e.nombre}
              width={1024}
              height={768}
              className="w-full rounded-3xl object-cover"
            />
            <div className="mt-4 flex gap-3">
              {[0, 1, 2].map((i) => (
                <img
                  key={i}
                  src={e.imagen}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="size-20 rounded-xl object-cover opacity-70"
                />
              ))}
            </div>
          </div>

          <div className="animate-fade-up space-y-6">
            <div>
              <span className="flex items-center gap-1 text-sm text-primary">
                <BadgeCheck className="size-4" /> {e.verificacion}
              </span>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{e.nombre}</h1>
              <p className="sci">{e.cientifico}</p>
              <p className="mt-3 text-3xl font-semibold text-gold">{mxn(e.precio)}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Dato icon={<VenusAndMars className="size-4" />} label="Género" valor={e.genero} />
              <Dato icon={<Calendar className="size-4" />} label="Edad" valor={e.edad} />
              <Dato icon={<Palette className="size-4" />} label="Morfismo" valor={e.morfismo} />
              <Dato icon={<Ruler className="size-4" />} label="Longitud" valor={e.longitud} />
            </div>

            <LegalProvenance registro={e.registro} criador={e.criador} />

            <div>
              <h2 className="text-xl font-semibold">Descripción detallada</h2>
              <p className="text-muted-foreground mt-2 text-sm">{e.descripcion}</p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold">Ficha técnica de cuidados</h2>
              <CareSheet ficha={e.ficha} />
              <Link
                to="/guias"
                className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
              >
                Ver guía completa
              </Link>
            </div>

            <div className="panel flex items-center gap-4 p-4">
              <Package className="size-8 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Kit recomendado</p>
                <p className="font-medium">{e.kit}</p>
              </div>
              <button className="text-sm text-primary">Ver paquete sugerido →</button>
            </div>

            <label className="panel flex items-start gap-3 p-4 text-sm">
              <input
                type="checkbox"
                checked={listo}
                onChange={(ev) => setListo(ev.target.checked)}
                className="mt-1 size-4 accent-[oklch(0.825_0.06_150)]"
              />
              ¿Tienes el terrario adecuado antes de recibir al ejemplar?
            </label>

            <div className="flex gap-3">
              <button
                aria-label="Contactar al criador"
                className="panel flex size-12 items-center justify-center text-primary"
              >
                <MessageSquare className="size-5" />
              </button>
              <Link
                to="/checkout/$id"
                params={{ id: e.id }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform active:scale-95 ${
                  listo ? "" : "pointer-events-none opacity-40"
                }`}
              >
                <Lock className="size-4" />
                {listo ? "Entendido, comprar con escrow seguro" : "Confirma el terrario para continuar"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}