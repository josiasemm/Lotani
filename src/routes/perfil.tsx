import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Package,
  Truck,
  Heart,
  FileCheck,
  CreditCard,
  LifeBuoy,
  LogOut,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSesion } from "@/hooks/use-sesion";
import { clearSesion } from "@/lib/session";
import { CRIADOR } from "@/lib/lotani-data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil LOTANI — Actividad, seguridad y legalidad" },
      {
        name: "description",
        content:
          "Gestiona tus publicaciones, pedidos en curso, favoritos, documentación verificada y métodos de pago en LOTANI.",
      },
      { property: "og:title", content: "Mi perfil — LOTANI" },
      { property: "og:description", content: "Tu actividad y documentación legal en LOTANI." },
    ],
  }),
  component: Perfil,
});

const ACTIVIDAD = [
  { icon: Package, label: "Mis publicaciones" },
  { icon: Truck, label: "Pedidos en curso" },
  { icon: Heart, label: "Favoritos" },
];
const SEGURIDAD = [
  { icon: FileCheck, label: "Documentación verificada" },
  { icon: CreditCard, label: "Métodos de pago" },
  { icon: LifeBuoy, label: "Centro de ayuda" },
];

function Perfil() {
  const { sesion, listo } = useSesion();
  const navigate = useNavigate();

  if (listo && !sesion) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold">Inicia sesión para ver tu perfil</h1>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Ingresar a LOTANI
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
        <div className="panel animate-fade-up flex flex-wrap items-center gap-5 p-6">
          <span className="flex size-20 items-center justify-center rounded-full bg-primary/20 text-2xl font-semibold text-primary">
            {sesion?.nombre.slice(0, 1).toUpperCase()}
          </span>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{sesion?.nombre}</h1>
            <p className="text-muted-foreground text-sm">Miembro desde 2026</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-primary">
              <BadgeCheck className="size-3.5" />
              {sesion?.rol === "criador"
                ? sesion.verificado
                  ? `Criador verificado · ${CRIADOR.registro}`
                  : "Verificación PIMVS/UMA en revisión"
                : "Comprador de fauna legal"}
            </p>
          </div>
          {sesion?.rol === "criador" && (
            <Link
              to={sesion.verificado ? "/publicar" : "/verificacion"}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              {sesion.verificado ? "Publicar ejemplar" : "Continuar verificación"}
            </Link>
          )}
        </div>

        <Seccion titulo="Gestión de actividad" items={ACTIVIDAD} />
        <Seccion titulo="Seguridad y legalidad" items={SEGURIDAD} />

        <button
          onClick={() => {
            clearSesion();
            void navigate({ to: "/" });
          }}
          className="text-destructive mt-10 flex items-center gap-2 text-sm"
        >
          <LogOut className="size-4" /> Cerrar sesión
        </button>
      </div>
    </SiteLayout>
  );
}

function Seccion({
  titulo,
  items,
}: {
  titulo: string;
  items: { icon: React.ElementType; label: string }[];
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">{titulo}</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(({ icon: Icon, label }) => (
          <button key={label} className="panel flex items-center gap-3 p-4 text-left">
            <Icon className="size-5 text-primary" />
            <span className="flex-1 text-sm">{label}</span>
            <ChevronRight className="text-muted-foreground size-4" />
          </button>
        ))}
      </div>
    </section>
  );
}