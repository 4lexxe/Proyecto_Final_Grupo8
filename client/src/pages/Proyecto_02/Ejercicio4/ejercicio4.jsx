import React, { useEffect } from "react";
import "./ejercicio4.js"; // importamos el script externo

function Ejercicio4() {
  useEffect(() => {
    // no necesitamos nada aquí, solo para garantizar montaje limpio
    return () => {
      // limpieza si fuera necesario en el futuro
    };
  }, []);

  return (
    <div>
      <h1>Datos del Estudiante</h1>

      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Ingrese su nombre" />
        <br />
        <br />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" placeholder="Ingrese su apellido" />
        <br />
        <br />

        <label htmlFor="libreta">Libreta Universitaria:</label>
        <input type="text" id="libreta" placeholder="Ej: APU999999" />
        <br />
        <br />

        <button type="button" onClick={() => window.mostrarDatos()}>
          Mostrar Datos
        </button>
      </form>
    </div>
  );
}

export default Ejercicio4;