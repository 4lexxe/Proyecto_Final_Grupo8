import { useState } from "react";
import { encontrarX, calcularEcuacion, validar } from "./component/operaciones";
import "./styles/styles.css";

function Ejercicio1() {
  const [sumando1, setSumando1] = useState("");
  const [sumando2, setSumando2] = useState("");
  const [resultado, setResultado] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [valorX, setValorX] = useState("");
  const [ecuacion, setEcuacion] = useState("");

  const calcular = () => {
    // Creamos los arrays como hacía la función datos()
    const cadenas = [sumando1.split(""), sumando2.split(""), resultado.split("")];
    const datosX = encontrarX(cadenas);
    const cadenasResueltas = calcularEcuacion(cadenas, datosX);

    // Validamos y mostramos los resultados
    switch (validar(cadenas, cadenasResueltas, datosX)) {
      case 1:
        setMensajeError("No puedes ingresar valores vacíos.");
        break;
      case 2:
        setMensajeError("Solo puedes ingresar números y 'x'.");
        break;
      case 3:
        setMensajeError("Debes ingresar una sola 'x' como incógnita.");
        break;
      case 4:
        setMensajeError("Los valores de la suma no son correctos.");
        break;
      case 5: {
        const valorEncontrado = cadenasResueltas[datosX.cadConX][datosX.posX];
        const ecuacionTexto = `${cadenasResueltas[0].join("")} + ${cadenasResueltas[1].join("")} = ${cadenasResueltas[2].join("")}`;
        setValorX(`Valor de X = ${valorEncontrado}`);
        setEcuacion(`Ecuación: ${ecuacionTexto}`);
        setMensajeError("");
        break;
      }
      default:
        setMensajeError("Error desconocido");
    }
  };

  return (
    <div className="cartel">
      <h1>Encontrar X en la Suma</h1>
      <p>
        Ingresa tres cadenas representando un sumando, otro sumando y el resultado, usando “x” como incógnita.
      </p>

      <div className="input-container">
        <input
          type="text"
          value={sumando1}
          onChange={(e) => setSumando1(e.target.value)}
          placeholder="Ej: 1x"
        />
        <span className="operator">+</span>

        <input
          type="text"
          value={sumando2}
          onChange={(e) => setSumando2(e.target.value)}
          placeholder="Ej: 2"
        />
        <span className="operator">=</span>

        <input
          type="text"
          value={resultado}
          onChange={(e) => setResultado(e.target.value)}
          placeholder="Ej: 13"
        />
      </div>

      {mensajeError && <div className="error-message">{mensajeError}</div>}

  <button id="calcular-btn" onClick={calcular}>Calcular</button>

      {valorX && <div id="resultado-x" className="resultado active">{valorX}</div>}
      {ecuacion && <div id="ecuacion" className="resultado active">{ecuacion}</div>}
    </div>
  );
}

export default Ejercicio1;
