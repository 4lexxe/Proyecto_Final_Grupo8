import React, { useEffect } from "react";
import "./styles.css";
import "./script.js"; // Importamos el JS externo

function SimuladorSalario() {
  useEffect(() => {
    // Se asegura de limpiar si el componente se desmonta
    return () => {
      const calcularBtn = document.getElementById("calcularBtn");
      if (calcularBtn) {
        calcularBtn.replaceWith(calcularBtn.cloneNode(true)); // elimina listeners previos
      }
    };
  }, []);

  return (
    <div className="container">
      <h1>Simulador de Salario Mensual</h1>
      <p>Ingresa tus datos y calcula tu pago mensual</p>

      <form id="salarioForm">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="horas">Horas trabajadas al mes:</label>
        <input type="number" id="horas" name="horas" min="0" required />

        <label htmlFor="pagoHora">Pago por hora:</label>
        <input
          type="number"
          id="pagoHora"
          name="pagoHora"
          min="0"
          step="0.01"
          required
        />

        <button type="button" id="calcularBtn">
          Calcular Pago
        </button>
      </form>

      <div id="resultado" className="resultado"></div>
    </div>
  );
}

export default SimuladorSalario;