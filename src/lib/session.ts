export type Rol = "comprador" | "criador";

export type Sesion = {
  nombre: string;
  email: string;
  rol: Rol;
  pimvs?: string;
  verificado: boolean;
};

const KEY = "lotani.sesion";

export function getSesion(): Sesion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Sesion) : null;
  } catch {
    return null;
  }
}

export function setSesion(s: Sesion) {
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("lotani-session"));
}

export function clearSesion() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("lotani-session"));
}