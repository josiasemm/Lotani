import { Thermometer, Droplets, Utensils, Ruler } from "lucide-react";
import type { Ficha } from "@/lib/lotani-data";

function Dato({
  icon,
  label,
  valor,
  tag,
}: {
  icon: React.ReactNode;
  label: string;
  valor: string;
  tag: string;
}) {
  return (
    <div className="panel flex items-start gap-3 p-4">
      <span className="rounded-lg bg-secondary p-2 text-primary">{icon}</span>
      <div>
        <p className="text-muted-foreground text-[11px] uppercase tracking-wide">{label}</p>
        <p className="font-medium">{valor}</p>
        <p className="text-primary text-xs">{tag}</p>
      </div>
    </div>
  );
}

export function CareSheet({ ficha }: { ficha: Ficha }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Dato
        icon={<Thermometer className="size-4" />}
        label="Temperatura"
        valor={ficha.temperatura}
        tag={ficha.temperaturaTag}
      />
      <Dato
        icon={<Droplets className="size-4" />}
        label="Humedad"
        valor={ficha.humedad}
        tag={ficha.humedadTag}
      />
      <Dato
        icon={<Utensils className="size-4" />}
        label="Dieta"
        valor={ficha.dieta}
        tag={ficha.dietaTag}
      />
      <Dato
        icon={<Ruler className="size-4" />}
        label="Talla adulta"
        valor={ficha.talla}
        tag={ficha.tallaTag}
      />
    </div>
  );
}