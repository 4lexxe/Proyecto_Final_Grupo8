import { mascotas } from './datos.js';

export function actualizarResumen() {
    document.getElementById("totalMascotas").textContent = mascotas.length;
    document.getElementById("totalVacunadas").textContent = mascotas.filter(m => m.vacunada).length; 
    document.getElementById("totalNoVacunadas").textContent = mascotas.filter(m => !m.vacunada).length;

    //traeme todos(.length) los indices en donde sea vac sea true
    //y en !m todos los que sean false
    //=> arrow function/funcion flecha version modernda de function
        //ya tiene el return
        //filter recorre todos los indices del array y crea una 
        //m referencia a nuevaMascota
}
