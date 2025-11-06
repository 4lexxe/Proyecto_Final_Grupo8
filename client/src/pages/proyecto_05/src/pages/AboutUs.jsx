import { useState, useEffect } from 'react';
import '../assets/styles/aboutus.css';
import membersData from '../assets/data/members.json';

function AboutUs() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // en este ejemplo se cargan los datos locales
    setMembers(membersData);
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