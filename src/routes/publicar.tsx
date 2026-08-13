import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ImagePlus, ShieldCheck, Upload, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSesion } from "@/hooks/use-sesion";

export const Route = createFileRoute("/publicar")({
  head: () => ({
    meta: [
      { title: "Publicar ejemplar — LOTANI" },
      {
        name: "description",
        content:
          "Publica un ejemplar en LOTANI adjuntando su documento de procedencia legal; solo criadores verificados PIMVS/UMA pueden publicar.",
      },
      { property: "og:title", content: "Publicar ejemplar — LOTANI" },
      {
        property: "og:description",
        content: "Toda publicación exige documentación de procedencia legal.",
      },
    ],
  }),
  component: Publicar,
});

function Publicar() {
  const { sesion, listo } = useSesion();
  const [enviado, setEnviado] = useState(false);
  const [doc, setDoc] = useState<string | null>(null);
  const [form, setForm] = useState({ comun: "", cientifico: "", morfo: "", sexo: "N/A", precio: "" });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const puede = form.comun && form.cientifico && form.precio && doc;

  if (listo && (!sesion || sesion.rol !== "criador" || !sesion.verificado)) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <AlertTriangle className="text-warning mx-auto size-10" />
          <h1 className="mt-4 text-2xl font-semibold">Publicación restringida</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Solo los criadores con verificación PIMVS/UMA aprobada pueden publicar ejemplares.
          </p>
          <Link
            to={sesion ? "/verificacion" : "/auth"}
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            {sesion ? "Iniciar verificación" : "Ingresar a LOTANI"}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (enviado) {
    return (
      <SiteLayout>
        <div className="panel animate-fade-up mx-auto my-24 max-w-md p-10 text-center">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <h1 className="mt-4 text-2xl font-semibold">¡Publicación Exitosa!</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Todas las transacciones de tu publicación están protegidas por el sistema de escrow de
            LOTANI.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/explorar" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Ver mi publicación
            </Link>
            <Link to="/perfil" className="rounded-xl border border-border px-5 py-2.5 text-sm">
              Ir a mi perfil
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Nueva publicación</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Publicas como criador verificado. Cada ejemplar debe acreditar su procedencia legal.
        </p>

        <div className="panel mt-8 space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Nombre común" value={form.comun} onChange={set("comun")} />
            <Campo
              label="Nombre científico"
              value={form.cientifico}
              onChange={set("cientifico")}
            />
            <Campo label="Morfo / mutación" value={form.morfo} onChange={set("morfo")} />
            <label className="block">
              <span className="text-muted-foreground text-sm">Sexo</span>
              <select
                value={form.sexo}
                onChange={(e) => set("sexo")(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
              >
                <option>Macho</option>
                <option>Hembra</option>
                <option>N/A</option>
              </select>
            </label>
            <Campo label="Precio (MXN)" value={form.precio} onChange={set("precio")} />
          </div>

          <div className="border-warning/40 bg-warning/10 flex items-start gap-3 rounded-xl border p-4 text-sm">
            <AlertTriangle className="text-warning size-5 shrink-0" />
            <p>
              Sin el documento de procedencia legal tu publicación no puede ser aprobada por el
              equipo de LOTANI.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center text-sm">
            <Upload className="size-6 text-primary" />
            {doc ?? "Documento de procedencia legal (PDF/JPG)"}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setDoc(e.target.files?.[0]?.name ?? null)}
            />
          </label>

          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="text-muted-foreground flex aspect-square items-center justify-center rounded-xl border border-dashed border-border"
              >
                <ImagePlus className="size-5" />
              </div>
            ))}
          </div>

          <button
            disabled={!puede}
            onClick={() => setEnviado(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
          >
            <ShieldCheck className="size-4" /> Publicar ejemplar
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}

function Campo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-muted-foreground text-sm">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}