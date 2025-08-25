const { pathToFileURL } = require('url');

async function loadESMModule(modulePath) {
  const moduleURL = pathToFileURL(modulePath).href;
  return await import(moduleURL);
}

module.exports = {
  async collectProjects() {
    const loadProjectsModule = await loadESMModule('./scripts/loadProjects.mjs');
    return loadProjectsModule.collectProjects();
  }
};
