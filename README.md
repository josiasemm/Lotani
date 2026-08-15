# Lotani

Tengo que realizar una pagina web para un concurso, te envio el prompt, cabe aclarar que la idea fue sacada de un prototípo en figma, te envio fotos, pero recuerda que es una pagina web, y te envio el logo de la pagina LOTANI.
PROMPT PARA LOVABLE — LOTANI (Marketplace de Fauna Exótica Legal)

Copia y pega todo este bloque en Lovable como prompt inicial del proyecto. Está escrito para que el generador construya la app completa, respetando la identidad visual del prototipo de Figma y agregando el asistente de IA que pide el criterio de CoderCUP.

1. CONTEXTO DEL PROYECTO

Quiero construir LOTANI, un marketplace web (mobile-first, estilo app) para la compra-venta legal de fauna exótica en México (tortugas, serpientes, lagartos, anfibios y artrópodos), dirigido a criadores certificados PIMVS/UMA y compradores aficionados de 25 a 32 años.

El problema que resuelve: hoy este comercio se hace de forma informal por redes sociales (Facebook/WhatsApp), sin garantía de procedencia legal, sin trazabilidad SEMARNAT y con alto riesgo de fraude. LOTANI centraliza el catálogo, verifica a los criadores, exige documentación de procedencia legal en cada publicación, protege el pago con un sistema de escrow y agrega un asistente de IA que resuelve dudas legales y técnicas de cuidado.

Construye una página web completa (no una app móvil ni un contenedor tipo celular), funcional con datos mock/Supabase. El diseño debe adaptarse de forma responsive a pantallas de escritorio como una página web normal — header superior, secciones a ancho completo, grids multi-columna, footer — aprovechando el espacio horizontal en vez de simular un teléfono. El prototipo de Figma (formato vertical/app) se usa únicamente como guía de estilo visual(colores, tipografía, componentes, iconografía, tono de las animaciones), no como referencia de layout o de proporciones de pantalla.

2. IDENTIDAD VISUAL (extraída del prototipo de Figma — respétala estrictamente)

Estilo general: dark mode "naturalista/selvático", elegante, premium, con temática de reserva natural / terrario nocturno. Nada de blancos puros ni colores saturados tipo app genérica — todo debe sentirse orgánico, serio y confiable (transmite legalidad y cuidado profesional, no un marketplace cualquiera).

Paleta de colores (ajusta el tono exacto con el selector de color de tu archivo Figma, esta es la referencia aproximada):

Fondo principal: verde bosque muy oscuro, casi negro — #101B14 a #16241A

Fondo de tarjetas/paneles: verde oscuro ligeramente más claro que el fondo — #1C2A1F

Acento primario (botones principales, CTAs, badges de verificación): verde menta/salvia claro — #A9D3B0 a #C3E6C9

Texto principal sobre fondo oscuro: crema/hueso — #F4F1E6

Texto secundario/placeholder: gris verdoso apagado — #8C9A8E

Estados de alerta/pendiente: ámbar suave (para "en revisión", "requiere firma")

Estados de éxito/legal vigente: el mismo verde menta del acento

Splash / pantalla de bienvenida: ilustración editorial en tonos verdes (paisaje de reserva natural con niebla, formato vertical) + fila de siluetas de tortugas caminando en distintos tamaños (efecto de "profundidad"/perspectiva, como si avanzaran hacia la cámara). El logotipo LOTANI se muestra en mayúsculas, tipografía condensada/bold, letter-spacing amplio, siempre en crema sobre fondo oscuro.

Tipografía: sans-serif geométrica y limpia. Títulos en bold/mayúsculas con tracking amplio (como el logo). Cuerpo de texto en peso regular/medium, buena legibilidad sobre fondo oscuro. Los nombres científicos de las especies siempre en cursiva.

Botones:

Primario: fondo verde menta sólido, texto oscuro, esquinas redondeadas (radius ~12-16px), ancho completo en formularios y en tarjetas de producto ("Comprar con escrow seguro", "Ingresar a LOTANI", "Publicar ejemplar").

Secundario/outline: borde delgado crema o verde menta, fondo transparente, para acciones tipo "Ver Guía completa" o "Ver documentación".

Tarjetas de ejemplar (producto): fondo oscuro con borde/sombra sutil, foto del animal arriba (esquinas redondeadas), nombre común en bold, nombre científico en cursiva debajo, precio en verde menta destacado, badge pequeño de "Vendedor verificado" o "Criador verificado / PIMVS Certificado / UMA Autorizada", y botón de acción abajo.

Navbar superior (fija, tipo sitio web): logo LOTANI a la izquierda, menú horizontal con las 4 secciones — Explorar · Legalidad · Guías · Perfil — al centro o a la derecha, y accesos de cuenta (avatar/login) en el extremo derecho. Siempre visible excepto en pantallas de auth/onboarding. En vista de catálogo, debajo del navbar va el buscador "Buscar especies, legalidad..." a ancho completo o centrado, con los chips de filtro horizontales (Tortugas, Serpientes, Artrópodos, Lagartos, Anfibios) justo debajo.

Micro-animaciones a implementar:

Transición suave (fade + slide) entre pantallas, como navegación nativa.

Botones con leve escala/opacidad al presionar (feedback táctil).

Las tortuguitas de la splash con una animación sutil de caminata/parallax al cargar.

Barra de progreso animada en el flujo de "Verificación de criador" (pasos 1-2-3).

Skeleton/shimmer loading en las tarjetas del catálogo mientras cargan.

El ícono de "Escrow activo" con una animación de pulso suave (transmite "protección activa").

El botón flotante del chatbot con un pequeño "bounce" al aparecer y un indicador de notificación animado la primera vez.

3. ARQUITECTURA DE PANTALLAS

A. Onboarding / Autenticación

Splash — logo LOTANI + ilustración + tortugas + botón "Ingresar a LOTANI".

Selector de perfil — el usuario elige entre dos roles antes de loguearse:

Comprador de Fauna Legal

Criador Verificado (PIMVS/UMA)

Iniciar sesión — correo, contraseña, "¿Olvidaste tu contraseña?", opción "Entrar con huella" (mock), tagline fijo en el footer: "Plataforma comprometida con el comercio legal de fauna silvestre".

Registrarse — nombre completo, correo, contraseña. Si el rol elegido es Criador, el formulario de registro pide además el nombre del PIMVS/UMA.

Verificación de criador (solo rol Criador) — flujo de 3 pasos con stepper visual (Documentación → Revisión → Resultado):

Paso 1: input de "Número de registro PIMVS/UMA" (placeholder tipo DGVSPIMVSCREX0000DF) + carga de archivo (PDF/JPG) de la constancia oficial SEMARNAT, con preview del archivo subido (nombre + peso).

Paso 2: pantalla de "Documentación en Revisión" con mensaje de que el equipo valida en 24-48 hrs, botón "Ir a inicio".

Paso 3 (resultado, tras aprobación simulada): perfil muestra badge "Procedencia legal Garantizada", número de registro SEMARNAT visible, botón "Ver documentación".

B. Explorar (Home)

Hero superior a ancho completo con la ilustración/paisaje de la splash de fondo, el título de la plataforma y el buscador centrado.

Debajo: barra de filtros horizontal (chips de categoría) y, en escritorio, un panel lateral izquierdo (sidebar) opcional con filtros avanzados (nivel de manejo Principiante/Intermedio/Avanzado, criador verificado sí/no, rango de precio) que en móvil colapsa a un modal.

Grid de tarjetas de ejemplares de 3 a 4 columnas en escritorio (2 en tablet, 1 en móvil), cada tarjeta con: foto, nombre común, nombre científico en cursiva, precio en MXN, badge de verificación (Criador verificado / PIMVS Certificado / UMA Autorizada), nivel de manejo.

C. Detalle de ejemplar

Layout de dos columnas en escritorio: columna izquierda con la foto grande del ejemplar (y miniaturas si hay varias fotos); columna derecha con nombre común, nombre científico, precio y toda la información de compra (en móvil, la columna derecha va debajo de la foto, apilada).

Datos: Género, Morfismo (Nominal/Caramel/Banana, etc.), Edad, Longitud.

Bloque "Procedencia legal Garantizada" con número de Registro SEMARNAT (ej. PIMVS-DF-CR-0120-MEX) y botón "Ver documentación".

Datos del criador (nombre + ir a su perfil).

Descripción detallada del ejemplar.

Ficha técnica de cuidados (esto es clave, generada idealmente por IA — ver sección 5): Temperatura, Humedad, Dieta, Talla adulta — cada dato con su ícono y una etiqueta de contexto (ej. "Zona cálida", "Requerida", "Grande").

Checkbox/confirmación: "¿Tienes el terrario adecuado antes de recibir al ejemplar?" con botón "Entendido, proceder a comprar" y enlace "Ver Guía completa".

"Kit recomendado" (ej. Terrario arbóreo 60x60x90) con botón "Ver paquete sugerido".

CTA final: "Comprar con escrow seguro".

D. Checkout

Confirmar pago — en escritorio usa dos columnas: a la izquierda el selector de método de pago (Tarjeta de crédito/débito, Transferencia SPEI, Depósito bancario OXXO/7-Eleven/ventanilla) y a la derecha una tarjeta fija de resumen (Precio del ejemplar + Envío especializado zoologística + Comisión de Escrow = Total a pagar) con el botón "Finalizar compra" y el texto legal "Al continuar, aceptas los términos de servicio de LOTANI". En móvil se apila: resumen arriba, métodos de pago abajo.

Estatus de compra segura (tracking post-pago) — muestra Order ID, línea de tiempo de estados:

Pago recibido y resguardado en Escrow (con fecha/hora)

Documentación CITES/Factura validada por agentes LOTANI

Confirmación de llegada y salud (requiere validación del usuario en app)

Llegada estimada (fecha/hora) + número de guía de zoologística (con botón copiar)

Nota: "Tienes 24 hrs tras la entrega para validar la salud del ejemplar antes de liberar los fondos al vendedor."

Botón "Confirmar recepción".

E. Legalidad (Trámites)

Sección "un apartado para que el usuario tenga el registro y datos de su ejemplar".

Tarjeta "ID Oficial LOTANI" por ejemplar: nombre, especie, ID único, Estatus Legal (Vigente), fecha de registro.

Expediente con checklist: Titularidad (INE + comprobante de domicilio), Nota de aprovechamiento (vigente), Formato de marcaje (requiere firma), Permiso CITES (según especie, puede decir "No requerido para esta especie").

F. Guías de cuidado

Lista de guías destacadas (tarjeta con foto, tiempo de lectura "Básico · 5 min de lectura", título, descripción corta). Ej. "Cuidados de la tortuga caimán: Manual Avanzado", "Guía de terrarios para tortuga sulcata".

Sección "Recursos legales y trámite": Trámites CITES, Registro PIMVS/UMA, Legal procedencia — cada uno como tarjeta corta con enlace.

G. Perfil

Header: foto, nombre, "Miembro desde 2026".

Gestión de actividad: Mis publicaciones, Pedidos en curso, Favoritos.

Seguridad y legalidad: Documentación verificada, Métodos de pago, Centro de ayuda.

Cerrar sesión.

H. Nueva publicación (solo rol Criador verificado)

Formulario: Especie (nombre científico y común), Selector de morfo/mutación, Sexo (Macho/Hembra/N/A), carga de "Documento de procedencia legal" (con advertencia: sin este documento la publicación no puede ser aprobada), Precio (MXN), hasta 5 fotografías.

Botón "Publicar ejemplar" → pantalla de confirmación "¡Publicación Exitosa!" con nota de que todas las transacciones están protegidas por escrow, botones "Ver mi publicación" / "Ir a inicio".

4. DATOS DE EJEMPLO (usa estos mocks para poblar el catálogo)

EjemplarCientíficoPrecio MXNManejoVerificaciónTortuga CaimánMacrochelys temminckii$3,500AvanzadoCriador verificadoBoa EsmeraldaCorallus caninus$18,500AvanzadoPIMVS CertificadoTortuga TaricayaPodocnemis unifilis$2,200IntermedioCriador verificadoCiempiés de VietnamScolopendra subspinipes$950PrincipianteUMA AutorizadaGecko CrestadoCorrelophus ciliatus$1,800IntermedioCriador verificadoTarántula Rodillas RojasBrachypelma hamorii$1,100IntermedioUMA Autorizada

Criador de ejemplo: Tortu Exotic, registro PIMVS-DF-CR-0120-MEX.

Fichas de cuidado de ejemplo (úsalas como fallback si la IA no responde):

Tortuga Caimán: Temp 24-28°C (zona cálida) · Humedad acuática requerida · Dieta carnívoro/pellets · Talla adulta 60-80cm (grande).

Boa Esmeralda: Temp 26-30°C · Humedad 75-90% · Dieta carnívoro/pellets · Talla adulta 1.5-2m (grande).

Tortuga Taricaya: Temp 28-32°C · Humedad subacuática · Dieta omnívoro (vegetales/pellets) · Talla adulta 35-45cm (mediana).

Gecko Crestado: Temp 22-26°C ambiente · Humedad 60-80% · Dieta insectívoro (grillos) · Talla adulta 20-25cm (pequeño).

Tarántula R. Rojas: Temp 25-29°C (zona cálida) · Humedad 50-65% · Dieta insectívoro (grillos) · Talla adulta 13-16cm (pequeña).

5. ASISTENTE DE IA (chatbot) — punto crítico del criterio de CoderCUP

Agrega un botón flotante circular (esquina inferior derecha de la ventana, color verde menta con ícono tipo hoja/chat) visible en todas las páginas post-login. Al hacer clic abre un panel de chat lateral deslizante (drawer que entra desde la derecha, ancho fijo tipo ~380-420px, alto completo) con la misma estética dark-green del sitio; en móvil ese panel ocupa la pantalla completa.

Header del chat: "Asistente LOTANI" + subtítulo "Legalidad y cuidado de fauna exótica" + ícono/avatar tipo hoja o tortuga estilizada.

El asistente debe tener dos modos/módulos, seleccionables con dos chips en la parte superior del chat:

Módulo Legal — responde dudas sobre:

Normativas SEMARNAT para posesión y comercio de fauna exótica en México.

Qué es y cuándo se requiere un permiso CITES.

Cómo registrar un PIMVS o una UMA.

Qué documentos acreditan la procedencia legal de un ejemplar (nota de aprovechamiento, factura, formato de marcaje).

Diferencias entre comprar a un vendedor verificado vs. no verificado.

Siempre que el usuario pregunte por un ejemplar específico del catálogo, el asistente debe mostrar dentro de la respuesta un mini-componente de "Nota de procedencia legal": un recuadro con ícono de escudo/check, el texto "Procedencia legal Garantizada", el número de registro SEMARNAT del criador de ese ejemplar, y un botón "Ver documentación" que lleva al detalle del ejemplar. Este componente debe reutilizar el mismo estilo visual que ya existe en la pantalla de Detalle de ejemplar (sección 3.C) — no lo inventes distinto.

Módulo Técnico — genera fichas de cuidado personalizadas:

El usuario escribe o selecciona una especie del catálogo.

El asistente responde con una ficha estructurada (mismo formato visual que la ficha de cuidados de la sección 3.C: Temperatura / Humedad / Dieta / Talla adulta, cada uno con su etiqueta corta) más 2-3 recomendaciones adicionales en texto libre (sustrato, enriquecimiento, señales de estrés a vigilar).

Si la especie no está en el catálogo, el asistente debe aclararlo y dar una respuesta general basada en su conocimiento, sin inventar datos de SEMARNAT que no tiene.

Comportamiento conversacional:

Mensaje de bienvenida automático al abrir el chat: breve, con dos botones de sugerencia rápida ("¿Qué documentos necesito para vender?" / "Cuéntame cómo cuidar una tortuga caimán").

Burbujas de mensaje: usuario alineado a la derecha (fondo verde menta, texto oscuro), asistente alineado a la izquierda (fondo de tarjeta oscura, texto crema).

Indicador de "escribiendo..." animado (3 puntos) mientras responde.

El asistente siempre debe aclarar que no sustituye asesoría legal oficial de SEMARNAT cuando responda temas normativos complejos (un disclaimer breve, no invasivo, al pie de esas respuestas específicas).

Implementación técnica sugerida para Lovable:

Conecta el chat a un modelo de lenguaje real vía una función de backend (Supabase Edge Function) que llame a la API de Anthropic (Claude), usando un system prompt que le dé al modelo el contexto de LOTANI, el catálogo de ejemplares (tabla de la sección 4) y la instrucción de responder solo sobre legalidad de fauna exótica en México y cuidados de terrario, en español, con un tono profesional y cercano.

Si por tiempo del hackathon no es viable la integración real, deja el chat funcionando con respuestas simuladas basadas en las fichas de la sección 4 y en las respuestas legales más comunes (SEMARNAT, PIMVS, UMA, CITES) para que la demo del video de 2 minutos se vea fluida, pero deja el código preparado (comentado) para conectar la API real después.

6. REQUISITOS NO FUNCIONALES

Sitio web responsive a ancho completo (no un contenedor tipo teléfono): usa el espacio horizontal en escritorio con grids multi-columna, secciones de ancho completo y un footer real; en pantallas pequeñas cada sección colapsa de forma natural a una sola columna. El estilo visual (colores, tipografía, componentes) debe verse igual al de las capturas de Figma, aunque el layout general sea el de una página web y no el de una app móvil.

Todas las pantallas de compra (checkout, escrow, estatus) deben sentirse "seguras": usa iconografía de candado/escudo y los textos de protección exactamente como están en el prototipo.

Persistencia de datos mock en Supabase (tablas: usuarios, ejemplares, publicaciones, pedidos, mensajes del chat) para que el flujo de compra y publicación funcione de principio a fin en la demo.

Los criadores solo pueden publicar si su estatus de verificación es "Aprobado".

Responsive, accesible (contraste adecuado texto crema sobre fondo oscuro), y con las transiciones/animaciones descritas en la sección 2.

7. PRIORIDAD DE CONSTRUCCIÓN (para la demo del CoderCUP)

Splash + Login/Registro + selector de perfil.

Explorar + Detalle de ejemplar (con ficha de cuidados y nota de procedencia legal).

Chatbot flotante con los dos módulos (Legal + Técnico).

Checkout + Confirmar pago + Estatus de compra segura (escrow).

Perfil + Nueva publicación + Verificación de criador.

Legalidad (Trámites) + Guías de cuidado.

Construye en ese orden para asegurar que, aunque el tiempo se acabe, el demo central (catálogo + IA + escrow) ya esté funcionando para el video de 2 minutos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/330f169b-b303-459c-8d63-f3fef6ce36de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
