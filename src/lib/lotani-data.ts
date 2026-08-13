import tortugaCaiman from "@/assets/tortuga-caiman.jpg";
import boaEsmeralda from "@/assets/boa-esmeralda.jpg";
import tortugaTaricaya from "@/assets/tortuga-taricaya.jpg";
import ciempies from "@/assets/ciempies.jpg";
import geckoCrestado from "@/assets/gecko-crestado.jpg";
import tarantula from "@/assets/tarantula.jpg";

export type Verificacion = "Criador verificado" | "PIMVS Certificado" | "UMA Autorizada";
export type Manejo = "Principiante" | "Intermedio" | "Avanzado";
export type Categoria = "Tortugas" | "Serpientes" | "Artrópodos" | "Lagartos" | "Anfibios";

export type Ficha = {
  temperatura: string;
  temperaturaTag: string;
  humedad: string;
  humedadTag: string;
  dieta: string;
  dietaTag: string;
  talla: string;
  tallaTag: string;
};

export type Ejemplar = {
  id: string;
  nombre: string;
  cientifico: string;
  precio: number;
  manejo: Manejo;
  verificacion: Verificacion;
  categoria: Categoria;
  imagen: string;
  genero: string;
  morfismo: string;
  edad: string;
  longitud: string;
  criador: string;
  registro: string;
  descripcion: string;
  ficha: Ficha;
  kit: string;
};

export const CRIADOR = { nombre: "Tortu Exotic", registro: "PIMVS-DF-CR-0120-MEX" };

export const EJEMPLARES: Ejemplar[] = [
  {
    id: "tortuga-caiman",
    nombre: "Tortuga Caimán",
    cientifico: "Macrochelys temminckii",
    precio: 3500,
    manejo: "Avanzado",
    verificacion: "Criador verificado",
    categoria: "Tortugas",
    imagen: tortugaCaiman,
    genero: "Hembra",
    morfismo: "Nominal",
    edad: "Cría",
    longitud: "10 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Juvenil de Tortuga Caimán en perfecto estado de salud. Muestra desarrollo anatómico óptimo, alimentación activa y trazabilidad legal completa ante SEMARNAT.",
    ficha: {
      temperatura: "24-28 °C",
      temperaturaTag: "Zona cálida",
      humedad: "Acuática",
      humedadTag: "Requerida",
      dieta: "Carnívoro / pellets",
      dietaTag: "Proteína alta",
      talla: "60-80 cm",
      tallaTag: "Grande",
    },
    kit: "Terrario arbóreo 60×60×90",
  },
  {
    id: "boa-esmeralda",
    nombre: "Boa Esmeralda",
    cientifico: "Corallus caninus",
    precio: 18500,
    manejo: "Avanzado",
    verificacion: "PIMVS Certificado",
    categoria: "Serpientes",
    imagen: boaEsmeralda,
    genero: "Macho",
    morfismo: "Nominal",
    edad: "Subadulto",
    longitud: "95 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Ejemplar arborícola de coloración esmeralda intensa, con historial de mudas completas y alimentación estable en cautiverio.",
    ficha: {
      temperatura: "26-30 °C",
      temperaturaTag: "Gradiente",
      humedad: "75-90 %",
      humedadTag: "Alta",
      dieta: "Carnívoro / roedores",
      dietaTag: "Semanal",
      talla: "1.5-2 m",
      tallaTag: "Grande",
    },
    kit: "Terrario arbóreo 90×60×120",
  },
  {
    id: "tortuga-taricaya",
    nombre: "Tortuga Taricaya",
    cientifico: "Podocnemis unifilis",
    precio: 2200,
    manejo: "Intermedio",
    verificacion: "Criador verificado",
    categoria: "Tortugas",
    imagen: tortugaTaricaya,
    genero: "Hembra",
    morfismo: "Nominal",
    edad: "Juvenil",
    longitud: "14 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Tortuga semiacuática de temperamento tranquilo, ideal para acuaterrarios amplios con zona de asoleo.",
    ficha: {
      temperatura: "28-32 °C",
      temperaturaTag: "Zona cálida",
      humedad: "Subacuática",
      humedadTag: "Requerida",
      dieta: "Omnívoro / vegetales",
      dietaTag: "Diaria",
      talla: "35-45 cm",
      tallaTag: "Mediana",
    },
    kit: "Acuaterrario 120×50×50",
  },
  {
    id: "ciempies-vietnam",
    nombre: "Ciempiés de Vietnam",
    cientifico: "Scolopendra subspinipes",
    precio: 950,
    manejo: "Principiante",
    verificacion: "UMA Autorizada",
    categoria: "Artrópodos",
    imagen: ciempies,
    genero: "N/A",
    morfismo: "Nominal",
    edad: "Adulto",
    longitud: "18 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Artrópodo excavador de alta actividad nocturna. Requiere sustrato profundo y manipulación nula.",
    ficha: {
      temperatura: "24-28 °C",
      temperaturaTag: "Estable",
      humedad: "70-80 %",
      humedadTag: "Alta",
      dieta: "Insectívoro",
      dietaTag: "Semanal",
      talla: "18-20 cm",
      tallaTag: "Mediana",
    },
    kit: "Terrario excavador 40×30×30",
  },
  {
    id: "gecko-crestado",
    nombre: "Gecko Crestado",
    cientifico: "Correlophus ciliatus",
    precio: 1800,
    manejo: "Intermedio",
    verificacion: "Criador verificado",
    categoria: "Lagartos",
    imagen: geckoCrestado,
    genero: "Macho",
    morfismo: "Flame",
    edad: "Juvenil",
    longitud: "12 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Gecko arborícola dócil, excelente primera especie para aficionados con experiencia básica en terrarios verticales.",
    ficha: {
      temperatura: "22-26 °C",
      temperaturaTag: "Ambiente",
      humedad: "60-80 %",
      humedadTag: "Media-alta",
      dieta: "Insectívoro / papilla",
      dietaTag: "3x semana",
      talla: "20-25 cm",
      tallaTag: "Pequeño",
    },
    kit: "Terrario arbóreo 45×45×60",
  },
  {
    id: "tarantula-rodillas-rojas",
    nombre: "Tarántula Rodillas Rojas",
    cientifico: "Brachypelma hamorii",
    precio: 1100,
    manejo: "Intermedio",
    verificacion: "UMA Autorizada",
    categoria: "Artrópodos",
    imagen: tarantula,
    genero: "Hembra",
    morfismo: "Nominal",
    edad: "Subadulta",
    longitud: "9 cm",
    criador: CRIADOR.nombre,
    registro: CRIADOR.registro,
    descripcion:
      "Especie mexicana emblemática, de crecimiento lento y temperamento tranquilo. Procedencia UMA autorizada.",
    ficha: {
      temperatura: "25-29 °C",
      temperaturaTag: "Zona cálida",
      humedad: "50-65 %",
      humedadTag: "Media",
      dieta: "Insectívoro / grillos",
      dietaTag: "Semanal",
      talla: "13-16 cm",
      tallaTag: "Pequeña",
    },
    kit: "Terrario terrestre 30×30×30",
  },
];

export const CATEGORIAS: Categoria[] = [
  "Tortugas",
  "Serpientes",
  "Artrópodos",
  "Lagartos",
  "Anfibios",
];

export const getEjemplar = (id: string) => EJEMPLARES.find((e) => e.id === id);

export const mxn = (n: number) =>
  `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0 })} MXN`;

export const GUIAS = [
  {
    id: "tortuga-caiman",
    nivel: "Básico",
    lectura: "15 min de lectura",
    titulo: "Cuidados de la tortuga caimán: Manual Avanzado",
    resumen: "Domina los parámetros de humedad, filtración y alimentación proteica.",
    imagen: tortugaCaiman,
  },
  {
    id: "terrarios-sulcata",
    nivel: "Básico",
    lectura: "12 min de lectura",
    titulo: "Guía de terrarios para tortuga sulcata",
    resumen: "Conoce lo necesario para que tu tortuga crezca sana y con espacio suficiente.",
    imagen: tortugaTaricaya,
  },
];

export const RECURSOS_LEGALES = [
  { titulo: "Trámites CITES", desc: "Guía completa para la exportación" },
  { titulo: "Registro PIMVS/UMA", desc: "Cómo registrar legalmente tu colección" },
  { titulo: "Legal procedencia", desc: "Documentación necesaria legalmente" },
];