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

## Expanding the ESLint configuration

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
