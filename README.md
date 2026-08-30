# 🦎 LOTANI — Santuario Digital y Manejo Ético de Fauna Exótica

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Plataforma web interactiva orientada a la divulgación zootécnica, cuidado responsable, trazabilidad legal y expediente de salud digital para ejemplares de fauna exótica en México, asistida por Inteligencia Artificial.

---

## 🚀 Características Principales

- **📋 Carnet Digital y Expediente Clínico:** Registro y seguimiento de peso, control de mudas, esquema preventivo de salud y resguardo digital de documentación legal de procedencia (UMA / PIMVS).
- **🌿 Guías Zootécnicas Interactivas:** Parámetros técnicos de microclima (temperaturas diurna/nocturna, fotoperiodo, gradientes térmicos y humedad relativa) para reptiles, anfibios y artrópodos.
- **🤖 Asistente con IA (Gemini API):** Orientación especializada en tiempo real sobre nutrición, adecuación de recintos y requerimientos biológicos de cada ejemplar.
- **🇲🇽 Catálogo y Divulgación Biocultural:** Fichas interactivas e ilustradas de especies representativas de la biodiversidad mexicana y exótica.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Herramientas & Bundler:** Vite, Bun / Node.js
- **Backend & Servicios:** Firebase (Auth, Firestore, Storage)
- **Inteligencia Artificial:** Google Gemini API
- **Despliegue:** Vercel

---

## 💻 Instalación y Configuración Local

### Prerrequisitos
- Node.js (v18 o superior) o Bun
- Git

### Pasos de ejecución

1. **Clonar el repositorio:**
   git clone https://github.com/josiasemm/fauna-legit-hub.git
   cd fauna-legit-hub

2. **Instalar dependencias:**
   bun install (o: npm install)

3. **Configurar variables de entorno:**
   Crea el archivo `.env.local` en la raíz con:
   VITE_GEMINI_API_KEY=tu_api_key_de_gemini
   VITE_FIREBASE_API_KEY=tu_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket

4. **Iniciar servidor local:**
   bun run dev (o: npm run dev)

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.

---

## 👤 Autor

**Josias Emmanuel González Moreno**
- GitHub: @josiasemm (https://github.com/josiasemm)
- Correo de contacto: josiasemm@gmail.com

