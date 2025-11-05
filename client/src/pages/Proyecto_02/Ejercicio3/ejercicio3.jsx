import React, { useEffect } from "react";
import "./styles/main.css";
import "./js/ejercicio03.js"; // Importamos el script externo

function Ejercicio03() {
  useEffect(() => {
    
    // Asegura que el script escuche las teclas solo cuando el componente está montado
    const handleKeyDown = (event) => {
      // Add your key handling logic here
      if (event.key === '3') {
        // Handle key 3 press
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="content-body">
      <p className="screen-statement">
        Presione la tecla numérica 3 para iniciar el ejercicio
      </p>
    </section>
  );
}

export default Ejercicio03;