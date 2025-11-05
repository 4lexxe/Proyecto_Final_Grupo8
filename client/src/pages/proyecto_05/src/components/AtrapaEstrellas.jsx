import { useState, useEffect } from "react";
import "../assets/styles/AtrapaEstrellas.css";
import marioSound from "../assets/sounds/mario.mp3";

export default function AtrapaEstrellas() {
  const [puntaje, setPuntaje] = useState(0);
  const [posicionEstrella, setPosicionEstrella] = useState({ y: 0, x: 0 });
  const [visible, setVisible] = useState(false);
  const [juegoActivo, setJuegoActivo] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // Crear instancia de audio para el sonido
  const audio = new Audio(marioSound);

  // Genera una posición aleatoria en porcentajes (10% - 90%)
  const posicionAlAzar = () => {
    const y = Math.random() * 80 + 10; // entre 10 y 90
    const x = Math.random() * 80 + 10;
    setPosicionEstrella({ y, x });
  };

  // Efecto que controla la aparición/desaparición de la estrella
  useEffect(() => {
    if (!juegoActivo) return;

    // cada 1.5s generamos una nueva posición y hacemos visible la estrella
    const intervaloAparicion = setInterval(() => {
      posicionAlAzar();
      setVisible(true);

      // ocultar la estrella después de 1.1s si no fue atrapada
      const timeoutOcultar = setTimeout(() => setVisible(false), 1100);

      // limpiar el timeout cuando se ejecute la siguiente aparición
      return () => clearTimeout(timeoutOcultar);
    }, 1500);

    return () => clearInterval(intervaloAparicion);
  }, [juegoActivo]);

  // función para cuando el jugador atrapa una estrella
  const agarrarEstrella = () => {
    if (!juegoActivo || !visible) return;
    
    // Reproducir sonido al atrapar la estrella
    audio.currentTime = 0; // Reiniciar el audio al inicio
    audio.play().catch(error => {
      console.log('Error al reproducir el sonido:', error);
    });
    
    setPuntaje((p) => p + 1);
    setVisible(false);
  };

  // efecto que detecta la victoria
  useEffect(() => {
    if (puntaje >= 10) {
      setJuegoActivo(false);
      setMensaje("🌟 ¡Ganaste! 🌟");
    }
  }, [puntaje]);

  const reiniciarJuego = () => {
    setPuntaje(0);
    setMensaje("");
    setJuegoActivo(true);
    setVisible(false);
  };

  return (
    <div className="contenedor-juego">
      <h1>🎮 Atrapa las Estrellas 🎮</h1>
      <p className="puntaje">Puntaje: {puntaje}</p>

      {mensaje && <h2 className="mensaje">{mensaje}</h2>}

      <div className="area-juego">
        {visible && juegoActivo && (
          <div
            className="estrella"
            style={{ top: `${posicionEstrella.y}%`, left: `${posicionEstrella.x}%` }}
            onClick={agarrarEstrella}
            role="button"
            aria-label="estrella"
          >
            ★
          </div>
        )}
      </div>

      <div className="controles">
        {!juegoActivo && (
          <button className="btn-reiniciar" onClick={reiniciarJuego}>
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}
