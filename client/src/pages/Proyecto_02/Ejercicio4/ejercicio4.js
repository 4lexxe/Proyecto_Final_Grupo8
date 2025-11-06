// Declaramos la función en el objeto window para poder usarla desde React
window.mostrarDatos = function () {
  // Obtener valores de los inputs
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const libreta = document.getElementById("libreta").value.trim();

  // Validaciones simples
  if (!nombre || !apellido || !libreta) {
    alert("Por favor, complete todos los campos antes de continuar.");
    return;
  }

  // Mostrar los datos en un alert
  alert(
    `Los datos ingresados son:\n\nNombre: ${nombre}\nApellido: ${apellido}\nLibreta Universitaria: ${libreta}`
  );
};