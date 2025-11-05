// función para calcular el promedio de 3 números
function calcularPromedio(numero1, numero2, numero3) {
  return (numero1 + numero2 + numero3) / 3;
}

// como React carga el DOM de otra forma, esperamos a que esté listo
window.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("calcular");
  const resultadoEl = document.getElementById("resultado");

  if (!boton || !resultadoEl) return; // por si el componente aún no está montado

  boton.onclick = function () {
    const numero1 = parseFloat(prompt("Ingresa el primer número:"));
    const numero2 = parseFloat(prompt("Ingresa el segundo número:"));
    const numero3 = parseFloat(prompt("Ingresa el tercer número:"));

    if (isNaN(numero1) || isNaN(numero2) || isNaN(numero3)) {
      resultadoEl.textContent = "Por favor ingresa solo números válidos.";
      return;
    }

    const resultado = calcularPromedio(numero1, numero2, numero3);
    resultadoEl.textContent = `El promedio de los tres números es: ${resultado}`;
  };
});