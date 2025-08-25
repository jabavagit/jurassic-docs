const fs = require('fs');
const path = require('path');
const { collectProjects } = require('./loadProjects.js');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '.jurassicRuntime');
fs.mkdirSync(OUT_DIR, { recursive: true });

function slugify(name){
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}

const projects = collectProjects().map(p=>{
  const name = path.basename(p.abs);
  const id = `jurassic-${slugify(name)}`;
  const slug = slugify(name);
  return {
    id,
    slug,
    title: name,
    sourceFolder: p.detected.folder
  };
});

fs.writeFileSync(path.join(OUT_DIR,'projectsData.json'), JSON.stringify(projects,null,2));
console.log(`Generated runtime data for ${projects.length} projects`);
