import { useState, useEffect } from "react";
import "../Proyecto2.css";

function Ejercicio03() {
  const [mensaje, setMensaje] = useState("Presiona la tecla numérica 3 para iniciar");
  const [activado, setActivado] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '3' && !activado) {
        setActivado(true);
        setMensaje("Ejercicio 3 activado correctamente");
        setTimeout(() => {
          setMensaje("Presiona nuevamente la tecla 3 para volver a activar");
          setActivado(false);
        }, 3000);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activado]);

  return (
    <div className="ejercicio-container">
      <div className="ejercicio-box gradient-3">
        <h1>Detector de Tecla 3</h1>
        <div className="resultado">{mensaje}</div>
      </div>
    </div>
  );
}

export default Ejercicio03;