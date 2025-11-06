import { useState } from "react";
import "../Proyecto2.css";

function Ejercicio4() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [libreta, setLibreta] = useState("");
  const [resultado, setResultado] = useState("");

  const mostrarDatos = () => {
    if (!nombre.trim() || !apellido.trim() || !libreta.trim()) {
      setResultado("Por favor, complete todos los campos antes de continuar.");
      return;
    }

    setResultado(
      `Datos del Estudiante:\n\n` +
      `Nombre: ${nombre}\n` +
      `Apellido: ${apellido}\n` +
      `Libreta Universitaria: ${libreta}`
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mostrarDatos();
    }
  };

  return (
    <div className="ejercicio-container">
      <div className="ejercicio-box gradient-4">
        <h1>Datos del Estudiante</h1>
        <p>Ingresa tus datos académicos</p>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingrese su apellido"
          />
        </div>

        <div className="form-group">
          <label htmlFor="libreta">Libreta Universitaria:</label>
          <input
            type="text"
            id="libreta"
            value={libreta}
            onChange={(e) => setLibreta(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: APU999999"
          />
        </div>

        <button onClick={mostrarDatos}>Mostrar Datos</button>

        {resultado && (
          <div className="resultado" style={{ whiteSpace: 'pre-line' }}>
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ejercicio4;