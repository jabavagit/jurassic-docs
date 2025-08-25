# Jurassic Docs

Instancia Docusaurus que agrega documentación de múltiples proyectos hermanos usando configuración dinámica.

## Flujo
1. Lista de proyectos en `jurassic.projects.json`.
2. `docusaurus.config.mjs` carga rutas y crea un plugin docs por proyecto.
3. Un único `sidebars.js` autogenerado se reutiliza.
4. Navbar añade un item por proyecto + docs internas.
5. `scripts/generateRuntime.mjs` produce `.jurassicRuntime/projectsData.json` para la home.

## Añadir un proyecto
Añade la ruta relativa al array `projects` del JSON y coloca docs en `.docusaurus/docs` o `.docusaurus/markdown`.

## Comandos
- `pnpm install` o `npm install`
- `pnpm start` arranca desarrollo.
- `pnpm build` genera estáticos.

