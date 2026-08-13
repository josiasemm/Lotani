import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SpecimenCard, SpecimenSkeleton } from "@/components/SpecimenCard";
import { CATEGORIAS, EJEMPLARES, type Categoria, type Manejo } from "@/lib/lotani-data";
import hero from "@/assets/hero-reserva.jpg";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar ejemplares legales — LOTANI" },
      {
        name: "description",
        content:
          "Catálogo de tortugas, serpientes, lagartos y artrópodos con criadores verificados PIMVS/UMA y procedencia legal garantizada.",
      },
      { property: "og:title", content: "Explorar ejemplares legales — LOTANI" },
      {
        property: "og:description",
        content: "Filtra por especie, nivel de manejo y verificación del criador.",
      },
    ],
  }),
  component: Explorar,
});

const MANEJOS: Manejo[] = ["Principiante", "Intermedio", "Avanzado"];

function Explorar() {
  const [cargando, setCargando] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Categoria | null>(null);
  const [manejo, setManejo] = useState<Manejo | null>(null);
  const [soloVerificados, setSoloVerificados] = useState(false);
  const [maxPrecio, setMaxPrecio] = useState(20000);
  const [filtrosMovil, setFiltrosMovil] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 700);
    return () => clearTimeout(t);
  }, []);

  const lista = EJEMPLARES.filter(
    (e) =>
      (!cat || e.categoria === cat) &&
      (!manejo || e.manejo === manejo) &&
      (!soloVerificados || e.verificacion !== "UMA Autorizada") &&
      e.precio <= maxPrecio &&
      (q.trim() === "" ||
        `${e.nombre} ${e.cientifico} ${e.verificacion}`.toLowerCase().includes(q.toLowerCase())),
  );

  const Filtros = (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest">Nivel de manejo</p>
        <div className="flex flex-wrap gap-2">
          {MANEJOS.map((m) => (
            <button
              key={m}
              onClick={() => setManejo(manejo === m ? null : m)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                manejo === m
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center justify-between text-sm">
        Solo criador verificado
        <input
          type="checkbox"
          checked={soloVerificados}
          onChange={(e) => setSoloVerificados(e.target.checked)}
          className="size-4 accent-[oklch(0.825_0.06_150)]"
        />
      </label>
      <div>
        <p className="mb-2 text-sm">
          Precio máximo: <span className="text-gold">${maxPrecio.toLocaleString("es-MX")} MXN</span>
        </p>
        <input
          type="range"
          min={900}
          max={20000}
          step={100}
          value={maxPrecio}
          onChange={(e) => setMaxPrecio(Number(e.target.value))}
          className="w-full accent-[oklch(0.825_0.06_150)]"
        />
      </div>
    </div>
  );

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={hero}
          alt="Paisaje de reserva natural"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 to-background" />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
          <h1 className="animate-fade-up text-3xl font-semibold sm:text-5xl">
            Fauna exótica con procedencia legal garantizada
          </h1>
          <p className="text-muted-foreground animate-fade-up mt-4">
            Cada ejemplar publicado en LOTANI acredita su documentación ante SEMARNAT.
          </p>
          <div className="animate-fade-up mt-8 flex items-center gap-3 rounded-full border border-border bg-card/90 px-5 py-3 backdrop-blur">
            <Search className="text-muted-foreground size-5" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar especies, legalidad..."
              className="placeholder:text-muted-foreground w-full bg-transparent outline-none"
            />
            <button
              onClick={() => setFiltrosMovil((v) => !v)}
              aria-label="Filtros"
              className="text-primary lg:hidden"
            >
              <SlidersHorizontal className="size-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(cat === c ? null : c)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                cat === c
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtrosMovil && <div className="panel mt-4 p-5 lg:hidden">{Filtros}</div>}

        <div className="mt-8 flex gap-8">
          <aside className="panel hidden h-fit w-64 shrink-0 p-6 lg:block">{Filtros}</aside>
          <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cargando
              ? Array.from({ length: 6 }).map((_, i) => <SpecimenSkeleton key={i} />)
              : lista.map((e) => <SpecimenCard key={e.id} e={e} />)}
            {!cargando && lista.length === 0 && (
              <p className="text-muted-foreground col-span-full py-16 text-center">
                No encontramos ejemplares con esos filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}