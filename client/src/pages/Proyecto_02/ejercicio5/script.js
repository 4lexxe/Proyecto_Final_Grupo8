// Aseguramos que el código se ejecute solo después de que el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("salarioForm");
  const calcularBtn = document.getElementById("calcularBtn");
  const resultadoDiv = document.getElementById("resultado");

  if (!calcularBtn || !form || !resultadoDiv) return;

  calcularBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const horas = parseFloat(document.getElementById("horas").value);
    const pagoHora = parseFloat(document.getElementById("pagoHora").value);

    // Validaciones
    if (!nombre || isNaN(horas) || isNaN(pagoHora) || horas < 0 || pagoHora < 0) {
      resultadoDiv.textContent =
        "Por favor, ingresa datos válidos (nombre y valores positivos).";
      return;
    }

    // Cálculos
    const salarioBase = horas * pagoHora;
    let bono = 0;

    if (horas > 160) {
      bono = salarioBase * 0.2; // 20% de bono
    }

    const salarioTotal = salarioBase + bono;

    // Mostrar resultado
    if (bono > 0) {
      resultadoDiv.textContent = `${nombre}, tu pago total es $${salarioTotal.toFixed(
        2
      )} (incluye un bono de $${bono.toFixed(2)} por exceder 160 horas).`;
    } else {
      resultadoDiv.textContent = `${nombre}, tu pago total es $${salarioTotal.toFixed(
        2
      )}.`;
    }
  });
});