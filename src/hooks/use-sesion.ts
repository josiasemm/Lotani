import { useEffect, useState } from "react";
import { getSesion, type Sesion } from "@/lib/session";

export function useSesion() {
  const [sesion, setSesionState] = useState<Sesion | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const sync = () => setSesionState(getSesion());
    sync();
    setListo(true);
    window.addEventListener("lotani-session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lotani-session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { sesion, listo };
}