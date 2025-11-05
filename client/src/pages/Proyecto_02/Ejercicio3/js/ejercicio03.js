// ==========================
// Zona de declaración de variables
// ==========================
let requestedString;
let exerciceAlert =
  "Debe ingresar una cadena con dígitos del 0 al 4. El carácter '?' solo puede usarse como separador entre dichos dígitos. Ejemplo válido: 1?4?34?";
let messageAlert = "Ingrese su cadena de caracteres:";
let errorAlert = "Cadena inválida. Por favor, vuelva a intentarlo.";
let messageNullAlert =
  "La cadena debe tener más de 6 caracteres. Por favor, ingrese una cadena como la indicada.";

// ==========================
// Función principal
// ==========================
function listenKeyDown(keydown) {
  // Si el usuario presiona la tecla 3
  if (keydown.key === "3") {
    alert("¡Bienvenido usuario!");

    let exerciced = confirm("¿Desea realizar el ejercicio 03?");
    if (!exerciced) {
      alert("Saliendo del Ejercicio 03");
      return;
    }

    alert(exerciceAlert);
    requestedString = prompt(messageAlert);

    // Validación de longitud
    if (!requestedString || requestedString.length <= 6) {
      alert(messageNullAlert);
      requestedString = prompt(messageAlert);
    }

    // Validación de caracteres
    let valid = /^[0-4?]+$/.test(requestedString);
    if (!valid) {
      alert(errorAlert);
      requestedString = prompt(messageAlert);
    }

    // Procesamiento de la cadena
    let result = "";
    for (let i = 0; i < requestedString.length; i++) {
      let char = requestedString[i];
      if (char === "?") {
        let left = parseInt(requestedString[i - 1]) || 0;
        let right = parseInt(requestedString[i + 1]) || 0;
        result += (left + right).toString();
      } else {
        result += char;
      }
    }

    alert(
      "Usted ingresó la siguiente cadena de caracteres: " +
        requestedString +
        "\nSu resultado es: " +
        result
    );
  }
}

// ==========================
// Evento global
// ==========================
window.addEventListener("keydown", listenKeyDown);