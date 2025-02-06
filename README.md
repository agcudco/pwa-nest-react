# PWA (React + TypeScript + Vite)

## 1. Creación del Proyecto e Instalación de Dependencias
```bash
# Crear el proyecto con Vite y plantilla React + TS
npm create vite@latest my-app -- --template react-ts
cd my-app

# Instalar dependencias de ejecución
npm install primereact primeicons primeflex react-router-dom

# Instalar plugin para PWA (en desarrollo)
npm install -D vite-plugin-pwa
```

## 2. Estructura del Proyecto
La siguiente es una sugerencia de estructura de carpetas para organizar el código:

```css
my-app/
├── node_modules/
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── manifest.json
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Roles.tsx
│   │   ├── Usuarios.tsx
│   │   └── About.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── rolService.ts
│   │   └── usuarioService.ts
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 3. Configuración de Vite para PWA
Crea (o edita) el archivo vite.config.ts de la siguiente forma:
```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi App',
        short_name: 'MiApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007ad9',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 4. Código Fuente
### 4.1. Archivo de entrada y enrutado
Revisar los archivos en el siguiente orden:
- **src/main.tsx** 
- **src/App.tsx** : En este archivo se define el enrutado y se incorpora el menú de navegación.

### 4.2. Componente de Navegación
- **src/components/Navbar.tsx**: Utilizamos el componente Menubar de PrimeReact para el menú de navegación.