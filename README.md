# Rick and Morty App 🛸

Explorador interactivo de personajes de **Rick and Morty** construido con **React 19**, **TypeScript** y **Vite**.

## ✨ Funcionalidades

- 🔍 **Búsqueda y filtros** — Filtra por nombre, especie, estado, género y tipo
- ♾️ **Scroll infinito** — Navegación continua por todos los personajes de la API
- ⭐ **Favoritos** — Guarda personajes favoritos con persistencia en localStorage
- ➕ **Crear personajes** — Crea tus propios personajes con formulario validado
- ✏️ **Editar y eliminar** — Modifica o borra personajes creados
- 📋 **Detalle completo** — Información detallada con episodios paginados
- 🎨 **Animaciones** — Transiciones suaves, hover effects, carga escalonada
- 📱 **Responsive** — Adaptado a desktop, tablet y móvil

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| React 19 + TypeScript | UI y tipado |
| Vite 7 + SWC | Build ultrarrápido |
| TanStack Router | Enrutamiento file-based |
| TanStack Query | Fetching y caché |
| Zustand | Estado global |
| Formik + Yup | Formularios y validación |
| Axios | Cliente HTTP |
| Sass | Estilos con animaciones |

## 🚀 Deploy

El proyecto está listo para deploy en **Vercel**. Los personajes creados se guardan en localStorage del navegador (no requiere backend).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🧑‍💻 Desarrollo local

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📁 API

- **Personajes reales**: [Rick and Morty API](https://rickandmortyapi.com/)
- **Personajes creados**: localStorage del navegador
