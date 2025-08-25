# 🦕 Jurassic Docs

**Documentación unificada multi-proyecto** - La solución definitiva para gestionar documentación de múltiples proyectos desde una sola instancia Docusaurus.

## 🎯 ¿Qué es Jurassic Docs?

Jurassic Docs es una instancia **genérica de Docusaurus** que agrega automáticamente documentación de múltiples proyectos hermanos sin duplicar configuración manual. 

### ✨ Características principales

- 🔄 **Carga dinámica** de proyectos desde `jurassic.projects.json`
- 📁 **Detección automática** de carpetas `.docusaurus/docs` y `.docusaurus/markdown`
- 🌐 **Rutas públicas** únicas: cada proyecto se sirve bajo `/slug-proyecto/`
- 🧭 **Sidebar autogenerado** reutilizable para todos los proyectos
- 🎛️ **Navbar dinámico** que se actualiza automáticamente
- 🚀 **Sin configuración manual** - añadir/quitar proyectos solo requiere editar JSON
- 🛡️ **Aislamiento** - IDs de documentos separados por plugin, evita colisiones

## 🚀 Inicio rápido

```bash
# Desarrollo
pnpm start    # http://localhost:3000

# Producción  
pnpm build    # Genera archivos estáticos
pnpm serve    # Sirve build local
```

## 📊 Estado actual

Proyectos detectados: **1**
- `../scripts-devtools`

---

> 💡 **Próximos pasos**: Explora la [Arquitectura](./arquitectura.md) para entender cómo funciona internamente.
