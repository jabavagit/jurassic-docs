# 🛠️ Configuración

Guía completa para configurar y personalizar Jurassic Docs.

## ⚙️ Archivo de configuración principal

### `jurassic.projects.json`

```json title="jurassic.projects.json"
{
  "projects": [
    "../scripts-devtools",      // Proyecto hermano
    "local-project",            // Proyecto local
    "../../external-docs"       // Proyecto en otra ubicación
  ]
}
```

## 🎨 Personalización visual

### Favicon y logo

Coloca tus archivos en `static/img/`:

```
static/
└── img/
    ├── favicon.ico     # ← Tu favicon
    ├── logo.svg        # ← Logo del navbar
    └── logo-dark.svg   # ← Logo para tema oscuro
```

### Colores personalizados

Crea `src/css/custom.css`:

```css title="src/css/custom.css"
:root {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
}

/* Tema oscuro */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  /* ... más colores ... */
}
```

## 🧭 Configuración del navbar

El navbar se genera automáticamente pero puedes personalizarlo en `docusaurus.config.js`:

```javascript title="docusaurus.config.js"
themeConfig: {
  navbar: {
    title: '🦕 Jurassic Docs',
    logo: {
      alt: 'Jurassic Docs Logo',
      src: 'img/logo.svg',
    },
    items: [
      // Items dinámicos se añaden automáticamente
      {
        href: 'https://github.com/tu-usuario/jurassic-docs',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
}
```

## 📱 Footer personalizado

```javascript title="docusaurus.config.js"
footer: {
  style: 'dark',
  links: [
    {
      title: 'Documentación',
      items: [
        {
          label: 'Inicio',
          to: '/jurassic/intro',
        },
        {
          label: 'Arquitectura',
          to: '/jurassic/arquitectura',
        },
      ],
    },
    {
      title: 'Comunidad',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/tu-usuario/jurassic-docs',
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Jurassic Docs. Construido con 🦕.`,
},
```

## 🔧 Variables de entorno

Aunque no se usan por defecto, puedes añadir soporte:

```bash title=".env"
# Configuración opcional
JURASSIC_TITLE="Mi Docs Portal"
JURASSIC_BASE_URL="https://docs.miempresa.com"
```

## 📦 Scripts útiles

### Generar datos de runtime manualmente

```bash
node ./scripts/generateRuntime.js
```

### Validar configuración

```bash
node ./scripts/loadProjects.js
```

## 🚀 Despliegue

### Build local

```bash
pnpm build
pnpm serve  # Preview local
```

### CI/CD automático

```yaml title=".github/workflows/deploy.yml"
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
