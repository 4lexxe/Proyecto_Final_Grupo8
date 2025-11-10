import { Link } from 'react-router-dom';
import '../assets/css/proyectos.css';

function Proyectos() {
  return (
    <div className="proyectos-page">
      <h1 className="proyectos-title">Nuestros Proyectos</h1>
      
      <div className="proyectos-grid">
        {/* Proyecto 02 */}
        <div className="proyecto-card">
          <span className="proyecto-badge">Proyecto 02</span>
          <h3>Ejercicios JavaScript</h3>
          <p>Colección de ejercicios prácticos usando JavaScript vanilla y React.</p>
          <div className="proyecto-ejercicios">
            <Link to="/proyecto02/ejercicio1" className="ejercicio-btn">Ejercicio 1</Link>
            <Link to="/proyecto02/ejercicio2" className="ejercicio-btn">Ejercicio 2</Link>
            <Link to="/proyecto02/ejercicio3" className="ejercicio-btn">Ejercicio 3</Link>
            <Link to="/proyecto02/ejercicio4" className="ejercicio-btn">Ejercicio 4</Link>
            <Link to="/proyecto02/ejercicio5" className="ejercicio-btn">Ejercicio 5</Link>
          </div>
        </div>

        {/* Proyecto 03 */}
        <div className="proyecto-card">
          <span className="proyecto-badge">Proyecto 03</span>
          <h3>React Components</h3>
          <p>Implementación de componentes React con navegación y estado.</p>
          <div className="proyecto-ejercicios">
            <Link to="/proyecto03/ejercicio1" className="ejercicio-btn">Ejercicio 1</Link>
            <Link to="/proyecto03/ejercicio2" className="ejercicio-btn">Ejercicio 2</Link>
          </div>
        </div>

        {/* Proyecto 04 */}
        <div className="proyecto-card">
          <span className="proyecto-badge">Proyecto 04</span>
          <h3>Aplicación Avanzada</h3>
          <p>Proyecto avanzado con funcionalidades completas.</p>
          <div className="proyecto-ejercicios">
            <Link to="/proyecto04" className="ejercicio-btn">Ver Proyecto</Link>
          </div>
        </div>

        {/* Proyecto 05 */}
        <div className="proyecto-card">
          <span className="proyecto-badge">Proyecto 05</span>
          <h3>Proyecto 05 en React</h3>
          <p>Proyecto integrador con todas las tecnologías aprendidas.</p>
          <div className="proyecto-ejercicios">
            <Link to="/proyecto05" className="ejercicio-btn">Ver Proyecto</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;