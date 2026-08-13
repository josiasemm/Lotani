import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, ClipboardCheck, Mail, Lock, Fingerprint, ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { setSesion, type Rol } from "@/lib/session";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Ingresar a LOTANI — Acceso para compradores y criadores" },
      {
        name: "description",
        content:
          "Inicia sesión o regístrate en LOTANI como comprador de fauna legal o criador verificado PIMVS/UMA.",
      },
      { property: "og:title", content: "Ingresar a LOTANI" },
      {
        property: "og:description",
        content: "Acceso a la plataforma comprometida con el comercio legal de fauna silvestre.",
      },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "registro">("login");
  const [rol, setRol] = useState<Rol>("comprador");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pimvs, setPimvs] = useState("");
  const [verPass, setVerPass] = useState(false);

  const puede = email.length > 3 && password.length > 3 && (tab === "login" || nombre.length > 2);

  const entrar = () => {
    if (!puede) return;
    setSesion({
      nombre: nombre || email.split("@")[0] || "Usuario",
      email,
      rol,
      pimvs: rol === "criador" ? pimvs : undefined,
      verificado: rol === "comprador",
    });
    void navigate({ to: rol === "criador" && tab === "registro" ? "/verificacion" : "/explorar" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-14">
      <div className="animate-fade-up w-full max-w-md">
        <Link to="/" className="flex justify-center text-foreground">
          <Logo className="h-10" />
        </Link>

        <div className="mt-10 flex rounded-full border border-border bg-card p-1">
          {(["login", "registro"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        <p className="mt-8 text-lg text-primary">Selecciona tu perfil</p>
        <div className="mt-4 space-y-3">
          {(
            [
              { id: "comprador", label: "Comprador de Fauna Legal", icon: ShoppingCart },
              { id: "criador", label: "Criador Verificado (PIMVS/UMA)", icon: ClipboardCheck },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setRol(id)}
              className={`panel flex w-full items-center gap-4 p-4 text-left transition-colors ${
                rol === id ? "border-primary/60" : ""
              }`}
            >
              <Icon className="size-5 text-primary" />
              <span className="flex-1 font-medium">{label}</span>
              <span
                className={`size-4 rounded-full border ${rol === id ? "border-primary bg-primary" : "border-muted-foreground"}`}
              />
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {tab === "registro" && (
            <Campo
              icon={<ClipboardCheck className="size-4" />}
              placeholder="Nombre completo"
              value={nombre}
              onChange={setNombre}
            />
          )}
          <Campo
            icon={<Mail className="size-4" />}
            placeholder="Correo electrónico"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <div className="relative">
            <Campo
              icon={<Lock className="size-4" />}
              placeholder="Contraseña"
              value={password}
              onChange={setPassword}
              type={verPass ? "text" : "password"}
            />
            <button
              type="button"
              aria-label="Mostrar contraseña"
              onClick={() => setVerPass((v) => !v)}
              className="text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Eye className="size-4" />
            </button>
          </div>
          {tab === "registro" && rol === "criador" && (
            <Campo
              icon={<ClipboardCheck className="size-4" />}
              placeholder="Nombre del PIMVS / UMA"
              value={pimvs}
              onChange={setPimvs}
            />
          )}
        </div>

        <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
          <button className="hover:text-foreground">¿Olvidaste tu contraseña?</button>
          <button className="flex items-center gap-2 hover:text-foreground">
            <Fingerprint className="size-4 text-primary" /> Entrar con huella
          </button>
        </div>

        <button
          onClick={entrar}
          disabled={!puede}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"
        >
          {tab === "login" ? "Ingresar a LOTANI" : "Crear cuenta"} <ArrowRight className="size-4" />
        </button>

        <p className="text-muted-foreground mt-8 text-center text-xs">
          Plataforma comprometida con el comercio legal de fauna silvestre
        </p>
      </div>
    </div>
  );
}

function Campo({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
      />
    </label>
  );
}