import { useState, useEffect } from 'react';
import '../assets/css/AboutUs.css';

// If backend runs on localhost:5000 in dev, change BASE_URL accordingly.
// Use Vite env variable (prefixed with VITE_) when available.
const BASE_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:5000';

function AboutUs() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // cargar datos desde la API /api/members
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/members`);
        const json = await res.json();
        if (json && json.success && Array.isArray(json.members)) {
          setMembers(json.members);
        } else if (Array.isArray(json)) {
          // compatibilidad si la API devolviera directamente un array
          setMembers(json);
        }
      } catch (err) {
        console.error('Error cargando miembros:', err);
      }
    };
    load();
  }, []);

  return (
    <div className="about-page">

      <main className="about-main">
        <section className="about-section">
          <h1 className="about-title">Grupo 8</h1>
          <h2 className="about-subtitle">Integrantes</h2>

          <ul className="team-list">
            {members.map((m, idx) => {
              // calcular ruta de imagen relativa al proyecto (las rutas en JSON usan ./img/...)
              let imgSrc = null;
              if (m.image) {
                const replaced = m.image.replace(/^\.\/img\//, '../assets/img/');
                try {
                  imgSrc = new URL(replaced, import.meta.url).href;
                } catch {
                  imgSrc = replaced; // fallback
                }
              }

              const initials = (m.name || '').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
              const contacto = m.contact || m.contacto || '';
              const username = contacto.replace(/^@/, '');
              const githubHref = username ? `https://github.com/${username}` : null;

              return (
                <li key={idx} className="team-item">
                  <div className="member-avatar" aria-hidden>
                    {imgSrc ? <img src={imgSrc} alt={m.name} /> : initials}
                  </div>
                  <div className="member-info">
                    <div className="member-name">{m.name}</div>
                    {m.role && <div className="member-role">{m.role}</div>}
                    {contacto && githubHref && (
                      <div className="member-contact">
                        <a href={githubHref} target="_blank" rel="noopener noreferrer">{contacto}</a>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;