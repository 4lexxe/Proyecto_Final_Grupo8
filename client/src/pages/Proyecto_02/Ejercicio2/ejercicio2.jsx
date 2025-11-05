import { useState } from "react";
import "../Proyecto2.css";

function Ejercicio2() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [numero3, setNumero3] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularPromedio = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    const num3 = parseFloat(numero3);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
      setResultado("Por favor ingresa solo números válidos.");
      return;
    }

    const promedio = (num1 + num2 + num3) / 3;
    setResultado(`El promedio de los tres números es: ${promedio.toFixed(2)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calcularPromedio();
    }
  };

  return (
    <div className="ejercicio-container">
      <div className="ejercicio-box gradient-2">
        <h1>Calcular Promedio</h1>
        <p>Ingresa 3 números para calcular su promedio</p>

        <div className="form-group">
          <label htmlFor="num1">Primer número:</label>
          <input
            type="number"
            id="num1"
            value={numero1}
            onChange={(e) => setNumero1(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: 10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="num2">Segundo número:</label>
          <input
            type="number"
            id="num2"
            value={numero2}
            onChange={(e) => setNumero2(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: 20"
          />
        </div>

        <div className="form-group">
          <label htmlFor="num3">Tercer número:</label>
          <input
            type="number"
            id="num3"
            value={numero3}
            onChange={(e) => setNumero3(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: 30"
          />
        </div>

        <button onClick={calcularPromedio}>Calcular Promedio</button>

        {resultado && <div className="resultado">{resultado}</div>}
      </div>
    </div>
  );
}

export default Ejercicio2;