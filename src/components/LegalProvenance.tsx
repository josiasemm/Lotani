import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileText } from "lucide-react";

export function LegalProvenance({
  registro,
  criador,
  href,
  compacto = false,
}: {
  registro: string;
  criador: string;
  href?: string;
  compacto?: boolean;
}) {
  return (
    <div className="panel relative overflow-hidden p-5">
      <ShieldCheck
        className="pointer-events-none absolute -right-3 -top-3 size-24 text-primary/10"
        aria-hidden
      />
      <div className="flex items-center gap-2 text-primary">
        <ShieldCheck className="size-5" />
        <h3 className={compacto ? "text-base font-semibold" : "text-xl font-semibold"}>
          Procedencia legal Garantizada
        </h3>
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-4 text-sm">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Registro SEMARNAT</p>
          <p className="font-medium">{registro}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs uppercase tracking-wide">Criador</p>
          <p className="font-medium">{criador}</p>
        </div>
      </div>
      {href ? (
        <Link
          to={href}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
        >
          <FileText className="size-4" /> Ver documentación
        </Link>
      ) : (
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10">
          <FileText className="size-4" /> Ver documentación
        </button>
      )}
    </div>
  );
}