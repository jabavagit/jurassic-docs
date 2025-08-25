# 🦕 Jurassic Docs

Instancia Docusaurus que agrega documentación de múltiples proyectos hermanos usando configuración dinámica.

## ✨ Características

- 🔄 **Carga dinámica** de proyectos desde `jurassic.projects.json`
- 📁 **Detección automática** de carpetas `.docusaurus/docs` y `.docusaurus/markdown`
- 🌐 **Rutas públicas** únicas: cada proyecto se sirve bajo `/slug-proyecto/`
- 🧭 **Sidebar autogenerado** reutilizable para todos los proyectos
- 🎛️ **Navbar dinámico** que se actualiza automáticamente
- 🚀 **Sin configuración manual** - añadir/quitar proyectos solo requiere editar JSON
- 🛡️ **Aislamiento** - IDs de documentos separados por plugin, evita colisiones

## 🚀 Inicio rápido

### Instalación

```bash
# Clonar repositorio
git clone [tu-repo-url] jurassic-docs
cd jurassic-docs

# Instalar dependencias
pnpm install

# Desarrollo
pnpm start    # http://localhost:3000

# Producción  
pnpm build    # Genera archivos estáticos
pnpm serve    # Sirve build local
```

### Añadir un proyecto

1. **Prepara tu proyecto:**
   ```
   mi-proyecto/
   └── .docusaurus/
       └── docs/              # ← Crea esta carpeta
           ├── intro.md       # ← Documenta aquí
           └── guia.md
   ```

2. **Edita configuración:**
   ```json
   // jurassic.projects.json
   {
     "projects": [
       "../mi-proyecto"  // ← Añadir ruta relativa
     ]
   }
   ```

3. **Reinicia servidor:**
   ```bash
   pnpm start
   ```

¡Tu proyecto aparecerá automáticamente en el navbar! 🎉

## 📂 Estructura del proyecto

```
jurassic-docs/
├── docs/                    # Documentación interna
│   ├── intro.md
│   ├── guia-uso.md
│   ├── configuracion.md
│   ├── arquitectura.md
│   ├── api-reference.md
│   └── troubleshooting.md
├── src/
│   ├── components/
│   │   └── ProjectList.jsx  # Lista de proyectos
│   ├── css/
│   │   └── custom.css       # Estilos personalizados
│   └── pages/
│       └── index.jsx        # Página principal
├── scripts/
│   ├── loadProjects.js      # Carga proyectos
│   └── generateRuntime.js   # Genera datos runtime
├── static/img/              # Assets estáticos
├── jurassic.projects.json   # ← Configuración de proyectos
├── docusaurus.config.js     # Configuración Docusaurus
└── sidebars.js             # Sidebar autogenerado
```

## ⚙️ Configuración

### Variables de entorno (opcional)

```bash
# .env
JURASSIC_TITLE="Mi Docs Portal"
JURASSIC_BASE_URL="https://docs.miempresa.com"
```

### Personalización de colores

Edita `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2e8b57;
  --ifm-color-primary-dark: #267c4e;
  /* ... más colores ... */
}
```

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm start` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm serve` | Servir build local |
| `node scripts/loadProjects.js` | Debug: ver proyectos detectados |
| `node scripts/generateRuntime.js` | Regenerar datos runtime |

## 🚀 Despliegue

### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy Jurassic Docs
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Netlify / Vercel

1. Conectar repositorio
2. Build command: `pnpm build`
3. Publish directory: `build`

## 🐛 Troubleshooting

### Proyecto no se detecta

```bash
# Verificar detección
node scripts/loadProjects.js

# Verificar estructura esperada
ls -la ../mi-proyecto/.docusaurus/
```

### Build falla

```bash
# Limpiar caché
rm -rf build/ .docusaurus/ node_modules/
pnpm install
pnpm build
```

Ver [documentación completa de troubleshooting](http://localhost:3000/jurassic/troubleshooting) para más soluciones.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

> 💡 **¿Necesitas ayuda?** Consulta la [documentación completa](http://localhost:3000/jurassic/intro) o revisa los [ejemplos de configuración](http://localhost:3000/jurassic/configuracion).

