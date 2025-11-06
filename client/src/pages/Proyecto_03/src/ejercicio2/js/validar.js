import { soloLetras, soloNumeros } from './datos.js';

export function validarDatos(mascota) {
    // validar solo letras en nombre y dueño
    if (!soloLetras.test(mascota.nombre) || !soloLetras.test(mascota.duenio)) {
        alert("Los nombres solo pueden contener letras y espacios. No se permiten números ni símbolos.");
        return false;
    }

    // validar solo numeros en edad
    if (!soloNumeros.test(mascota.edad)) {
        alert("La edad solo puede contener números.");
        return false;
    }

    //verifica si un radio/bonton pequeño esta marcado o no
    if (mascota.vacunada === null) {
        alert("Debes seleccionar si la mascota está vacunada.");
        return false;
    }

    return true;
}
