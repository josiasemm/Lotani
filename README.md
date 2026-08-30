Markdown
## 💻 Instalación y Configuración Local

### Prerrequisitos
* Node.js (v18 o superior) o [Bun](https://bun.sh/)
* Git

### 1. Clonar el repositorio
```bash
git clone [https://github.com/josiasemm/fauna-legit-hub.git](https://github.com/josiasemm/fauna-legit-hub.git)
cd fauna-legit-hub
2. Instalar dependencias
Bash
# Con Bun:
bun install

# O con npm:
npm install
3. Configurar variables de entorno
Crea un archivo .env.local en la raíz del proyecto con tus credenciales:

Fragmento de código
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_FIREBASE_API_KEY=tu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
4. Iniciar servidor de desarrollo
Bash
# Con Bun:
bun run dev

# O con npm:
npm run dev
📄 Licencia
Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más información.

👤 Autor
Josias Emmanuel González Moreno

GitHub: @josiasemm

Correo de contacto: josiasemm@gmail.com
