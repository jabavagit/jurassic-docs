# 🔧 API Reference

Referencia completa de los scripts y funciones internas de Jurassic Docs.

## 📦 Scripts principales

### `loadProjects.js`

Script para cargar y detectar proyectos válidos.

#### Funciones exportadas

##### `loadProjectPaths()`

Carga las rutas de proyectos desde `jurassic.projects.json`.

```javascript
const { loadProjectPaths } = require('./scripts/loadProjects.js');

const paths = loadProjectPaths();
// Retorna: [{ rel: '../proyecto', abs: '/path/absoluto/proyecto' }]
```

##### `detectProjectDocFolder(project)`

Detecta la carpeta de documentación de un proyecto.

```javascript
const folder = detectProjectDocFolder({
  abs: '/path/to/project'
});

// Retorna:
// { folder: '/path/to/project/.docusaurus/docs', type: 'docs' }
// o
// { folder: '/path/to/project/.docusaurus/markdown', type: 'markdown' }
// o
// null (si no encuentra carpetas)
```

##### `collectProjects()`

Función principal que combina carga y detección.

```javascript
const { collectProjects } = require('./scripts/loadProjects.js');

const validProjects = collectProjects();
// Retorna array de proyectos válidos con estructura completa
```

### `generateRuntime.js`

Genera archivos de datos para el runtime de Docusaurus.

#### Salida

Crea `.jurassicRuntime/projectsData.json`:

```json
[
  {
    "id": "jurassic-scripts-devtools",
    "slug": "scripts-devtools", 
    "title": "scripts-devtools",
    "sourceFolder": "/path/to/scripts-devtools/.docusaurus/docs"
  }
]
```

## ⚙️ Configuración dinámica

### `docusaurus.config.js`

#### Función `slugify(name)`

Convierte nombres de proyecto en slugs válidos para URLs.

```javascript
slugify('My Project Name');  // → 'my-project-name'
slugify('scripts_devtools'); // → 'scripts-devtools'
```

#### Generación de plugins

```javascript
// Para cada proyecto válido
const docsPlugins = dynamicProjects.map(project => [
  '@docusaurus/plugin-content-docs',
  {
    id: `jurassic-${slugify(projectName)}`,
    path: project.detected.folder,
    routeBasePath: slugify(projectName),
    include: ['**/*.md', '**/*.mdx'],
    sidebarPath: require.resolve('./sidebars.js'),
    editCurrentVersion: false,
  }
]);
```

## 📊 Estructura de datos

### Proyecto detectado

```typescript
interface DetectedProject {
  rel: string;                    // Ruta relativa del config
  abs: string;                    // Ruta absoluta calculada
  detected: {
    folder: string;               // Ruta a carpeta docs/markdown
    type: 'docs' | 'markdown';   // Tipo detectado
  }
}
```

### Datos de runtime

```typescript
interface RuntimeProject {
  id: string;           // ID único del plugin
  slug: string;         // Slug para URL
  title: string;        // Nombre mostrado
  sourceFolder: string; // Carpeta de origen
}
```

## 🔄 Hooks del ciclo de vida

### Prestart

Ejecuta `generateRuntime.js` antes de iniciar desarrollo:

```json title="package.json"
{
  "scripts": {
    "prestart": "node ./scripts/generateRuntime.js"
  }
}
```

### Build

Ejecuta generación antes del build de producción:

```json title="package.json" 
{
  "scripts": {
    "build": "node ./scripts/generateRuntime.js && docusaurus build"
  }
}
```

## 🎛️ Variables de configuración

### Rutas importantes

```javascript
// Archivo de configuración
const CONFIG_FILE = path.join(ROOT, 'jurassic.projects.json');

// Directorio de salida runtime
const OUT_DIR = path.join(ROOT, '.jurassicRuntime');

// Carpetas buscadas por proyecto
const DOCS_FOLDER = '.docusaurus/docs';
const MARKDOWN_FOLDER = '.docusaurus/markdown';
```

### Extensiones soportadas

```javascript
// En configuración de plugin
include: ['**/*.md', '**/*.mdx']
```

## 🚨 Manejo de errores

### Proyecto no encontrado

```javascript
// Si no existe la ruta del proyecto
console.warn(`[JurassicDocs] Proyecto no encontrado: ${projectPath}`);
```

### Sin carpetas de docs

```javascript
// Si no existe .docusaurus/docs ni .docusaurus/markdown
return null; // Proyecto se ignora silenciosamente
```

### JSON malformado

```javascript
try {
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
} catch (error) {
  console.warn('[JurassicDocs] Error cargando proyectos:', error.message);
  return []; // Array vacío como fallback
}
```

## 🧪 Testing

### Probar detección de proyectos

```bash
# Ejecutar script directamente
node ./scripts/loadProjects.js

# Salida esperada:
# [
#   {
#     "rel": "../scripts-devtools",
#     "abs": "/home/user/scripts-devtools", 
#     "detected": {
#       "folder": "/home/user/scripts-devtools/.docusaurus/docs",
#       "type": "docs"
#     }
#   }
# ]
```

### Validar generación de runtime

```bash
node ./scripts/generateRuntime.js
cat .jurassicRuntime/projectsData.json
```

## 🔧 Personalización avanzada

### Añadir validaciones

```javascript
// En loadProjects.js
function validateProject(project) {
  const hasIntro = fs.existsSync(
    path.join(project.detected.folder, 'intro.md')
  );
  
  if (!hasIntro) {
    console.warn(`Proyecto ${project.rel} sin intro.md`);
  }
  
  return hasIntro;
}
```

### Metadatos adicionales

```javascript
// Extender datos de runtime
const projects = collectProjects().map(p => {
  const packagePath = path.join(p.abs, 'package.json');
  let version = 'unknown';
  
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    version = pkg.version;
  } catch {}
  
  return {
    id: `jurassic-${slugify(name)}`,
    slug: slugify(name),
    title: name,
    version,
    sourceFolder: p.detected.folder
  };
});
```
