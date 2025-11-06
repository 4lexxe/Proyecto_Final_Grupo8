import { useState } from "react";
import "../Proyecto2.css";

function SimuladorSalario() {
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [pagoHora, setPagoHora] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularPago = () => {
    const horasNum = parseFloat(horas);
    const pagoHoraNum = parseFloat(pagoHora);

    if (!nombre.trim() || isNaN(horasNum) || isNaN(pagoHoraNum) || horasNum < 0 || pagoHoraNum < 0) {
      setResultado("Por favor, ingresa datos válidos (nombre y valores positivos).");
      return;
    }

    const salarioBase = horasNum * pagoHoraNum;
    const bono = horasNum > 160 ? salarioBase * 0.2 : 0;
    const salarioTotal = salarioBase + bono;

    const mensajeBase = `${nombre}, tu pago total es $${salarioTotal.toFixed(2)}`;
    const mensajeBono = bono > 0 
      ? `\n(incluye un bono de $${bono.toFixed(2)} por exceder 160 horas)` 
      : '';

    setResultado(mensajeBase + mensajeBono);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calcularPago();
    }
  };

  return (
    <div className="ejercicio-container">
      <div className="ejercicio-box gradient-5">
        <h1>Simulador de Salario</h1>
        <p>Ingresa tus datos y calcula tu pago mensual</p>

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="horas">Horas trabajadas al mes:</label>
          <input
            type="number"
            id="horas"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            placeholder="Ej: 180"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pagoHora">Pago por hora:</label>
          <input
            type="number"
            id="pagoHora"
            value={pagoHora}
            onChange={(e) => setPagoHora(e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            step="0.01"
            placeholder="Ej: 15.50"
          />
        </div>

        <button onClick={calcularPago}>Calcular Pago</button>

        {resultado && (
          <div className="resultado" style={{ whiteSpace: 'pre-line' }}>
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimuladorSalario;