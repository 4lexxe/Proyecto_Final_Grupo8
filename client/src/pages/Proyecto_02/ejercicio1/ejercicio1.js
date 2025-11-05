// Ejercicio 1 - calcularMayor()

function calcularMayor(numero1, numero2) {
  if (numero1 > numero2) {
    alert(numero1 + " es mayor que " + numero2);
  } else if (numero2 > numero1) {
    alert(numero2 + " es mayor que " + numero1);
  } else {
    alert("Ambos números son iguales");
  }
}

// Pedir números al usuario con prompt
let num1 = parseInt(prompt("Ingrese el primer número:"));
let num2 = parseInt(prompt("Ingrese el segundo número:"));

// Invocar la función
calcularMayor(num1, num2);