import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Leaf, X, Send, Scale, Thermometer } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LegalProvenance } from "@/components/LegalProvenance";
import { EJEMPLARES } from "@/lib/lotani-data";
import { useSesion } from "@/hooks/use-sesion";

type Modo = "legal" | "tecnico";

const SUGERENCIAS = [
  "¿Qué documentos necesito para vender?",
  "Cuéntame cómo cuidar una tortuga caimán",
];

function Markdown({ texto }: { texto: string }) {
  return (
    <>
      {texto.split("\n").map((linea, i) => {
        const limpia = linea.replace(/^[*-]\s+/, "");
        const partes = limpia.split(/\*\*(.+?)\*\*/g);
        const contenido = partes.map((p, j) =>
          j % 2 === 1 ? (
            <strong key={j} className="font-semibold">
              {p}
            </strong>
          ) : (
            <span key={j}>{p}</span>
          ),
        );
        if (/^[*-]\s+/.test(linea)) {
          return (
            <span key={i} className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{contenido}</span>
            </span>
          );
        }
        return (
          <span key={i} className="block">
            {contenido}
          </span>
        );
      })}
    </>
  );
}

export function ChatWidget() {
  const { sesion } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const [modo, setModo] = useState<Modo>("legal");
  const [input, setInput] = useState("");
  const [nuevo, setNuevo] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { modo } }),
    [modo],
  );
  const { messages, sendMessage, status, error } = useChat({ transport });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (abierto) inputRef.current?.focus();
  }, [abierto, status]);

  if (!sesion) return null;

  const enviar = (texto: string) => {
    const t = texto.trim();
    if (!t || status === "streaming" || status === "submitted") return;
    void sendMessage({ text: t });
    setInput("");
  };

  const cargando = status === "submitted" || status === "streaming";

  return (
    <>
      <button
        onClick={() => {
          setAbierto(true);
          setNuevo(false);
        }}
        aria-label="Abrir asistente LOTANI"
        className="animate-bounce-in fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
      >
        <Leaf className="size-6" />
        {nuevo && (
          <span className="absolute -right-0.5 -top-0.5 size-3.5 animate-pulse rounded-full bg-warning" />
        )}
      </button>

      {abierto && (
        <div
          className="animate-fade-up fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-sm"
          onClick={() => setAbierto(false)}
        >
          <aside
            onClick={(ev) => ev.stopPropagation()}
            className="flex h-full w-full flex-col border-l border-border bg-card sm:w-[400px]"
          >
            <header className="flex items-center gap-3 border-b border-border p-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Leaf className="size-5" />
              </span>
              <div className="flex-1">
                <p className="font-semibold">Asistente LOTANI</p>
                <p className="text-muted-foreground text-xs">
                  Legalidad y cuidado de fauna exótica
                </p>
              </div>
              <button
                onClick={() => setAbierto(false)}
                aria-label="Cerrar chat"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="flex gap-2 border-b border-border p-3">
              {(
                [
                  { id: "legal", label: "Legal", icon: Scale },
                  { id: "tecnico", label: "Técnico", icon: Thermometer },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setModo(id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
                    modo === id
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  <Icon className="size-3.5" /> {label}
                </button>
              ))}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm">
                Hola {sesion.nombre.split(" ")[0]}, soy tu asistente LOTANI. Puedo resolver dudas
                de legalidad (SEMARNAT, PIMVS/UMA, CITES) o darte fichas de cuidado.
              </div>
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      onClick={() => enviar(s)}
                      className="rounded-full border border-primary/40 px-3 py-1.5 text-left text-xs text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => {
                const texto = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("")
                  .trim();
                const mencionado =
                  m.role === "assistant"
                    ? EJEMPLARES.find((e) =>
                        texto.toLowerCase().includes(e.nombre.toLowerCase()),
                      )
                    : undefined;
                return (
                  <div key={m.id} className="space-y-3">
                    <div
                      className={
                        m.role === "user"
                          ? "ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary p-3 text-sm text-primary-foreground"
                          : "max-w-[90%] space-y-1 rounded-2xl rounded-tl-sm bg-secondary p-3 text-sm"
                      }
                    >
                      {m.role === "user" ? texto : <Markdown texto={texto} />}
                    </div>
                    {mencionado && (
                      <LegalProvenance
                        compacto
                        registro={mencionado.registro}
                        criador={mencionado.criador}
                        ejemplarId={mencionado.id}
                      />
                    )}
                  </div>
                );
              })}

              {cargando && (
                <div className="flex w-16 items-center justify-center gap-1 rounded-2xl bg-secondary p-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 animate-bounce rounded-full bg-primary"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}

              {error && (
                <p className="text-warning text-xs">
                  No pudimos contactar al asistente. Intenta de nuevo en unos momentos.
                </p>
              )}
            </div>

            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                enviar(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
                placeholder={
                  modo === "legal" ? "Pregunta sobre legalidad..." : "Escribe una especie..."
                }
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                disabled={cargando}
                aria-label="Enviar"
                className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}