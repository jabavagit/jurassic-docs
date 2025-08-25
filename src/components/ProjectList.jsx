import React from 'react';
import Link from '@docusaurus/Link';

export function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center padding--lg">
        <p>📂 No hay proyectos disponibles</p>
      </div>
    );
  }

  return (
    <div className="row">
      {projects.map(project => (
        <div key={project.id} className="col col--6 margin-bottom--lg">
          <div className="card">
            <div className="card__header">
              <h3>📦 {project.title}</h3>
            </div>
            <div className="card__body">
              <p>
                <strong>📍 Ruta:</strong> <code>{project.slug}</code>
              </p>
              <p>
                <strong>📁 Fuente:</strong> <code>{project.sourceFolder.split('/').slice(-3).join('/')}</code>
              </p>
            </div>
            <div className="card__footer">
              <Link
                to={`/${project.slug}/`}
                className="button button--primary button--block">
                🚀 Ver documentación
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
