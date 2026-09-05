import { createFileRoute } from "@tanstack/react-router";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { EJEMPLARES } from "@/lib/lotani-data";

const catalogo = EJEMPLARES.map(
  (e) =>
    `- ${e.nombre} (${e.cientifico}) · $${e.precio} MXN · Manejo ${e.manejo} · ${e.verificacion} · Criador ${e.criador} · Registro SEMARNAT ${e.registro} · Ficha: temp ${e.ficha.temperatura}, humedad ${e.ficha.humedad}, dieta ${e.ficha.dieta}, talla adulta ${e.ficha.talla}`,
).join("\n");

const base = `Eres el "Asistente LOTANI", especialista del marketplace mexicano LOTANI de fauna exótica legal.
Responde SIEMPRE en español, con tono profesional y cercano, en respuestas breves y estructuradas (usa listas cortas).
Solo hablas de: legalidad de fauna exótica en México (SEMARNAT, PIMVS, UMA, CITES, nota de aprovechamiento, formato de marcaje, factura) y cuidados de terrario.
Si te preguntan otra cosa, redirige amablemente al tema.

Catálogo actual de LOTANI:
${catalogo}`;

const legal = `${base}

MODO LEGAL: explica normativas SEMARNAT, cuándo se requiere CITES, cómo registrar un PIMVS o UMA, qué documentos acreditan procedencia legal y las diferencias entre comprar a un vendedor verificado y a uno no verificado.
Si el usuario pregunta por un ejemplar del catálogo, cita explícitamente su registro SEMARNAT y menciona que su procedencia legal está garantizada.
Al final de respuestas normativas complejas añade una línea corta: "Nota: esta información no sustituye la asesoría legal oficial de SEMARNAT."
Nunca inventes números de registro o trámites que no conoces.`;

const tecnico = `${base}

MODO TÉCNICO: genera fichas de cuidado. Devuelve siempre primero la ficha con este formato exacto en líneas separadas:
Temperatura: valor (etiqueta)
Humedad: valor (etiqueta)
Dieta: valor (etiqueta)
Talla adulta: valor (etiqueta)
Después agrega 2-3 recomendaciones adicionales (sustrato, enriquecimiento, señales de estrés).
Si la especie no está en el catálogo de LOTANI, acláralo y da una respuesta general basada en tu conocimiento, sin inventar datos de SEMARNAT.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: UIMessage[]; modo?: string };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const geminiKey =
          process.env["GEMINI_API_KEY"] ||
          process.env["GOOGLE_GENERATIVE_AI_API_KEY"] ||
          process.env["GOOGLE_API_KEY"];
        const lovableKey = process.env["LOVABLE_API_KEY"];

        if (!geminiKey && !lovableKey) {
          return new Response("Missing GEMINI_API_KEY (or LOVABLE_API_KEY)", { status: 500 });
        }

        const model = geminiKey
          ? createGoogleGenerativeAI({ apiKey: geminiKey })("gemini-1.5-flash")
          : createOpenAICompatible({
              name: "lovable",
              baseURL: "https://ai.gateway.lovable.dev/v1",
              headers: { "Lovable-API-Key": lovableKey! },
            })("google/gemini-1.5-flash");

        const result = streamText({
          model,
          system: body.modo === "tecnico" ? tecnico : legal,
          messages: await convertToModelMessages(body.messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: body.messages });
      },
    },
  },
});