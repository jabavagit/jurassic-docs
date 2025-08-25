const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_FILE = path.join(ROOT, 'jurassic.projects.json');

function norm(p){return p.replace(/\\/g,'/');}

function loadProjectPaths(){
  const raw = JSON.parse(fs.readFileSync(CONFIG_FILE,'utf8'));
  const rels = raw.projects || [];
  return rels
    .map(r=>norm(r.trim()))
    .filter(Boolean)
    .map(r=>({
      rel:r,
      abs:path.resolve(ROOT, r)
    }));
}

function detectProjectDocFolder(project){
  const docs = path.join(project.abs, '.docusaurus', 'docs');
  const md = path.join(project.abs, '.docusaurus', 'markdown');
  if(fs.existsSync(docs)) return {folder:docs, type:'docs'};
  if(fs.existsSync(md)) return {folder:md, type:'markdown'};
  return null;
}

function collectProjects(){
  return loadProjectPaths()
    .map(p=>({ ...p, detected: detectProjectDocFolder(p) }))
    .filter(p=>p.detected);
}

module.exports = {
  loadProjectPaths,
  detectProjectDocFolder,
  collectProjects
};

if (require.main === module) {
  console.log(JSON.stringify(collectProjects(), null, 2));
}
