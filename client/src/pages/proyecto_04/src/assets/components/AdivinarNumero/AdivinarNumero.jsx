import { useState } from "react";
import EntradaNumero from "./EntradaNumero";
import Resultado from "./Resultado";
import Intentos from "./Intentos";
import Botones from "./Botones";
import "../../Styles/AdivinarNumero.css";

function Ejercicio1() {
    // Estados para manejar el progama
    const [numeroSecreto, setNumeroSecreto] = useState(
        Math.floor(Math.random() * 100) + 1);
    const [numeroIngresado, setNumeroIngresado] = useState("");
    const [intentos, setIntentos] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const manejarVerificar = () => {
    const valorConvertido = parseInt(numeroIngresado, 10);
    verificarNumero(valorConvertido);
  };
  
    //Función para verificar el número del usuario
    const verificarNumero = (valor) => {
    // 1. Validar si es un número válido
    if (isNaN(valor) || valor < 1 || valor > 100) {
      setError("Por favor ingrese un número válido entre 1 y 100.");
      return;
    }

    // 2. Si es válido, limpiar errores previos
    setError("");

    // 3. Sumar intento
    setIntentos(intentos + 1);

    // 4. Comparar con el número secreto
    if (valor < numeroSecreto) {
      setMensaje("El número es más alto.");
    } else if (valor > numeroSecreto) {
      setMensaje("El número es más bajo.");
    } else {
      setMensaje(`🎉 ¡Acertaste en ${intentos + 1} intentos!`);
      setJuegoTerminado(true);
    }
  };

    // Función para rendirse
    const rendirse = () => {
    setMensaje(`😢 Te rendiste. El número era: ${numeroSecreto}`);
    setJuegoTerminado(true);
    setError("");
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(Math.floor(Math.random() * 100) + 1);
    setNumeroIngresado("");
    setIntentos(0);
    setMensaje("");
    setError("");
    setJuegoTerminado(false);
  }

  return (
    <div className="adivinarNumero-container">
      <h1>Adivina el Número</h1>
      <p>Ingresa un número entre 1 y 100</p>
      <Intentos intentos={intentos} />
      <EntradaNumero
        numeroIngresado={numeroIngresado}
        setNumeroIngresado={setNumeroIngresado}
        verificarNumero={verificarNumero}
        juegoTerminado={juegoTerminado}
        manejarVerificar={manejarVerificar}
      />
      <Botones 
          rendirse={rendirse} 
          juegoTerminado={juegoTerminado} 
          manejarVerificar={manejarVerificar}
          reiniciarJuego={reiniciarJuego}
      />
      { mensaje || error ?
      <Resultado mensaje={mensaje} error={error} />
      : null } 
      </div>
  );
}

export default Ejercicio1;