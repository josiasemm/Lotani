import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Landmark, Banknote, ShieldCheck, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEjemplar, mxn } from "@/lib/lotani-data";

export const Route = createFileRoute("/checkout/$id")({
  loader: ({ params }) => {
    const ejemplar = getEjemplar(params.id);
    if (!ejemplar) throw notFound();
    return { ejemplar };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Confirmar pago de ${loaderData.ejemplar.nombre} — LOTANI`
          : "Confirmar pago — LOTANI",
      },
      {
        name: "description",
        content:
          "Confirma tu compra con pago protegido por el sistema de escrow de LOTANI hasta recibir al ejemplar.",
      },
      { property: "og:title", content: "Confirmar pago — LOTANI" },
      {
        property: "og:description",
        content: "Pago protegido por escrow hasta la entrega verificada del ejemplar.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const METODOS = [
  { id: "tarjeta", icon: CreditCard, titulo: "Tarjeta de crédito/débito", desc: "Visa, Mastercard, Amex" },
  { id: "spei", icon: Landmark, titulo: "Transferencia SPEI", desc: "Aprobación instantánea" },
  { id: "deposito", icon: Banknote, titulo: "Depósito bancario", desc: "OXXO, 7-Eleven, ventanilla" },
];

function Checkout() {
  const { ejemplar: e } = Route.useLoaderData();
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("tarjeta");

  const envio = 500;
  const comision = 350;
  const total = e.precio + envio + comision;

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Link
          to="/ejemplar/$id"
          params={{ id: e.id }}
          className="text-muted-foreground flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="size-4" /> Volver al ejemplar
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Confirmar pago</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="animate-fade-up space-y-6">
            <div className="panel flex items-center gap-4 p-4">
              <img
                src={e.imagen}
                alt={e.nombre}
                loading="lazy"
                className="size-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{e.nombre}</p>
                <p className="sci text-sm">{e.cientifico}</p>
                <p className="mt-1 flex items-center gap-1 text-xs">
                  <BadgeCheck className="size-3.5 text-primary" /> Vendedor verificado:{" "}
                  <span className="text-gold">{e.criador}</span>
                </p>
              </div>
              <p className="font-semibold text-primary">{mxn(e.precio)}</p>
            </div>

            <div className="panel flex items-start gap-3 border-primary/40 p-4 text-sm">
              <ShieldCheck className="animate-pulse-ring size-5 shrink-0 rounded-full text-primary" />
              <p>
                Tu dinero está protegido por el sistema de <strong>Escrow de LOTANI</strong> hasta
                que recibas al ejemplar.
              </p>
            </div>

            <div>
              <p className="text-muted-foreground mb-3 text-sm">Método de pago</p>
              <div className="space-y-3">
                {METODOS.map(({ id, icon: Icon, titulo, desc }) => (
                  <button
                    key={id}
                    onClick={() => setMetodo(id)}
                    className={`panel flex w-full items-center gap-4 p-4 text-left ${
                      metodo === id ? "border-primary/60" : ""
                    }`}
                  >
                    <span className="rounded-lg bg-secondary p-2 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{titulo}</span>
                      <span className="text-muted-foreground block text-xs">{desc}</span>
                    </span>
                    <span
                      className={`size-4 rounded-full border ${metodo === id ? "border-primary bg-primary" : "border-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="panel animate-fade-up h-fit p-6 lg:sticky lg:top-28">
            <p className="text-muted-foreground text-sm">Detalles del pago</p>
            <dl className="mt-4 space-y-3 text-sm">
              <Fila label="Precio del ejemplar" valor={e.precio} />
              <Fila label="Envío especializado (zoologística)" valor={envio} />
              <Fila label="Comisión de Escrow (compra segura)" valor={comision} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-lg font-semibold">Total a pagar</span>
              <span className="text-lg font-semibold text-gold">
                ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={() => navigate({ to: "/estatus/$id", params: { id: e.id } })}
              className="mt-6 w-full rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform active:scale-95"
            >
              Finalizar compra
            </button>
            <p className="text-muted-foreground mt-3 text-center text-[11px]">
              Al continuar, aceptas los términos de servicio de LOTANI
            </p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Fila({ label, valor }: { label: string; valor: number }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>${valor.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</dd>
    </div>
  );
}