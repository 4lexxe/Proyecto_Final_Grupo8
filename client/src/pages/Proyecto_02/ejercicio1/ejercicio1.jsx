import { useState } from "react";
import "../Proyecto2.css";

function Ejercicio1() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularMayor = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);

    if (isNaN(num1) || isNaN(num2)) {
      setResultado("Por favor, ingresa números válidos");
      return;
    }

    if (num1 > num2) {
      setResultado(`${num1} es mayor que ${num2}`);
    } else if (num2 > num1) {
      setResultado(`${num2} es mayor que ${num1}`);
    } else {
      setResultado("Ambos números son iguales");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calcularMayor();
    }
  };

  return (
    <div className="ejercicio-container">
      <div className="ejercicio-box gradient-1">
        <h1>Calcular Mayor</h1>
        <p>Ingresa dos números y descubre cuál es mayor</p>

        <div className="form-group">
          <label htmlFor="numero1">Primer número:</label>
          <input
            type="number"
            id="numero1"
            value={numero1}
            onChange={(e) => setNumero1(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: 42"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numero2">Segundo número:</label>
          <input
            type="number"
            id="numero2"
            value={numero2}
            onChange={(e) => setNumero2(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: 35"
          />
        </div>

        <button onClick={calcularMayor}>Comparar</button>

        {resultado && <div className="resultado">{resultado}</div>}
      </div>
    </div>
  );
}

export default Ejercicio1;