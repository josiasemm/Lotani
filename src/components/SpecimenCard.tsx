import { Link } from "@tanstack/react-router";
import { BadgeCheck, Heart } from "lucide-react";
import { mxn, type Ejemplar } from "@/lib/lotani-data";

export function SpecimenCard({ e }: { e: Ejemplar }) {
  return (
    <Link
      to="/ejemplar/$id"
      params={{ id: e.id }}
      className="panel group animate-fade-up flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={e.imagen}
          alt={e.nombre}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-background/60 p-2 text-primary backdrop-blur">
          <Heart className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="flex items-center gap-1 text-xs text-primary">
          <BadgeCheck className="size-3.5" /> {e.verificacion}
        </span>
        <h3 className="text-lg font-semibold">{e.nombre}</h3>
        <p className="sci text-sm">{e.cientifico}</p>
        <p className="text-muted-foreground text-sm">Manejo: {e.manejo}</p>
        <p className="mt-auto pt-3 text-lg font-semibold text-gold">{mxn(e.precio)}</p>
      </div>
    </Link>
  );
}

export function SpecimenSkeleton() {
  return (
    <div className="panel overflow-hidden">
      <div className="aspect-4/3 animate-pulse bg-secondary" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-28 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}