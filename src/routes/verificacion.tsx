import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, ShieldCheck, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useSesion } from "@/hooks/use-sesion";
import { setSesion } from "@/lib/session";
import { CRIADOR } from "@/lib/lotani-data";

export const Route = createFileRoute("/verificacion")({
  head: () => ({
    meta: [
      { title: "Verificación de criador PIMVS/UMA — LOTANI" },
      {
        name: "description",
        content:
          "Sube tu constancia SEMARNAT y número de registro PIMVS/UMA para publicar ejemplares con procedencia legal garantizada.",
      },
      { property: "og:title", content: "Verificación de criador — LOTANI" },
      {
        property: "og:description",
        content: "Documentación, revisión y aprobación en 3 pasos.",
      },
    ],
  }),
  component: Verificacion,
});

const PASOS = ["Documentación", "Revisión", "Resultado"];

function Verificacion() {
  const { sesion } = useSesion();
  const [paso, setPaso] = useState(1);
  const [registro, setRegistro] = useState("");
  const [archivo, setArchivo] = useState<{ nombre: string; peso: string } | null>(null);

  const aprobar = () => {
    if (sesion) setSesion({ ...sesion, verificado: true });
    setPaso(3);
  };

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold">Verificación de criador</h1>

        <div className="mt-8 flex items-center gap-3">
          {PASOS.map((p, i) => (
            <div key={p} className="flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: paso > i ? "100%" : "0%" }}
                />
              </div>
              <p
                className={`mt-2 text-xs ${paso > i ? "text-primary" : "text-muted-foreground"}`}
              >
                {i + 1}. {p}
              </p>
            </div>
          ))}
        </div>

        {paso === 1 && (
          <div className="panel animate-fade-up mt-8 space-y-5 p-6">
            <label className="block">
              <span className="text-muted-foreground text-sm">Número de registro PIMVS/UMA</span>
              <input
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
                placeholder="DGVSPIMVSCREX0000DF"
                className="placeholder:text-muted-foreground mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary/60"
              />
            </label>

            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-center">
              <Upload className="size-6 text-primary" />
              <span className="text-sm">Cargar constancia oficial SEMARNAT (PDF/JPG)</span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f)
                    setArchivo({ nombre: f.name, peso: `${(f.size / 1024).toFixed(0)} KB` });
                }}
              />
            </label>

            {archivo && (
              <div className="flex items-center gap-3 rounded-xl bg-secondary p-3 text-sm">
                <FileText className="size-4 text-primary" />
                <span className="flex-1">{archivo.nombre}</span>
                <span className="text-muted-foreground">{archivo.peso}</span>
              </div>
            )}

            <button
              disabled={!registro || !archivo}
              onClick={() => setPaso(2)}
              className="w-full rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
            >
              Enviar documentación
            </button>
          </div>
        )}

        {paso === 2 && (
          <div className="panel animate-fade-up mt-8 space-y-4 p-8 text-center">
            <Clock className="mx-auto size-10 text-warning" />
            <h2 className="text-xl font-semibold">Documentación en Revisión</h2>
            <p className="text-muted-foreground text-sm">
              Nuestro equipo valida tu constancia ante SEMARNAT en 24-48 hrs. Te avisaremos por
              correo cuando tu perfil quede aprobado.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/explorar"
                className="rounded-xl border border-border px-5 py-2.5 text-sm"
              >
                Ir a inicio
              </Link>
              <button
                onClick={aprobar}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Simular aprobación
              </button>
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="panel animate-fade-up mt-8 space-y-4 p-8 text-center">
            <ShieldCheck className="animate-pulse-ring mx-auto size-12 rounded-full text-primary" />
            <h2 className="text-xl font-semibold text-primary">
              Procedencia legal Garantizada
            </h2>
            <p className="text-muted-foreground text-sm">
              Registro SEMARNAT visible en tus publicaciones:{" "}
              <span className="text-foreground">{registro || CRIADOR.registro}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="rounded-xl border border-gold/60 px-5 py-2.5 text-sm text-gold">
                Ver documentación
              </button>
              <Link
                to="/publicar"
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Publicar ejemplar
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}