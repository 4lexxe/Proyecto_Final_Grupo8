import { soloLetras, soloNumeros } from "./datos";

export function validarDatos(mascota) {
  if (!soloLetras.test(mascota.nombre) || !soloLetras.test(mascota.duenio)) {
    alert("Los nombres solo pueden contener letras y espacios.");
    return false;
  }
  if (!soloNumeros.test(mascota.edad)) {
    alert("La edad solo puede contener números.");
    return false;
  }
  if (mascota.vacunada === null) {
    alert("Debes seleccionar si la mascota está vacunada.");
    return false;
  }
  return true;
}
