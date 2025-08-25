# 🚀 Guía de uso

Aprende a usar Jurassic Docs de forma efectiva.

## 📋 Añadir un nuevo proyecto

### 1. Preparar el proyecto

Asegúrate de que tu proyecto tenga la estructura esperada:

```
mi-nuevo-proyecto/
└── .docusaurus/
    └── docs/              # ← Crea esta carpeta
        ├── intro.md       # ← Documenta tu proyecto aquí
        ├── instalacion.md
        └── api/
            └── reference.md
```

### 2. Editar configuración

Añade la ruta relativa a `jurassic.projects.json`:

```json title="jurassic.projects.json"
{
  "projects": [
    "../scripts-devtools",
    "../mi-nuevo-proyecto"  // ← Añadir aquí
  ]
}
```

### 3. Reiniciar servidor

```bash
# El servidor detecta cambios automáticamente
pnpm start
```

¡Tu proyecto aparecerá en el navbar! 🎉

## 📝 Escribir documentación

### Formato de archivos

Jurassic Docs soporta:

- ✅ **Markdown** (`.md`)
- ✅ **MDX** (`.mdx`) - Markdown + React components

### Estructura recomendada

```
proyecto/.docusaurus/docs/
├── intro.md              # Página principal
├── instalacion.md        # Guía de instalación
├── configuracion.md      # Configuración
├── api/                  # API Reference
│   ├── index.md
│   └── endpoints.md
└── ejemplos/             # Ejemplos de uso
    ├── basico.md
    └── avanzado.md
```

### Metadatos útiles

```markdown title="intro.md"
---
title: Mi Proyecto
description: Descripción breve de mi proyecto
sidebar_position: 1
---

# Mi Proyecto

Contenido de la documentación...
```

## 🎨 Consejos de escritura

### Usar emojis para mayor claridad

```markdown
## 🚀 Inicio rápido
## ⚙️ Configuración
## 🐛 Troubleshooting
## 📖 API Reference
```

### Bloques de código con lenguaje

```markdown
​```javascript title="ejemplo.js"
const config = {
  nombre: 'Mi Proyecto',
  version: '1.0.0'
};
​```
```

### Callouts para información importante

```markdown
:::tip Consejo Pro
Usa esta funcionalidad para mejorar el rendimiento.
:::

:::warning Cuidado
Esta operación es irreversible.
:::

:::danger Peligro
No ejecutes esto en producción.
:::
```

## 🔧 Comandos útiles

### Desarrollo

```bash
pnpm start              # Servidor desarrollo
pnpm build              # Build producción
pnpm serve              # Servir build local
```

### Depuración

```bash
# Ver proyectos detectados
node ./scripts/loadProjects.js

# Regenerar datos de runtime
node ./scripts/generateRuntime.js

# Ver configuración actual
cat jurassic.projects.json
```

## 🌐 URLs y navegación

### Estructura de URLs

```
http://localhost:3000/
├── /jurassic/           # Documentación interna
│   ├── /intro
│   ├── /arquitectura
│   └── /configuracion
└── /scripts-devtools/   # Proyecto detectado
    ├── /intro
    └── /...
```

### Enlaces internos

```markdown
<!-- Enlace a otro proyecto -->
[Ver Scripts DevTools](/scripts-devtools/intro)

<!-- Enlace a docs internas -->
[Arquitectura](/jurassic/arquitectura)
```

## 📊 Métricas y analítica

### Google Analytics

Añade a `docusaurus.config.js`:

```javascript
module.exports = {
  // ... configuración existente
  themeConfig: {
    gtag: {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  },
};
```

## 🔍 Búsqueda

### Búsqueda local (incluida)

Docusaurus incluye búsqueda local automáticamente.

### Algolia DocSearch

Para proyectos públicos:

```javascript title="docusaurus.config.js"
themeConfig: {
  algolia: {
    apiKey: 'tu-api-key',
    indexName: 'tu-index-name',
    appId: 'tu-app-id',
  },
}
```

## 🎯 Mejores prácticas

### 📁 Organización

- Un archivo `intro.md` por proyecto
- Usa carpetas para agrupar contenido relacionado
- Nombres descriptivos para archivos

### 🎨 Formato

- Títulos claros y jerárquicos
- Código con sintaxis highlighting
- Capturas de pantalla cuando sea útil

### 🔗 Enlaces

- Enlaces relativos para navegación interna
- Enlaces absolutos para recursos externos
- Texto descriptivo para enlaces

### 📱 Responsive

- Tablas no muy anchas
- Imágenes optimizadas
- Contenido escaneable
