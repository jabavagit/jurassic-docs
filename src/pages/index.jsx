import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ProjectList } from '../components/ProjectList';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero hero--primary">
      <div className="container">
        <h1 className="hero__title">🦕 {siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ marginTop: '2rem' }}>
          <Link
            className="button button--secondary button--lg"
            to="/jurassic/intro"
            style={{ marginRight: '1rem' }}>
            📚 Comenzar
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/jurassic/arquitectura"
            style={{ color: 'white', borderColor: 'white' }}>
            🏗️ Arquitectura
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: '🔄 Dinámico',
      description: 'Carga automática de proyectos desde JSON. No más configuración manual.',
    },
    {
      title: '🛡️ Aislado',
      description: 'Cada proyecto funciona independientemente. Sin colisiones de contenido.',
    },
    {
      title: '⚡ Eficiente',
      description: 'Una sola instancia sirve múltiples proyectos. Máximo rendimiento.',
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4">
              <div className="feature">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar proyectos solo en el cliente para evitar problemas SSR
    import('../../.jurassicRuntime/projectsData.json')
      .then(data => {
        setProjects(data.default || data);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      title={`${siteConfig.title} - Portal de documentación unificado`}
      description="Documentación unificada multi-proyecto con Docusaurus dinámico">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        <section style={{ padding: '4rem 0', backgroundColor: 'var(--ifm-background-surface-color)' }}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text-center margin-bottom--lg">
                  <h2>📦 Proyectos disponibles</h2>
                  <p>Explora la documentación de todos los proyectos desde un lugar centralizado.</p>
                </div>
                
                {loading ? (
                  <div className="text-center">
                    <p>🔄 Cargando proyectos...</p>
                  </div>
                ) : projects.length > 0 ? (
                  <ProjectList projects={projects} />
                ) : (
                  <div className="text-center">
                    <p>📝 No hay proyectos configurados aún.</p>
                    <Link to="/jurassic/guia-uso">
                      ➕ Aprende a añadir proyectos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h3>🚀 Inicio rápido</h3>
                <ol>
                  <li>📁 Crea carpeta <code>.docusaurus/docs/</code> en tu proyecto</li>
                  <li>📝 Añade archivos <code>.md</code> con documentación</li>
                  <li>⚙️ Edita <code>jurassic.projects.json</code></li>
                  <li>🔄 Reinicia el servidor</li>
                </ol>
                <Link 
                  to="/jurassic/guia-uso"
                  className="button button--primary">
                  📖 Guía completa
                </Link>
              </div>
              <div className="col col--6">
                <h3>🔧 Configuración avanzada</h3>
                <ul>
                  <li>🎨 Personalización de temas</li>
                  <li>🔍 Configuración de búsqueda</li>
                  <li>📊 Analytics y métricas</li>
                  <li>🚀 Despliegue automatizado</li>
                </ul>
                <Link 
                  to="/jurassic/configuracion"
                  className="button button--secondary">
                  ⚙️ Ver configuración
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
